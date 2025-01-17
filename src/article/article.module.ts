import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { UserModule } from "src/user/user.module";

@Module({
  imports:[PrismaModule, UserModule],
  controllers:[ArticleController],
  providers:[ArticleService],
  exports:[ArticleService]
})

export class ArticleModule {}