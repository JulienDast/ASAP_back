import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { IsAdminGuard } from './isAdmin.guard';
import { OwnProfileGuard } from './ownProfile.guard';
import { AdminOrOwnerErrors } from 'src/utils/exceptions/error-types';

@Injectable()
export class AdminOrOwnProfileGuard implements CanActivate {
  constructor(
    private readonly isAdminGuard: IsAdminGuard,
    private readonly ownProfileGuard: OwnProfileGuard
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAdmin = await this.isAdminGuard.canActivate(context).catch(() => false);
    const isOwner = await this.ownProfileGuard.canActivate(context).catch(() => false);

    if (isAdmin || isOwner) {
      return true;
    }
    throw new ForbiddenException(AdminOrOwnerErrors.FORBIDDEN);
  }
}