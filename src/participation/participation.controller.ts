import { Body, Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TournamentService } from "src/tournament/tournament.service";
import { ParticipationService } from "./participation.service";
import { IsBannedGuard } from "src/auth/guards/isBanned.guard";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { User } from "src/utils/decorators/userId-decorator";
import { CreateParticipationDto } from "./dtos/create-participation.dto";
import { DeleteParticipationSwagger, PostParticipationSwagger } from "./swagger/pariticipation.swagger";
import { ParticipationCustomErrors, TournamentCustomErrors } from "src/utils/exceptions/error-types";

@Controller('tournament/participation')
@ApiTags('participation')
export class ParticipationController {
  constructor(
    private tournamentService: TournamentService,
    private participationService: ParticipationService
  ) {}

  @UseGuards(IsBannedGuard, AuthGuard)
  @PostParticipationSwagger()
  @Post(':tournamentId')
  async create(@Param('tournamentId') tournamentId: number, @User() user: { id: number }, @Body() createParticipationDto: CreateParticipationDto) {
    const existingTournament = await this.tournamentService.findTournamentById(+tournamentId);
    if(!existingTournament){
      throw TournamentCustomErrors.TOURNAMENT_NOT_FOUND;
    }
    const userLicence = await this.participationService.findLicence(user.id);
    if (!userLicence) {
      throw ParticipationCustomErrors.USER_ERROR;
    }
    const partnerLicence = await this.participationService.findLicence(createParticipationDto.partnerId);
    if (!partnerLicence) {
      throw ParticipationCustomErrors.PARTNER_ERROR;
    }
    const dateTournament = await this.participationService.verifyDate(tournamentId);
    if(!dateTournament){
      throw ParticipationCustomErrors.DATE_ERROR;
    }
    const userParticipation = await this.participationService.findParticipationInTournament(user.id, tournamentId);
    const partnerParticipation = await this.participationService.findParticipationInTournament(createParticipationDto.partnerId, tournamentId);
    if(userParticipation || partnerParticipation){
      throw ParticipationCustomErrors.ALREADY_PARTICIPANT;
    }
    if(user.id === +createParticipationDto.partnerId){
      throw ParticipationCustomErrors.SAME_USER_PARTNER;
    }
    const participants = await this.participationService.verifyDisponibility(tournamentId);
    const lastParticipants = existingTournament.max_participant-1;
    if(participants > lastParticipants){
      throw ParticipationCustomErrors.TOURNAMENT_FULL;
    }
    return this.participationService.createParticiaption(user.id, createParticipationDto.partnerId, tournamentId);
  }

  @UseGuards(IsBannedGuard, AuthGuard)
  @DeleteParticipationSwagger()
  @Delete(':tournamentId')
  async delete(@Param('tournamentId') tournamentId: number, @User() user: { id: number }) {
    const existingTournament = await this.tournamentService.findTournamentById(+tournamentId);
    if(!existingTournament){
      throw TournamentCustomErrors.TOURNAMENT_NOT_FOUND;
    }
    const userLicence = await this.participationService.findLicence(user.id);
    if (!userLicence) {
      throw ParticipationCustomErrors.USER_ERROR;
    }
    const userParticipation = await this.participationService.findParticipationInTournament(user.id, tournamentId);
    if(!userParticipation){
      throw ParticipationCustomErrors.NO_PARTICIPATION_FOUND;
    }
    return this.participationService.deleteParticiaption(userParticipation.id);
  }
}