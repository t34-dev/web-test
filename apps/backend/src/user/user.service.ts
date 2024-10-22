import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  private async create(clerkId: string): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        clerkId,
      },
    });
  }

  public async get(args: { id: string }): Promise<User>;
  public async get(args: { clerkId: string }): Promise<User>;
  public async get(args: { id?: string; clerkId?: string }): Promise<User> {
    const { id, clerkId } = args;

    let filter: { id: string } | { clerkId: string };
    if (id !== undefined) {
      filter = { id };
    } else if (clerkId !== undefined) {
      filter = { clerkId };
    } else {
      throw new Error('Invalid arguments');
    }

    const user = await this.prismaService.user.findUnique({
      where: filter,
    });

    if (user === null) {
      throw new NotFoundException();
    }

    return user;
  }
}
