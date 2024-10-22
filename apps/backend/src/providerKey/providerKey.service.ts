import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Provider } from '@prisma/client';

@Injectable()
export class ProviderKeyService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(args: { provider: Provider; user: User }) {
    const { provider, user } = args;

    const providerKeys = await this.list({ user });
    const maxKeys = 5;
    if (providerKeys.length >= maxKeys) {
      throw new Error(`You can only have ${maxKeys} keys`);
    }

    return await this.prismaService.providerKey.create({
      data: {
        providerId: provider.id,
        userId: user.id,
        key: crypto.randomUUID(),
      },
    });
  }

  async get(providerKey: string) {
    return await this.prismaService.providerKey.findUnique({
      where: {
        key: providerKey,
      },
    });
  }

  async list(args: { user: User }) {
    const { user } = args;
    return await this.prismaService.providerKey.findMany({
      where: {
        userId: user.id,
      },
    });
  }
}
