import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { ParticipationService } from "./participation.service";
import { ParticipationController } from "./participation.controller";
import { UserModule } from "src/user/user.module";
import { TournamentModule } from "src/tournament/tournament.module";


@Module({
  imports: [PrismaModule, UserModule, TournamentModule],
  controllers: [ParticipationController],
  providers: [ParticipationService],
})

export class ParticipationModule{}