import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { Role, Status, User } from '@prisma/client';
import { CreateUserDto } from "./dtos/create-user.dto";
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UpdateUserStatusDto } from "./dtos/change-status.dto";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    if(!email) return null;
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findByLicence(licence: string): Promise<User | null> {
    if(!licence || licence.trim() === '') return null;
    return await this.prismaService.user.findUnique({
      where: { licence },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = +process.env.SALT_ROUNDS;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    if (!createUserDto.licence || createUserDto.licence.trim() === '') {
      delete createUserDto.licence;
    }
    return await this.prismaService.user.create({
      data:{ ...createUserDto, password:hashedPassword, role:Role.MEMBER, status:Status.INCOMPLETE }
    });
  }

  async getAllUsers(): Promise<Pick<User, 'id' |'firstname' | 'lastname' | 'licence' | 'avatar'>[]> {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        licence: true,
        avatar:true
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { id },
      include: {likes: true, comments:true}
    });
  }

  async updateProfile(id: number, updateUserDto: UpdateUserDto): Promise<User> { 
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async updateStatus(id: number, updateUserStatusDto: UpdateUserStatusDto): Promise<User> { 
    return this.prismaService.user.update({
      where: { id },
      data: updateUserStatusDto,
    });
  }
  
  async deleteUser(id: number): Promise<User> {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }
}
