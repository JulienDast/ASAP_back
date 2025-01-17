import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateLikeDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'ID of the user who liked the article',
    example: 1,
  })
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'ID of the article being liked',
    example: 1,
  })
  articleId: number;
}