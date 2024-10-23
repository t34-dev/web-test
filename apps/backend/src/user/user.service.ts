import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  private async create(args: { clerkUserId: string }): Promise<User> {
    const { clerkUserId } = args;
    return await this.prismaService.user.create({
      data: {
        clerkUserId,
      },
    });
  }

  public async get(args: { id: string }): Promise<User>;
  public async get(args: { clerkUserId: string }): Promise<User>;
  public async get(args: { id?: string; clerkUserId?: string }): Promise<User> {
    const { id, clerkUserId } = args;

    let filter: { id: string } | { clerkUserId: string };
    if (id !== undefined) {
      filter = { id };
    } else if (clerkUserId !== undefined) {
      filter = { clerkUserId };
    } else {
      throw new Error('Invalid arguments');
    }

    let user = await this.prismaService.user.findUnique({
      where: filter,
    });

    if (user === null) {
      if (clerkUserId !== undefined) {
        user = await this.create({ clerkUserId });
      } else {
        throw new NotFoundException();
      }
    }

    return user;
  }

  public async update(args: {
    user: User;
    updateUserDto: UpdateUserDto;
  }): Promise<User> {
    const { user, updateUserDto } = args;

    return await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        isProvider: updateUserDto.isProvider,
      },
    });
  }
}
