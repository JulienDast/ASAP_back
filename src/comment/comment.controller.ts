import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ArticleService } from "src/article/article.service";
import { CommentService } from "./comment.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { User } from "src/utils/decorators/userId-decorator";
import { ArticleCustomErrors, CommentCustomErrors } from "src/utils/exceptions/error-types";
import { CreateCommentDto } from "./dtos/create-comment.dto";
import { Comment, Role } from "@prisma/client";
import { UpdateCommentDto } from "./dtos/update-comment.dto";
import { DeleteCommentSwagger, GetAllCommentsSwagger, PostCommentSwagger, UpdateCommentSwagger } from "./swagger/comment.swagger";
import { IsBannedGuard } from "src/auth/guards/isBanned.guard";
import { UserService } from "src/user/user.service";

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private articleService: ArticleService,
    private userService: UserService
  ) {}

  @Get()
  @GetAllCommentsSwagger()
  async getAllComments():Promise<Comment[]>{
    return await this.commentService.getAllComments();
  }

  @UseGuards(IsBannedGuard, AuthGuard)
  @Post(':articleId')
  @PostCommentSwagger()
  async create(@Param('articleId') articleId: number, @User() user: { id: number }, @Body() createCommentDto: CreateCommentDto) {
    const existingArticle = await this.articleService.findArticleById(+articleId);
    if (!existingArticle) {
      throw ArticleCustomErrors.ARTICLE_NOT_FOUND;
    }
    return this.commentService.createComment(user.id, +articleId, createCommentDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':commentId')
  @DeleteCommentSwagger()
  async remove(@Param('commentId') commentId: number, @User() user: { id: number}) {
    const existingComment = await this.commentService.findComment(commentId);
    const currentUser = await this.userService.findById(user.id);
    const currentUserRole = currentUser.role;
    
    if(!existingComment){
      throw CommentCustomErrors.COMMENT_NOT_FOUND;
    }
    if((existingComment.userId !== user.id) && (currentUserRole !== Role.ADMIN)){
      throw CommentCustomErrors.FORBIDDEN;
    }
    return this.commentService.removeComment(commentId);
  }
 
  @UseGuards(IsBannedGuard, AuthGuard)
  @Patch(':commentId')
  @UpdateCommentSwagger()
  async update(@Param('commentId') commentId: number, @Body() updateCommentDto: UpdateCommentDto, @User() user: { id: number }) {
    const existingComment = await this.commentService.findComment(commentId);
    if (!existingComment) {
      throw CommentCustomErrors.COMMENT_NOT_FOUND;
    }
    if (existingComment.userId !== user.id) {
      throw CommentCustomErrors.FORBIDDEN;
    }
    return this.commentService.updateComment(commentId, updateCommentDto); 
  }

}