import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiOkResponse, ApiBearerAuth, ApiHeader } from "@nestjs/swagger";
import { CommentEntity } from "../entities/comment.entity";
import { CreateCommentDto } from "../dtos/create-comment.dto";
import { ApiCustomResponses } from "src/utils/decorators/custom-response.decorator";
import { ArticleCustomErrors, CommentCustomErrors } from "src/utils/exceptions/error-types";
import { UpdateCommentDto } from "../dtos/update-comment.dto";

export function GetAllCommentsSwagger() {
  return applyDecorators(
    ApiOperation({summary: 'Afficher tous les commentaires'}),
    ApiOkResponse({type: [CommentEntity] ,description: 'Liste des commentaires'}),
  );
}

export function PostCommentSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'authorization',
      description: '"Bearer" + access_token',
      required: true,
    }),
    ApiOperation({summary: 'Poster un commentaire'}),
    ApiOkResponse({type: [CreateCommentDto] ,description: 'Commentaire posté !'}),
    ApiCustomResponses([ArticleCustomErrors.ARTICLE_NOT_FOUND])
  );
}

export function UpdateCommentSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'authorization',
      description: '"Bearer" + access_token',
      required: true,
    }),
    ApiOperation({summary: 'Modifier un commentaire'}),
    ApiOkResponse({type: [UpdateCommentDto] ,description: 'Commentaire modifié !'}),
    ApiCustomResponses([CommentCustomErrors.COMMENT_NOT_FOUND, CommentCustomErrors.FORBIDDEN])
  );
}

export function DeleteCommentSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'authorization',
      description: '"Bearer" + access_token',
      required: true,
    }),
    ApiOperation({summary: 'Supprimer un commentaire'}),
    ApiOkResponse({type: [UpdateCommentDto] ,description: 'Commentaire modifié !'}),
    ApiCustomResponses([CommentCustomErrors.COMMENT_NOT_FOUND, CommentCustomErrors.FORBIDDEN])
  );
}