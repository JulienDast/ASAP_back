import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { TournamentModule } from './tournament/tournament.module';
import { ParticipationModule } from './participation/participation.module';

@Module({
  imports: [UserModule, AuthModule, ArticleModule, LikeModule, CommentModule, TournamentModule, ParticipationModule],
})
export class AppModule {}
