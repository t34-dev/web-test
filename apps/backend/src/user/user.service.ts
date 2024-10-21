import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  private async create(clerkId: string) {
    return await this.prismaService.user.create({
      data: {
        clerkId,
      },
    });
  }

  public async get(clerkId: string) {
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
