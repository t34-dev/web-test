import { Injectable } from '@nestjs/common';
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

  public async get(clerkId: string): Promise<User> {
    let user = await this.prismaService.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!user) {
      user = await this.create(clerkId);
    }

    return user;
  }
}
