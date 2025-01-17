import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCommentDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Texte du commentaire',
    example: "Commentaire de l'utilisateur avec id 1 sur l'article id 1"
  })
  text: string;
}