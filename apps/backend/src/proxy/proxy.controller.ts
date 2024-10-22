import {
  Body,
  Controller,
  Get,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProxyDto, ProxyDto } from './proxy.dto';
import { ProxyService } from './proxy.service';
import { ProviderKeyService } from '../providerKey';
import { UserService } from '../user/user.service';

@Controller('proxy')
export class ProxyController {
  public constructor(
    private readonly proxyService: ProxyService,
    private readonly providerKeyService: ProviderKeyService,
    private readonly userService: UserService,
  ) {}

  @Put()
  async create(@Body() createProxyDto: CreateProxyDto) {
    const apikey = '123';
    const providerKey = await this.providerKeyService.get(apikey);
    if (providerKey === null) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.get({ id: providerKey.userId });
    await this.proxyService.create({ user, createProxyDto });
  }

  @Get()
  async list() {
    const proxies = await this.proxyService.list();
    return proxies.map(v => ProxyDto.create(v));
  }
}
