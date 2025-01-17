import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { ApiCustomResponses } from 'src/utils/decorators/custom-response.decorator';
import { AdminOrOwnerErrors, UserCustomErrors } from 'src/utils/exceptions/error-types';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';

export function GetAllUsersSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Obtenir la liste des membres' }),
    ApiOkResponse({
      description: 'Liste des membres inscrits',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            firstname: { type: 'string' },
            lastname: { type: 'string' },
            licence: { type: 'string' },
          },
        },
      },
    })
  );
}
export function GetOneUserSwagger() {
  return applyDecorators(
    ApiOperation({summary: 'Obtenir les informations d\'un membre'}),
    ApiBearerAuth(),
    ApiHeader({
      name: 'authorization',
      description: '"Bearer" + access_token',
      required: true,
    }),
    ApiOkResponse({
      type: UserEntity,
      description: 'Récupérer un utilisateur par ID',
    }),
    ApiCustomResponses([UserCustomErrors.USER_NOT_FOUND]),
  );
}

export function PostUserSwagger() {
  return applyDecorators(
    ApiOperation({summary: 'Créer un compte utilisateur'}),
    ApiOkResponse({ type: CreateUserDto, description: 'Création de l\'utilisateur' }),
    ApiCustomResponses([UserCustomErrors.INFO_ALREADY_EXISTS]),
  );
}

export function UpdateUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'authorization',
      description: '"Bearer" + access_token',
      required: true,
    }),
    ApiOperation({summary: 'Modification du profil de l\'utilisateur'}),
    ApiOkResponse({ type: UpdateUserDto, description: 'Utilisateur correctement modifié' }),
    ApiCustomResponses([UserCustomErrors.INFO_ALREADY_EXISTS, UserCustomErrors.USER_NOT_FOUND]),
  );
}

export function UpdateUserStatusSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'authorization',
      description: '"Bearer" + access_token',
      required: true,
    }),
    ApiOperation({summary: 'Modification du rôle de l\'utilisateur'}),
    ApiOkResponse({ type: UpdateUserDto, description: 'Rôle de l\'utilisateur corerctement modifié'}),
    ApiCustomResponses([UserCustomErrors.USER_NOT_FOUND, UserCustomErrors.INVALID_STATUS]),
  );
}

export function DeleteUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'authorization',
      description: '"Bearer" + access_token',
      required: true,
    }),
    ApiOperation({summary: 'Suppression d\'un utilisateur'}),
    ApiOkResponse({description: 'Utilisateur correctement supprimé'}),
    ApiCustomResponses([UserCustomErrors.USER_NOT_FOUND, AdminOrOwnerErrors.FORBIDDEN]),
  );
}
