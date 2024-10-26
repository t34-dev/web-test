import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Config } from './config/config';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly defaultUser = {
    id: '6719e5c5b27e40d28c37f6f2',
    clerkUserId: 'user_2nxrtG9I7RS7BWlIwefvSKrzPC0',
  };
  private readonly defaultProviderKey = 'ea4f75e2-6e62-40b4-af0f-833090b6a2a9';

  public constructor(
    private readonly prisma: PrismaService,
    private readonly config: Config,
  ) {}

  public async onApplicationBootstrap() {
    if (this.config.WITH_SEED === false) {
      return;
    }

    await this.prisma.user.upsert({
      create: this.defaultUser,
      where: { id: this.defaultUser.id },
      update: {},
    });

    await this.prisma.providerKey.upsert({
      create: {
        key: this.defaultProviderKey,
        userId: this.defaultUser.id,
        deletedAt: null,
      },
      where: { key: this.defaultProviderKey },
      update: {
        userId: this.defaultUser.id,
        deletedAt: null,
      },
    });
  }
}
