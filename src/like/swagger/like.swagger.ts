import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiOkResponse, ApiBearerAuth, ApiHeader } from "@nestjs/swagger";
import { CreateLikeDto } from "../dtos/create-like.dto";
import { ApiCustomResponses } from "src/utils/decorators/custom-response.decorator";
import { ArticleCustomErrors, LikeCustomErrors } from "src/utils/exceptions/error-types";

export function PostLikeSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'authorization',
      description: '"Bearer" + access_token',
      required: true,
    }),
    ApiOperation({summary: 'Liker un article'}),
    ApiOkResponse({type: CreateLikeDto ,description: 'Like ajouté à l\'article !'}),
    ApiCustomResponses([ArticleCustomErrors.ARTICLE_NOT_FOUND, LikeCustomErrors.ALREADY_LIKED]),
  );
}

export function DeleteLikeSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiHeader({
      name: 'authorization',
      description: '"Bearer" + access_token',
      required: true,
    }),
    ApiOperation({summary: 'Unliker un article'}),
    ApiOkResponse({type: CreateLikeDto ,description: 'Like retiré de l\'article !'}),
    ApiCustomResponses([ArticleCustomErrors.ARTICLE_NOT_FOUND, LikeCustomErrors.LIKE_NOT_FOUND]),
  );
}