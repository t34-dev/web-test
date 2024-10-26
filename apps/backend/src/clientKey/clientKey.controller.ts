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
import {
  ClerkGuard,
  ClerkUserId,
  ClerkUserIdNullable,
  type ClerkUserIdNullableType,
  UseClerkGuard,
  type ClerkUserIdType,
} from '../auth/clerk';
import { ClientKeyDto, DeleteClientKeyParamsDto } from './clientKey.dto';
import { UseOneOfGuard } from '../auth/oneOf';
import {
  InternalKey,
  InternalKeyGuard,
  InternalKeyType,
} from '../auth/internalKey';

@Controller('clientKeys')
@ApiTags('clientKeys')
@ApiBearerAuth()
export class ClientKeyController {
  constructor(
    private readonly clientKeyService: ClientKeyService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseClerkGuard()
  @ApiResponse({ type: ClientKeyDto })
  @ApiUnauthorizedResponse()
  public async create(@ClerkUserId() clerkUserId: ClerkUserIdType) {
    const user = await this.userService.get({ clerkUserId });
    const clientKey = await this.clientKeyService.create({ user });
    return ClientKeyDto.create(clientKey);
  }

  @Get()
  @UseOneOfGuard(ClerkGuard, InternalKeyGuard)
  @ApiResponse({ type: ClientKeyDto })
  @ApiUnauthorizedResponse()
  public async list(
    @ClerkUserIdNullable() clerkUserId: ClerkUserIdNullableType,
    @InternalKey() internalKey: InternalKeyType | null,
  ) {
    let clientKeys;
    switch (true) {
      case clerkUserId !== null:
        const user = await this.userService.get({ clerkUserId });
        clientKeys = await this.clientKeyService.list({ user });
        break;
      case internalKey !== null:
        clientKeys = await this.clientKeyService.list({});
        break;
      default:
        throw new Error();
    }

    return clientKeys.map(v => ClientKeyDto.create(v));
  }

  @Delete(':id')
  @UseClerkGuard()
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
