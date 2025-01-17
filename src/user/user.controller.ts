import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { Status, User } from '@prisma/client';
import { CreateUserDto } from "./dtos/create-user.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { UserCustomErrors } from "src/utils/exceptions/error-types";
import { DeleteUserSwagger, GetAllUsersSwagger, GetOneUserSwagger, PostUserSwagger, UpdateUserStatusSwagger, UpdateUserSwagger } from "./swagger/user.swagger";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { OwnProfileGuard } from "src/auth/guards/ownProfile.guard";
import { UpdateUserStatusDto } from "./dtos/change-status.dto";
import { IsAdminGuard } from "src/auth/guards/isAdmin.guard";
import { IsBannedGuard } from "src/auth/guards/isBanned.guard";
import { AdminOrOwnProfileGuard } from "src/auth/guards/AdminOrOwner.guard";

@Controller('user')
@ApiTags('user')
export class UserController{
  constructor(private readonly userService: UserService){}

  @Get()
  @GetAllUsersSwagger()
  async getAllUsers(): Promise<Pick<User, 'id' | 'firstname' | 'lastname' | 'licence' | 'avatar'>[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(IsBannedGuard, AuthGuard) //TODO vérifier le cumul des guards
  @GetOneUserSwagger()
  async findById(@Param('id') id: string):Promise<User>{
    const existingUser = await this.userService.findById(+id)
    if(!existingUser){
      throw UserCustomErrors.USER_NOT_FOUND;
    }
    return existingUser;
  }

  @Post()
  @PostUserSwagger()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const existingUserEmail = await this.userService.findByEmail(createUserDto.email);
    const existingUserLicence = await this.userService.findByLicence(createUserDto.licence);
    if(existingUserEmail){
      throw UserCustomErrors.INFO_ALREADY_EXISTS;
    }
    if(existingUserLicence){
      throw UserCustomErrors.INFO_ALREADY_EXISTS;
    }
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  @UseGuards(OwnProfileGuard)
  @UpdateUserSwagger()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userService.findById(+id);
    
    if (!existingUser) {
      throw UserCustomErrors.USER_NOT_FOUND;
    }

    if (updateUserDto.licence) {
      const existingUserLicence = await this.userService.findByLicence(updateUserDto.licence);
      if (existingUserLicence && existingUserLicence.id !== +id) {       
        throw UserCustomErrors.INFO_ALREADY_EXISTS;
      }
    }
    return this.userService.updateProfile(+id, updateUserDto);
  }

  @Patch(':id/status')
  @UpdateUserStatusSwagger()
  @UseGuards(IsAdminGuard)
  async updateStatus(@Param('id') id: string, @Body() updateUsersStatusDto: UpdateUserStatusDto): Promise<User> {
    const existingUser = await this.userService.findById(+id);
    if (!existingUser) {
      throw UserCustomErrors.USER_NOT_FOUND;
    }    
    if (!Object.values(Status).includes(updateUsersStatusDto.status)) {
      throw UserCustomErrors.INVALID_STATUS;
    }
    return this.userService.updateStatus(+id, updateUsersStatusDto);
  }

  @Delete(':id')
  @UseGuards(AdminOrOwnProfileGuard)
  @DeleteUserSwagger()
  async delete(@Param('id') id: string): Promise<User>{
    const existingUser = await this.userService.findById(+id);
    if (!existingUser) {
      throw UserCustomErrors.USER_NOT_FOUND;
    }
    return this.userService.deleteUser(+id);
  }
}
