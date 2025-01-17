import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {

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

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Texte du commentaire',
    example: "Commentaire de l'utilisateur avec id 1 sur l'article id 1"
  })
  text: string;
}