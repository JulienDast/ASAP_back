import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateCommentDto } from "./dtos/create-comment.dto";
import { Comment } from "@prisma/client";
import { UpdateCommentDto } from "./dtos/update-comment.dto";

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async createComment(userId: number, articleId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.prismaService.comment.create({
      data: {
        ...createCommentDto,
        userId,
        articleId,
      },
    });
  }

  async getAllComments():Promise<Comment[]>{
    return await this.prismaService.comment.findMany()
  }

  async findComment(commentId: number){
    return await this.prismaService.comment.findUnique({
      where: { id: +commentId },
    });
  }
  
  async removeComment(commentId: number) {
    return await this.prismaService.comment.delete({
      where: { id: +commentId },
    });
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> { 
    return this.prismaService.comment.update({
      where: { id: +id },
      data: {
        text: updateCommentDto.text,
        updatedAt: new Date(), 
      },
    });
  }
}