import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ClientKeyService } from './clientKey.service';
import { UserService } from '../user/user.service';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ClerkUserId, type ClerkUserIdType } from '../auth/clerk';
import { ClientKeyDto, DeleteClientKeyParamsDto } from './clientKey.dto';

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
  public async create(@ClerkUserId() clerkUserId: ClerkUserIdType) {
    const user = await this.userService.get({ clerkUserId });
    const clientKey = await this.clientKeyService.create({ user });
    return ClientKeyDto.create(clientKey);
  }

  @Get()
  @ApiResponse({ type: ClientKeyDto })
  @ApiUnauthorizedResponse()
  public async list(@ClerkUserId() clerkUserId: ClerkUserIdType) {
    const user = await this.userService.get({ clerkUserId });
    const clientKey = await this.clientKeyService.list({ user });
    return ClientKeyDto.create(clientKey);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  public async delete(
    @ClerkUserId() clerkUserId: ClerkUserIdType,
    @Param() deleteClientKeyParamsDto: DeleteClientKeyParamsDto,
  ) {
    const user = await this.userService.get({ clerkUserId });
    const userId = user.id;
    const id = deleteClientKeyParamsDto.id;
    const clientKey = await this.clientKeyService.get(id);
    if (clientKey.userId !== userId) {
      throw new ForbiddenException();
    }

    await this.clientKeyService.delete(id);
  }
}
