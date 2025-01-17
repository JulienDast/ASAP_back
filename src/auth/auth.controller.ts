import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { SigninDto } from "./dtos/signin.dto";
import { RefreshGuard } from "./guards/refresh.guard";
import { RefreshTokenResponseDto } from "./dtos/refreshToken";
import { CustomRequest } from "src/interfaces/requests.interface";
import { ApiTags } from "@nestjs/swagger";
import { AuthCustomErrors } from "src/utils/exceptions/error-types";
import { RefreshTokenSwagger, SignInSwagger } from "./swagger/auth.swagger";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService : AuthService
  ){}

  @Post("signin")
  @SignInSwagger()
  async signin(@Body() body : SigninDto){
    const user = await this.userService.findByEmail(body.email);
    if(!user){
      throw AuthCustomErrors.EMAIL_NOT_FOUND;
    }
    const compare = await this.authService.compare(body.password, user.password);
    if(!compare){
      throw AuthCustomErrors.INVALID_PASSWORD;
    }

    const payload = {id: user.id}

    const access_token = await this.authService.createToken(payload, process.env.JWT_SECRET_KEY, "15m");
    const refresh_token = await this.authService.createToken(payload, process.env.REFRESH_JWT_SECRET_KEY, "1d");

    const hashed_refresh = await this.authService.hash(refresh_token)

    const updated_user = await this.authService.updateToken(user.id, { refresh_token: hashed_refresh });

    return{
      access_token,
      refresh_token,
      user: {
        id: updated_user.id,
        role: updated_user.role,
        firstname: updated_user.firstname,
        lastname: updated_user.lastname,
      }
    }
  }

  @Get("refreshToken")
  @UseGuards(RefreshGuard)
  @RefreshTokenSwagger()
  async refreshToken(@Req() req:CustomRequest): Promise<RefreshTokenResponseDto> {
    return req.user;
  }
}