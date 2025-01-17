import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiOkResponse, ApiBearerAuth, ApiHeader } from "@nestjs/swagger";
import { ApiCustomResponses } from "src/utils/decorators/custom-response.decorator";
import { ArticleEntity } from "../entities/article.entity";
import { ArticleCustomErrors, RoleErrors } from "src/utils/exceptions/error-types";
import { CreateArticleDto } from "../dtos/create-article.dto";
import { UpdateArticleDto } from "../dtos/update-article.dto";
import { Category } from "@prisma/client";

export function GetAllArticlesSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Obtenir la liste des articles' }),
    ApiOkResponse({
      description: 'Liste des articles',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            category: { type: Category.toString() },
            picture: { type: 'string' },
            userId: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
            _count: {
              type: 'object',
              properties: {
                likes: { type: 'number' },
                comments: { type: 'number' }
              }
            }
          },
        },
      },
    })
  );
}

export function GetOneArticleSwagger() {
  return applyDecorators(
    ApiOperation({summary: 'Afficher un article'}),
    ApiOkResponse({type: ArticleEntity ,description: 'Détails de l\'article'}),
    ApiCustomResponses([ArticleCustomErrors.ARTICLE_NOT_FOUND])
  );
}

export function PostArticleSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'authorization',
      description: '"Bearer" + access_token',
      required: true,
    }),
    ApiOperation({summary: 'Créer un article'}),
    ApiOkResponse({type: CreateArticleDto ,description: 'Article publié !'}),
    ApiCustomResponses([RoleErrors.FORBIDDEN])
  );
}

export function UpdateArticleSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'authorization',
      description: '"Bearer" + access_token',
      required: true,
    }),
    ApiOperation({summary: 'Modifier un article'}),
    ApiOkResponse({type: UpdateArticleDto ,description: 'Article modifié !'}),
    ApiCustomResponses([ArticleCustomErrors.ARTICLE_NOT_FOUND ,RoleErrors.FORBIDDEN])
  );
}

export function DeleteArticleSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'authorization',
      description: '"Bearer" + access_token',
      required: true,
    }),
    ApiOperation({summary: 'Supprimer un article'}),
    ApiOkResponse({description: 'Article supprimé !'}),
    ApiCustomResponses([ArticleCustomErrors.ARTICLE_NOT_FOUND ,RoleErrors.FORBIDDEN])
  );
}