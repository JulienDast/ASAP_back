import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsDate } from 'class-validator';
import { Tournament } from '@prisma/client';

export class TournamentEntity implements Partial<Tournament> {
  
  @ApiProperty({
    description: 'L\'identifiant unique du tournoi',
    example: 1,
  })
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Le titre du tournoi',
    example: 'P500',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'La description du tournoi',
    example: 'P500 à Agnetz prévu sur le weekend, fin des inscriptions 3 jours avant le début du tournoi.',
  })
  description: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    description: 'La date de début du tournoi',
    example: '2024-07-27T10:00:00Z',
  })
  start_date: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    description: 'La date de fin du tournoi',
    example: '2024-07-29T18:00:00Z',
  })
  end_date: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Le lieu du tournoi',
    example: 'Club ASA Agnetz',
  })
  location: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description: 'Le nombre maximum de participants',
    example: 16,
  })
  max_participant: number;

  @ApiProperty({
    description: 'L\'identifiant de l\'auteur du tournoi',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Date de création du tournoi',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de mise à jour du tournoi',
  })
  updatedAt: Date;

  constructor(partial: Partial<Tournament>) {
    Object.assign(this, partial);
  }
}