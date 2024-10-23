import { Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { ProviderKeyService } from './providerKey.service';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthUserId, type ClerkUserId } from '../auth/clerk';
import { ProviderKeyDto } from './providerKey.dto';

@Controller('providerKey')
@ApiTags('providerKey')
@ApiBearerAuth()
export class ProviderKeyController {
  constructor(
    private readonly providerKeyService: ProviderKeyService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiResponse({ type: ProviderKeyDto })
  @ApiUnauthorizedResponse()
  async create(@AuthUserId() clerkUserId: ClerkUserId) {
    const user = await this.userService.get({ clerkUserId });
    const providerKey = await this.providerKeyService.create({ user });
    return ProviderKeyDto.create(providerKey);
  }

  @Get()
  @ApiResponse({ type: [ProviderKeyDto] })
  @ApiUnauthorizedResponse()
  async list(@AuthUserId() clerkUserId: ClerkUserId) {
    const user = await this.userService.get({ clerkUserId });
    const providerKeys = await this.providerKeyService.list({ user });
    return providerKeys.map(v => ProviderKeyDto.create(v));
  }
}
