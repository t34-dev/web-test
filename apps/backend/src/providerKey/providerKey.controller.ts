import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ProviderKeyService } from './providerKey.service';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthUserId, type ClerkUserId } from '../auth/clerk';
import { ProviderKeyDto, DeleteProviderKeyParamsDto } from './providerKey.dto';

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

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  async delete(
    @AuthUserId() clerkUserId: ClerkUserId,
    @Param() deleteProviderKeyParamsDto: DeleteProviderKeyParamsDto,
  ) {
    const user = await this.userService.get({ clerkUserId });
    const providerKey = await this.providerKeyService.get({
      id: deleteProviderKeyParamsDto.id,
    });
    if (providerKey === null) {
      throw new NotFoundException();
    }

    if (user.id !== providerKey.userId) {
      throw new ForbiddenException();
    }

    await this.providerKeyService.delete({ providerKey });
  }
}
