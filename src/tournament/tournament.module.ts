import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { TournamentController } from "./tournament.controller";
import { TournamentService } from "./tournament.service";

@Module({
  imports:[PrismaModule, UserModule],
  controllers:[TournamentController],
  providers:[TournamentService],
  exports:[TournamentService]
})

export class TournamentModule {}