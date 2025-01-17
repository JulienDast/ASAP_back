import { Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dtos/create-article.dto";
import { PrismaService } from "prisma/prisma.service";
import { Article } from "@prisma/client";
import { UpdateArticleDto } from "./dtos/update-article.dto";
import { User } from "src/utils/decorators/userId-decorator";

@Injectable()
export class ArticleService{
  constructor(private readonly prismaService:PrismaService){}

  async getAllArticles():Promise<Omit<Article, 'subtitle' | 'body'>[]>{
    return await this.prismaService.article.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        picture: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      }
    });
  }

  async findArticleById(id: number): Promise<Article | null> {
    return await this.prismaService.article.findUnique({
      where: { id },
      include: { likes:true, comments:true, author:true}
    });
  }

  async createArticle(@User() user: { id: number }, createArticleDto: CreateArticleDto): Promise<Article> {
    return this.prismaService.article.create({
      data: {
        ...createArticleDto,
        author: {
          connect: { id: user.id },
        },
      },
    });
  }

  async updateArticle(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> { 
    return this.prismaService.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async deleteArticle(id: number): Promise<Article> {
    return await this.prismaService.article.delete({
      where: { id },
    });
  }
}