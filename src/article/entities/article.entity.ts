import { ApiProperty } from '@nestjs/swagger';
import { Article, Category } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';

export class ArticleEntity implements Partial<Article> {
  
  @ApiProperty({
     description: 'L\'identifiant unique de l\'article', example: 1
   })
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ 
    description: 'Le titre de l\'article', 
    example: 'Journées portes ouvertes au club !' 
  })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ 
    description: 'Le sous-titre de l\'article', 
    example: 'Venez faire un essai au club ce vendredi 27 juillet !' 
  })
  subtitle?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ 
    description: 'Le contenu de l\'article', 
    example: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...' 
  })
  body: string;

  @IsNotEmpty()
  @IsEnum(Category)
  @ApiProperty({ 
    enum: Category, 
    description: 'La catégorie de l\'article', 
    example: Category.DIVERS 
  })
  category: Category;

  @IsNotEmpty()
  @ApiProperty({ 
    description: 'L\'URL de l\'image de l\'article', 
    example: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Campo_de_Padel.jpg' 
  })
  picture: string;

  @ApiProperty({ description: 'L\'identifiant de l\'auteur de l\'article', example: 1 })
  userId: number;

  @ApiProperty({ description: 'Date de création de l\'article' })
  createdAt: Date;

  @ApiProperty({ description: 'Date de mise à jour de l\'article' })
  updatedAt: Date;

  @ApiProperty({ description: 'Liste des commentaires associés à l\'article', type: [String] })
  comments?: string[];

  @ApiProperty({ description: 'Liste des likes associés à l\'article', type: [String] })
  likes?: string[];

  constructor(partial: Partial<Article>) {
    Object.assign(this, partial);
  }
}