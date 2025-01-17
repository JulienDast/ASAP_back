import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthGuardErrors, OwnProfileErrors } from 'src/utils/exceptions/error-types';

interface JwtPayload {
  id: number;
}

@Injectable()
export class OwnProfileGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw AuthGuardErrors.TOKEN_NOT_FOUND;
    }

    const payload: JwtPayload = await this.verifyToken(token);
    request['user'] = payload; 

    
    const userIdFromParams = parseInt(request.params.id, 10);
    const currentUser = this.userService.findById(+payload.id);
    const currentUserRole = (await currentUser).role;  

    if(currentUserRole === Role.ADMIN){
      return true;
    }

    if (userIdFromParams !== payload.id) {
      throw OwnProfileErrors.FORBIDDEN; 
    }

    return true; 
  }

  private async verifyToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      }) as JwtPayload;
    } catch (err) {
      throw AuthGuardErrors.INVALID_TOKEN;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}