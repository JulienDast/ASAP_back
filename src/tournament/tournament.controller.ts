import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TournamentService } from "./tournament.service";
import { IsAdminGuard } from "src/auth/guards/isAdmin.guard";
import { User } from "src/utils/decorators/userId-decorator";
import { CreateTournamentDto } from "./dtos/create-tournament.dto";
import { Tournament } from "@prisma/client";
import { UpdateTournamentDto } from "./dtos/update-tournament.dto";
import { TournamentCustomErrors } from "src/utils/exceptions/error-types";
import { DeleteTournamentSwagger, GetAllTournamentsSwagger, GetOneTournamentSwagger, PostTournamentSwagger, UpdateTournamentSwagger } from "./swagger/tournament.swagger";

@Controller('tournament')
@ApiTags('tournament')
export class TournamentController{
  constructor(private readonly tournamentService: TournamentService){}

  @Get()
  @GetAllTournamentsSwagger()
  async getAllTournaments():Promise<Omit<Tournament, "userId" | "createdAt" | "updatedAt" >[]>{
    return await this.tournamentService.getAllTournaments();
  }

  @Get(':tournamentId')
  @GetOneTournamentSwagger()
  async getOneTournament(@Param('tournamentId') id: string):Promise<Tournament>{
    const existingTournament = await this.tournamentService.findTournamentById(+id)
    if(!existingTournament){
      throw TournamentCustomErrors.TOURNAMENT_NOT_FOUND;
    }
    return existingTournament;
  }

  @Post()
  @PostTournamentSwagger()
  @UseGuards(IsAdminGuard)
  async create(@Body() createTournamentDto: CreateTournamentDto, @User() user: { id: number }) {
    return this.tournamentService.createTournament(user, createTournamentDto);
  }

  @Patch(':tournamentId')
  @UpdateTournamentSwagger()
  @UseGuards(IsAdminGuard)
  async update(@Param('tournamentId') id: string, @Body() updateTournamentDto: UpdateTournamentDto): Promise<Tournament> {
    const existingTournament = await this.tournamentService.findTournamentById(+id)
    if(!existingTournament){
      throw TournamentCustomErrors.TOURNAMENT_NOT_FOUND;
    }
    return this.tournamentService.updateTournament(+id, updateTournamentDto);
  }

  @Delete(':tournamentId')
  @DeleteTournamentSwagger()
  @UseGuards(IsAdminGuard)
  async delete(@Param('tournamentId') id: string): Promise<Tournament>{
    const existingTournament = await this.tournamentService.findTournamentById(+id);
    if (!existingTournament) {
      throw TournamentCustomErrors.TOURNAMENT_NOT_FOUND;
    }
    return this.tournamentService.deleteTournament(+id);
  }
}
