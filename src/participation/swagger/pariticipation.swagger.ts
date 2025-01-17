import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { CreateParticipationDto } from "../dtos/create-participation.dto";
import { ApiCustomResponses } from "src/utils/decorators/custom-response.decorator";
import { ParticipationCustomErrors, TournamentCustomErrors } from "src/utils/exceptions/error-types";

export function PostParticipationSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'authorization',
      description: '"Bearer" + access_token',
      required: true,
    }),
    ApiOperation({summary: 'Participer avec un partenaire au tournoi'}),
    ApiOkResponse({type: CreateParticipationDto ,description: 'Participation au tournoi avec le partenaire enregistrée !'}),
    ApiCustomResponses([
      TournamentCustomErrors.TOURNAMENT_NOT_FOUND,
      ParticipationCustomErrors.USER_ERROR,
      ParticipationCustomErrors.PARTNER_ERROR,
      ParticipationCustomErrors.ALREADY_PARTICIPANT, 
      ParticipationCustomErrors.TOURNAMENT_FULL,
      ParticipationCustomErrors.DATE_ERROR,
      ParticipationCustomErrors.SAME_USER_PARTNER
    ]),
  );
}

export function DeleteParticipationSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'authorization',
      description: '"Bearer" + access_token',
      required: true,
    }),
    ApiOperation({summary: 'Supprimer la participation à un tournoi'}),
    ApiOkResponse({description: 'Participation àce tournoi supprimée pour le user et le partner !'}),
    ApiCustomResponses([
      TournamentCustomErrors.TOURNAMENT_NOT_FOUND,
      ParticipationCustomErrors.USER_ERROR,
      ParticipationCustomErrors.NO_PARTICIPATION_FOUND
    ]),
  );
}