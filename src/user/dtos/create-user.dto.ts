import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'JohnDoe@test.com'
  })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  @ApiProperty({
    description: 'User password - minLength : 8, maxLength: 50, minNumbers : 1 ',
    example: 'Password123',
    minLength: 8,
    maxLength: 50
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ 
    example: 'John', 
    description: 'First name of the user'
  })
  firstname: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Doe', 
    description: 'Last name of the user'
  })
  lastname: string;

  @IsMobilePhone()
  @ApiProperty({
    required: false, 
    example: '0123456789',
    description: 'Phone number of the user (optional)'
  })
  phone?: string;

  @ApiProperty({ 
    required: false, 
    example: 'ABCDE123', 
    description: 'License number of the user (optional)'
  })
  licence?: string;
}