import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "prisma/prisma.module";

@Module({
  imports : [UserModule, PrismaModule, JwtModule.register({global:true})],
  controllers : [AuthController],
  providers : [AuthService]
})

export class AuthModule {}