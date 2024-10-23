import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Post,
} from '@nestjs/common';
import { ClientKeyService } from './clientKey.service';
import { UserService } from '../user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthUserId, type ClerkUserId } from '../auth/clerk';

@Controller('clientKey')
@ApiTags('clientKey')
export class ClientKeyController {
  constructor(
    private readonly clientKeyService: ClientKeyService,
    private readonly userService: UserService,
  ) {}

  @Post()
  public async create(@AuthUserId() clerkUserId: ClerkUserId) {
    const user = await this.userService.get({ clerkUserId });
    return await this.clientKeyService.create({ user });
  }

  @Get()
  public async list(@AuthUserId() clerkUserId: ClerkUserId) {
    const user = await this.userService.get({ clerkUserId });
    return await this.clientKeyService.list({ user });
  }

  @Delete(':id')
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
