import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProviderKey, User } from '@prisma/client';

@Injectable()
export class ProviderKeyService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(args: { user: User }) {
    const { user } = args;

    const providerKeys = await this.list({ user });
    const maxKeys = 5;
    if (providerKeys.length >= maxKeys) {
      throw new BadRequestException(`You can only have ${maxKeys} keys`);
    }

    return await this.prismaService.providerKey.create({
      data: {
        userId: user.id,
        key: crypto.randomUUID(),
      },
    });
  }

  async get(args: { key: string }): Promise<ProviderKey | null>;
  async get(args: { id: string }): Promise<ProviderKey | null>;
  async get(args: { id?: string; key?: string }): Promise<ProviderKey | null> {
    const { id, key } = args;

    let filter: { id: string } | { key: string };
    if (id !== undefined) {
      filter = { id };
    } else if (key !== undefined) {
      filter = { key };
    } else {
      throw new Error('id or key must be provided');
    }

    return await this.prismaService.providerKey.findUnique({
      where: filter,
    });
  }

  async list(args: { user: User }) {
    const { user } = args;
    return await this.prismaService.providerKey.findMany({
      where: {
        userId: user.id,
        deletedAt: null,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async delete(args: { providerKey: ProviderKey }) {
    const { providerKey } = args;
    return await this.prismaService.providerKey.update({
      where: {
        id: providerKey.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
