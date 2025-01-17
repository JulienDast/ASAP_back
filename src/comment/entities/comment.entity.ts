import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "@prisma/client";

export class CommentEntity implements Partial<Comment> {
  
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 1
  })
  userId: number;

  @ApiProperty({
    description: 'Unique identifier of the article',
    example: 1
  })
  articleId: number;

  @ApiProperty({
    description: 'Comment text',
    example: "Ceci est un commentaire."
  })
  text: string;
  
  @ApiProperty({
    description: 'Date and time when the comment was created',
    example: '2023-06-01T12:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the comment was last updated',
    example: '2023-06-15T10:30:00.000Z'
  })
  updatedAt: Date;

  constructor(partial: Partial<CommentEntity>) {
    Object.assign(this, partial);
  }
}