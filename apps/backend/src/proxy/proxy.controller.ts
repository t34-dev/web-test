import {
  Body,
  Controller,
  Get,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProxyDto, ProxyDto } from './proxy.dto';
import { ProxyService } from './proxy.service';
import { Provider } from '@prisma/client';
import { ProviderKeyService } from '../providerKey';

@Controller('proxy')
export class ProxyController {
  public constructor(
    private readonly proxyService: ProxyService,
    private readonly providerKeyService: ProviderKeyService,
  ) {}

  @Put()
  async create(@Body() createProxyDto: CreateProxyDto) {
    const apikey = '123';
    const providerKey = await this.providerKeyService.get(apikey);
    if (providerKey === null) {
      throw new UnauthorizedException();
    }
    const provider: Provider = null;
    await this.proxyService.create({ provider, createProxyDto });
  }

  @Get()
  async list() {
    const proxies = await this.proxyService.list();
    return proxies.map(v => ProxyDto.create(v));
  }
}
