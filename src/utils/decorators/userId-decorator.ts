import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (_data: number, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return { id: request.user['id'] };
  },
);