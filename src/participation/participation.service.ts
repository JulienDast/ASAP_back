import { Injectable } from '@nestjs/common';
import { Participation } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ParticipationService {
  constructor(
    private prismaService: PrismaService,
    private userService : UserService,
  ) {}

  async findLicence(userId: number): Promise<boolean>{
    const user = await this.userService.findById(+userId);
    if(!user || !user.licence){
      return false;
    } else {
      return true;
    }
  }

  async findParticipationInTournament(userId: number, tournamentId: number):Promise<Participation| null> {
    const participation = await this.prismaService.participation.findFirst({
      where: {
        tournamentId: +tournamentId,
        OR: [
          { userId: +userId },
          { partnerId: +userId }
        ]
      }
    });
    return participation;
  }

  async verifyDisponibility(tournamentId: number): Promise<number>{
    const tournament = await this.prismaService.tournament.findUnique({
      where:{
        id: +tournamentId
      },
      include:{
        participations:true
      }
    })
    return tournament.participations.length;
  }

  async verifyDate(tournamentId: number): Promise<boolean>{
    const tournament = await this.prismaService.tournament.findUnique({
      where:{
        id: +tournamentId
      }
    })
    const startTournament = tournament.start_date;
    const dateNow = new Date();
    return dateNow < startTournament;
  }

  async createParticiaption(userId: number, partnerId: number, tournamentId: number ): Promise<Participation> {
    return this.prismaService.participation.create({
      data: {
        userId,
        partnerId: +partnerId,
        tournamentId: +tournamentId
      },
    });
  }

  async deleteParticiaption(tournamentId: number){
    return this.prismaService.participation.delete({
      where: { id: +tournamentId},
    });
  }
}
