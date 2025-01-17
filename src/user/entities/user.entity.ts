import { Article, Comment, Like, Participation, Role, Status, Tournament, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements Partial<User>{

  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'johndoe@example.com'
  })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password123'
  })
  password: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John'
  })
  firstname: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe'
  })
  lastname: string;

  @ApiProperty({
    description: 'Biography or description of the user (optional)',
    example: 'I am a passionate padel player'
  })
  bio?: string | null;

  @ApiProperty({
    description: 'Phone number of the user (optional)',
    example: '0123456789'
  })
  phone?: string | null;

  @ApiProperty({
    description: 'License number of the user (optional)',
    example: 'ABC123'
  })
  licence?: string | null;

  @ApiProperty({
    description: 'URL of the user\'s avatar image (optional)',
    example: 'https://example.com/avatar.jpg'
  })
  avatar?: string | null;

  @ApiProperty({
    description: 'Role of the user',
    example: 'ADMIN'
  })
  role: Role;

  @ApiProperty({
    description: 'Status of the user',
    example: 'COMPLETE'
  })
  status: Status;

  @ApiProperty({
    description: 'Date and time when the user was created',
    example: '2023-06-01T12:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the user was last updated',
    example: '2023-06-15T10:30:00.000Z'
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Articles created by the user',
    type: Array
  })
  articles?: Article[]; 

  @ApiProperty({
    description: 'Comments made by the user',
    type: Array
  })
  comments?: Comment[]; 

  @ApiProperty({
    description: 'Likes made by the user',
    type: Array
  })
  likes?: Like[]; 

  @ApiProperty({
    description: 'Participations of the user in tournaments',
    type: Array
  })
  participations?: Participation[]; 

  @ApiProperty({
    description: 'Tournaments created by the user',
    type: Array
  })
  createdTournaments?: Tournament[]; 

  @ApiProperty({
    description: 'Partners of the user in tournaments',
    type: Array
  })
  partners?: Participation[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}