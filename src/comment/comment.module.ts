import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ArticleModule } from "src/article/article.module";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [PrismaModule, ArticleModule, UserModule],
  controllers: [CommentController],
  providers: [CommentService],
})

export class CommentModule {}