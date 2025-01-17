import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthGuardErrors } from 'src/utils/exceptions/error-types';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw AuthGuardErrors.TOKEN_NOT_FOUND;
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        { secret: process.env.JWT_SECRET_KEY }
      );
      request['user'] = payload;
    } catch (err) {
      throw AuthGuardErrors.INVALID_TOKEN;
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}