import { ApiProperty } from "@nestjs/swagger";
import { Category } from "@prisma/client";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateArticleDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Journées portes ouvertes au club !',
    description: 'Article title'
  })
  title: string;

  @IsString()
  @ApiProperty({ 
    example: 'Venez faire un essai au club ce vendredi 27 juillet !', 
    description: 'Article subtitle'
  })
  subtitle?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(65000)
  @ApiProperty({
    example: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"', 
    description: 'Article text',
    maxLength: 65000
  })
  body: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Divers',
    description: 'Type of information'
  })
  category: Category;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ 
    example: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Campo_de_Padel.jpg', 
    description: 'Article illustration'
  })
  picture: string;
}