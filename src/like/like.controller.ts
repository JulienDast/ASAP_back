import { Controller, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { User } from 'src/utils/decorators/userId-decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ArticleService } from 'src/article/article.service';
import { ArticleCustomErrors, LikeCustomErrors } from 'src/utils/exceptions/error-types';
import { ApiTags } from '@nestjs/swagger';
import { DeleteLikeSwagger, PostLikeSwagger } from './swagger/like.swagger';
import { IsBannedGuard } from 'src/auth/guards/isBanned.guard';

@Controller('like')
@ApiTags('like')
export class LikeController {
  constructor(
    private likeService: LikeService,
    private articleService: ArticleService
  ) {}

  @UseGuards(IsBannedGuard, AuthGuard)
  @PostLikeSwagger()
  @Post(':articleId')
  async create(@Param('articleId') articleId: number, @User() user: { id: number }) {
    const existingArticle = await this.articleService.findArticleById(+articleId);
    if(!existingArticle){
      throw ArticleCustomErrors.ARTICLE_NOT_FOUND;
    }
    const existingLike = await this.likeService.findLike(user.id, articleId)
    if (existingLike) {
      throw LikeCustomErrors.ALREADY_LIKED;
    }
    return this.likeService.create({
      userId: user.id,
      articleId: articleId,
    });
  }

  @UseGuards(AuthGuard)
  @DeleteLikeSwagger()
  @Delete(':articleId')
  async remove(@Param('articleId') articleId: number, @User() user: { id: number }) {
    const existingArticle = await this.articleService.findArticleById(+articleId);
    if(!existingArticle){
      throw ArticleCustomErrors.ARTICLE_NOT_FOUND;
    }
    const existingLike = await this.likeService.findLike(user.id, articleId)
    if (!existingLike) {
      throw LikeCustomErrors.LIKE_NOT_FOUND;
    }
    return this.likeService.remove(user.id, articleId);
  }
}