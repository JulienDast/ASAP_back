import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dtos/create-article.dto";
import { Article } from "@prisma/client";
import { ArticleCustomErrors } from "src/utils/exceptions/error-types";
import { UpdateArticleDto } from "./dtos/update-article.dto";
import { IsAdminGuard } from "src/auth/guards/isAdmin.guard";
import { DeleteArticleSwagger, GetAllArticlesSwagger, GetOneArticleSwagger, PostArticleSwagger, UpdateArticleSwagger } from "./swagger/article.swagger";
import { User } from "src/utils/decorators/userId-decorator";

@Controller('article')
@ApiTags('article')
export class ArticleController{
  constructor(private readonly articleService: ArticleService){}

  @Get()
  @GetAllArticlesSwagger()
  async getAllArticles(): Promise<Omit<Article, 'subtitle' | 'body'>[]> {
    return await this.articleService.getAllArticles();
  }

  @Get(':articleId')
  @GetOneArticleSwagger()
  async getOneArticle(@Param('articleId') id: string):Promise<Article>{
    const existingArticle = await this.articleService.findArticleById(+id)
    if(!existingArticle){
      throw ArticleCustomErrors.ARTICLE_NOT_FOUND;
    }
    return existingArticle;
  }

  @Post()
  @UseGuards(IsAdminGuard)
  @PostArticleSwagger()
  async create(@Body() createArticleDto: CreateArticleDto, @User() user: { id: number }) {
    return this.articleService.createArticle(user, createArticleDto);
  }

  @Patch(':articleId')
  @UpdateArticleSwagger()
  @UseGuards(IsAdminGuard)
  async update(@Param('articleId') id: string, @Body() updateArticleDto: UpdateArticleDto): Promise<Article> {
    const existingArticle = await this.articleService.findArticleById(+id);
    if (!existingArticle) {
      throw ArticleCustomErrors.ARTICLE_NOT_FOUND;
    }
    return this.articleService.updateArticle(+id, updateArticleDto);
  }

  @Delete(':articleId')
  @DeleteArticleSwagger()
  @UseGuards(IsAdminGuard)
  async delete(@Param('articleId') id: string): Promise<Article>{
    const existingArticle = await this.articleService.findArticleById(+id);
    if (!existingArticle) {
      throw ArticleCustomErrors.ARTICLE_NOT_FOUND;
    }
    return this.articleService.deleteArticle(+id);
  }
}