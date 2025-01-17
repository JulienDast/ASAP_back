import { ApiProperty } from "@nestjs/swagger";
import { Status } from "@prisma/client";
import { IsEnum } from "class-validator";

export class UpdateUserStatusDto {
  @IsEnum(Status)
  @ApiProperty({
    example: 'Banned',
    description: 'Statut de l\'utilisateur',
    required: true
  })
  status: Status;
}