import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { AuthService } from "../auth.service";
import { AuthCustomErrors, AuthGuardErrors, UserCustomErrors } from "src/utils/exceptions/error-types";

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.headers['refresh_token'];

    if (!refreshToken) {
      throw AuthGuardErrors.TOKEN_NOT_FOUND;
    }

    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_JWT_SECRET_KEY
      });

      const user = await this.userService.findById(decoded.id);
      if (!user) throw UserCustomErrors.USER_NOT_FOUND;

      const isValidRefreshToken = await this.authService.compare(refreshToken, user.refresh_token);
      if (!isValidRefreshToken) throw AuthCustomErrors.INVALID_REFRESH_TOKEN;

      const payload = { id: user.id };
      const new_access_token = await this.authService.createToken(payload, process.env.JWT_SECRET_KEY, "15m");
      const new_refresh_token = await this.authService.createToken(payload, process.env.REFRESH_JWT_SECRET_KEY, "1d");

      const hashed_refresh = await this.authService.hash(new_refresh_token);
      await this.authService.updateToken(user.id, { refresh_token: hashed_refresh });

      request.user = {
        access_token: new_access_token,
        refresh_token: new_refresh_token,
      };

      return true;
    } catch (error) {
      throw AuthCustomErrors.INVALID_REFRESH_TOKEN;
    }
  }
}