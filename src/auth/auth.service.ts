import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "prisma/prisma.service";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService{
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ) {}

  async compare(password: string, user_password: string): Promise<boolean>{
    return bcrypt.compare(password, user_password);
  }

  async hash(refresh_token:string):Promise<string>{
    const saltRounds = +process.env.SALT_ROUNDS;
    return bcrypt.hash(refresh_token, saltRounds);
  }

  async createToken(payload: { id :number }, secret: string, expiration :string|number):Promise<string>{
    return this.jwtService.signAsync(payload, {secret, expiresIn : expiration})
  }

  async updateToken(id: number, data: Partial<User>): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data,
    });
  }

}