import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiOkResponse, ApiBearerAuth, ApiHeader } from "@nestjs/swagger";
import { ApiCustomResponses } from "src/utils/decorators/custom-response.decorator";
import { RoleErrors, TournamentCustomErrors } from "src/utils/exceptions/error-types";
import { CreateTournamentDto } from "../dtos/create-tournament.dto";
import { UpdateTournamentDto } from "../dtos/update-tournament.dto";

export function GetAllTournamentsSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Obtenir la liste des tournois' }),
    ApiOkResponse({
      description: 'Liste des tournois',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            description: { type: 'string' },
            start_date: { type: 'string' },
            end_date: { type: 'string' },
            location: { type: 'string' },
            max_participant: { type: 'number' },
          },
        },
      },
    })
  );
}

export function GetOneTournamentSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Afficher un tournoi' }),
    ApiOkResponse({
      description: 'Détails du tournoi',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          title: { type: 'string' },
          description: { type: 'string' },
          start_date: { type: 'string', format: 'date-time' },
          end_date: { type: 'string', format: 'date-time' },
          location: { type: 'string' },
          max_participant: { type: 'number' },
          participations: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                //TODO ajouter les caratéritiques des participations
              }
            }
          },
          creator: {
            type: 'object',
            properties: {
              firstname: { type: 'string' },
              lastname: { type: 'string' }
            }
          }
        },
      },
    }),
    ApiCustomResponses([TournamentCustomErrors.TOURNAMENT_NOT_FOUND])
  );
}

export function PostTournamentSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'authorization',
      description: '"Bearer" + access_token',
      required: true,
    }),
    ApiOperation({summary: 'Créer un tournoi'}),
    ApiOkResponse({type: CreateTournamentDto ,description: 'Tournoi publié !'}),
    ApiCustomResponses([RoleErrors.FORBIDDEN])
  );
}

export function UpdateTournamentSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'authorization',
      description: '"Bearer" + access_token',
      required: true,
    }),
    ApiOperation({summary: 'Modifier un tournoi'}),
    ApiOkResponse({type: UpdateTournamentDto ,description: 'Tournoi modifié !'}),
    ApiCustomResponses([TournamentCustomErrors.TOURNAMENT_NOT_FOUND ,RoleErrors.FORBIDDEN])
  );
}

export function DeleteTournamentSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'authorization',
      description: '"Bearer" + access_token',
      required: true,
    }),
    ApiOperation({summary: 'Supprimer un tournoi'}),
    ApiOkResponse({description: 'Tournoi supprimé !'}),
    ApiCustomResponses([TournamentCustomErrors.TOURNAMENT_NOT_FOUND ,RoleErrors.FORBIDDEN])
  );
}