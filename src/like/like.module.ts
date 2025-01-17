import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { ArticleModule } from 'src/article/article.module';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [PrismaModule, ArticleModule, UserModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}