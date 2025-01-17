import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prismaService: PrismaService) {}

  async create(data: { userId: number; articleId: number }) {
    return await this.prismaService.like.create({
      data: {
        userId: data.userId,
        articleId: +data.articleId,
      },
    });
  }

  async findLike(userId: number, articleId: number){
    const like = await this.prismaService.like.findUnique({
      where: {
        userId_articleId: {
          userId,
          articleId: +articleId,
        },
      },
    });
    return like;
  }

  async remove(userId: number, articleId: number) {
    return await this.prismaService.like.delete({
      where: {
        userId_articleId: {
          userId,
          articleId: +articleId,
        },
      },
    });
  }
}