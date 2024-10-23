import { Controller, Get, Post } from '@nestjs/common';
import { ProviderKeyService } from './providerKey.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthUserId, type ClerkUserId } from '../auth/clerk';

@Controller('providerKey')
@ApiBearerAuth()
@ApiTags('providerKey')
export class ProviderKeyController {
  constructor(
    private readonly providerKeyService: ProviderKeyService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiResponse({ type: 'string' })
  async create(@AuthUserId() clerkUserId: ClerkUserId) {
    const user = await this.userService.get({ clerkUserId });
    return await this.providerKeyService.create({ user });
  }

  @Get()
  async list(@AuthUserId() clerkUserId: ClerkUserId) {
    const user = await this.userService.get({ clerkUserId });
    return await this.providerKeyService.list({ user });
  }
}
