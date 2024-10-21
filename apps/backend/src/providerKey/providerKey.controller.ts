import { Controller, Get, Post } from '@nestjs/common';
import { ProviderKeyService } from './providerKey.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User, Provider } from '@prisma/client';

@Controller('providerKey')
@ApiBearerAuth()
@ApiTags('providerKey')
export class ProviderKeyController {
  constructor(private readonly providerKeyService: ProviderKeyService) {}

  @Post()
  @ApiResponse({ type: 'string' })
  async create() {
    const user: User = {
      id: 1n,
      clerkId: 'clerkId',
      providerId: 1n,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const provider: Provider = {
      id: 1n,
      name: 'name',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    return await this.providerKeyService.create({ user, provider });
  }

  @Get()
  async list() {
    const user: User = {
      id: 1n,
      clerkId: 'clerkId',
      providerId: 1n,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await this.providerKeyService.list({ user });
  }
}
