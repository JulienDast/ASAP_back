import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SigninDto{
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    example: 'JohnDoe@test.com'
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    example: 'Password123',
    minLength: 8,
    maxLength: 50
  })
  password: string;
}