import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClientKey, User } from '@prisma/client';

@Injectable()
export class ClientKeyService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async create(args: { user: User }): Promise<ClientKey> {
    const { user } = args;

    const clientKeys = await this.list({ user });
    if (clientKeys.length >= 5) {
      throw new Error('Client key already exists');
    }

    return await this.prismaService.clientKey.create({
      data: {
        userId: user.id,
        key: crypto.randomUUID(),
        deletedAt: null,
      },
    });
  }

  public async list(args: Record<string, never>): Promise<ClientKey[]>;
  public async list(args: { user: User }): Promise<ClientKey[]>;
  public async list(args: { user?: User }): Promise<ClientKey[]> {
    const { user } = args;
    return await this.prismaService.clientKey.findMany({
      where: {
        ...(user?.id && { userId: user?.id }),
        deletedAt: null,
      },
    });
  }

  public async get(id: string): Promise<ClientKey> {
    const clientKey = await this.prismaService.clientKey.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
    if (clientKey === null) {
      throw new NotFoundException(`Client key with ID ${id} not found`);
    }
    return clientKey;
  }

  public async delete(id: string) {
    await this.prismaService.clientKey.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id,
      },
    });
  }
}
