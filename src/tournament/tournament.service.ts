import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { User } from "src/utils/decorators/userId-decorator";
import { CreateTournamentDto } from "./dtos/create-tournament.dto";
import { Tournament } from "@prisma/client";
import { UpdateTournamentDto } from "./dtos/update-tournament.dto";

@Injectable()
export class TournamentService{
  constructor(private readonly prismaService:PrismaService){}

  async createTournament(@User() user: { id: number }, createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    return this.prismaService.tournament.create({
      data: {
        ...createTournamentDto,
        creator: {
          connect: { id: user.id },
        },
      },
    });
  }

  async getAllTournaments():Promise<Omit<Tournament, "userId" | "createdAt" | "updatedAt">[]>{
    return await this.prismaService.tournament.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        start_date: true,
        end_date: true,
        location: true,
        max_participant: true,
      },
    });
  }

  async findTournamentById(id: number): Promise<Tournament | null> {
    return await this.prismaService.tournament.findUnique({
      where: { id },
      include: {
        participations: true,
        creator: {
          select: {
            firstname: true,
            lastname: true
          }
        }
      }
    });
  }

  async updateTournament(id: number, updateTournamentDto: UpdateTournamentDto): Promise<Tournament> { 
    return this.prismaService.tournament.update({
      where: { id },
      data: updateTournamentDto,
    });
  }

  async deleteTournament(id: number): Promise<Tournament> {
    return await this.prismaService.tournament.delete({
      where: { id },
    });
  }

}