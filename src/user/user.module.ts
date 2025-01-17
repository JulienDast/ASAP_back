import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { IsAdminGuard } from "src/auth/guards/isAdmin.guard";
import { AdminOrOwnProfileGuard } from "src/auth/guards/AdminOrOwner.guard";
import { OwnProfileGuard } from "src/auth/guards/ownProfile.guard";

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, IsAdminGuard, AdminOrOwnProfileGuard, OwnProfileGuard],
  exports: [UserService]
})

export class UserModule {}