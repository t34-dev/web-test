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

@Controller('clientKey')
@ApiTags('clientKey')
export class ClientKeyController {
  constructor(
    private readonly clientKeyService: ClientKeyService,
    private readonly userService: UserService,
  ) {}

  @Post()
  public async create() {
    const user = await this.userService.get('clerkId');
    return await this.clientKeyService.create({ user });
  }

  @Get()
  public async list() {
    const user = await this.userService.get('clerkId');
    return await this.clientKeyService.list({ user });
  }

  @Delete()
  public async delete() {
    const id = 123n;
    const userId = 100500n;
    const clientKey = await this.clientKeyService.get(id);
    if (clientKey.userId !== userId) {
      throw new ForbiddenException();
    }
    await this.clientKeyService.delete(id);
  }
}
