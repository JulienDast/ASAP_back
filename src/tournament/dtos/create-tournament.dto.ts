import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsDate, IsInt } from "class-validator";

export class CreateTournamentDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'P500',
    description: 'Le titre du tournoi'
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'P500 à Agnetz prévu sur le weekend, fin des inscriptions 3 jours avant le début du tournoi.',
    description: 'La description du tournoi'
  })
  description: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '2024-07-27T10:00:00Z',
    description: 'La date de début du tournoi'
  })
  start_date: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '2024-07-29T18:00:00Z',
    description: 'La date de fin du tournoi'
  })
  end_date: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Club ASA Agnetz',
    description: 'Le lieu du tournoi'
  })
  location: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: 16,
    description: 'Le nombre maximum de participants'
  })
  max_participant: number;
}
