import { Request } from 'express';
import { RefreshTokenResponseDto } from 'src/auth/dtos/refreshToken';

export interface CustomRequest extends Request {
  user: RefreshTokenResponseDto;
}