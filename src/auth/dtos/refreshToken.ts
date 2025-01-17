import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RefreshTokenResponseDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'JWT token',
  })
  access_token: string;
  
  @IsNotEmpty()
  @ApiProperty({
    description: 'JWT refresh token',
  })
  refresh_token: string;
}