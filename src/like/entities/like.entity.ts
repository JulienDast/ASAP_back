import { ApiProperty } from "@nestjs/swagger";
import { Like } from "@prisma/client";

export class LikeEntity implements Partial<Like> {
  
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
    description: 'Date and time when the user was created',
    example: '2023-06-01T12:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the user was last updated',
    example: '2023-06-15T10:30:00.000Z'
  })
  updatedAt: Date;

  constructor(partial: Partial<LikeEntity>) {
    Object.assign(this, partial);
  }
}