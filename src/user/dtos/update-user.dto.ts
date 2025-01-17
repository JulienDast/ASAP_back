import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsOptional } from "class-validator";

export class UpdateUserDto {

  @IsOptional()
  @ApiProperty({ 
    example: 'John', 
    description: 'First name of the user',
    required: false
  })
  firstname?: string;

  @IsOptional()
  @ApiProperty({
    example: 'Doe', 
    description: 'Last name of the user',
    required: false
  })
  lastname?: string;

  @IsOptional()
  @ApiProperty({
    example: 'This is my bio',
    description: 'Bio of the user',
    required: false
  })
  bio?: string;

  @IsOptional()
  @IsMobilePhone()
  @ApiProperty({
    example: '0123456789',
    description: 'Phone number of the user',
    required: false
  })
  phone?: string;

  @IsOptional()
  @ApiProperty({ 
    example: 'ABCDE123', 
    description: 'License number of the user',
    required: false
  })
  licence?: string;

  @IsOptional()
  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'Avatar URL of the user',
    required: false
  })
  avatar?: string;
}