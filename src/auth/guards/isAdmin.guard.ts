import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthGuardErrors, RoleErrors } from 'src/utils/exceptions/error-types';

interface JwtPayload {
  id: number;
}

@Injectable()
export class IsAdminGuard implements CanActivate {
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
    
    const currentUser = await this.userService.findById(payload.id)
    if(currentUser.role !== Role.ADMIN){
      throw RoleErrors.FORBIDDEN;
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