import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Post,
} from '@nestjs/common';
import { ClientKeyService } from './clientKey.service';
import { UserService } from '../user/user.service';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthUserId, type ClerkUserId } from '../auth/clerk';
import { ClientKeyDto } from './clientKey.dto';

@Controller('clientKey')
@ApiTags('clientKey')
@ApiBearerAuth()
export class ClientKeyController {
  constructor(
    private readonly clientKeyService: ClientKeyService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiResponse({ type: ClientKeyDto })
  @ApiUnauthorizedResponse()
  public async create(@AuthUserId() clerkUserId: ClerkUserId) {
    const user = await this.userService.get({ clerkUserId });
    const clientKey = await this.clientKeyService.create({ user });
    return ClientKeyDto.create(clientKey);
  }

  @Get()
  @ApiResponse({ type: ClientKeyDto })
  @ApiUnauthorizedResponse()
  public async list(@AuthUserId() clerkUserId: ClerkUserId) {
    const user = await this.userService.get({ clerkUserId });
    const clientKey = await this.clientKeyService.list({ user });
    return ClientKeyDto.create(clientKey);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  public async delete(@AuthUserId() clerkUserId: ClerkUserId) {
    const id = 123n;
    const user = await this.userService.get({ clerkUserId });
    const userId = user.id;
    const clientKey = await this.clientKeyService.get(id);
    if (clientKey.userId !== userId) {
      throw new ForbiddenException();
    }
    await this.clientKeyService.delete(id);
  }
}
