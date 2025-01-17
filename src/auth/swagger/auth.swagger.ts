import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ApiCustomResponses } from 'src/utils/decorators/custom-response.decorator';
import { AuthCustomErrors } from 'src/utils/exceptions/error-types';
import { RefreshTokenResponseDto } from '../dtos/refreshToken';

export function SignInSwagger() {
  return applyDecorators(
    ApiOperation({summary: 'Authentification utilisateur'}),
    ApiOkResponse({description: 'Connexion utilisateur'}),
    ApiCustomResponses([AuthCustomErrors.EMAIL_NOT_FOUND, AuthCustomErrors.INVALID_PASSWORD])
  );
}

export function RefreshTokenSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Rafraichissement des tokens' }),
    ApiBearerAuth(),
    ApiHeader({
      name: 'refresh_token',
      description: 'access_token',
      required: true,
    }),
    ApiOkResponse({
      type: RefreshTokenResponseDto,
      description: 'Tokens renouvelés',
    }),
    ApiCustomResponses([AuthCustomErrors.INVALID_REFRESH_TOKEN]),
  );
}
