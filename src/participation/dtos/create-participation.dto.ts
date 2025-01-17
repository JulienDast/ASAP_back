import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateParticipationDto {

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'ID du partenaire choisi pour participer au tournoi',
    example: 2,
  })
  partnerId: number;
}
