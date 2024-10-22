import { Body, Controller, Get, Put } from '@nestjs/common';
import { CreateProxyDto, ProxyDto } from './proxy.dto';
import { ProxyService } from './proxy.service';
import { Provider } from '@prisma/client';

@Controller('proxy')
export class ProxyController {
  public constructor(private readonly proxyService: ProxyService) {}

  @Put()
  async create(@Body() createProxyDto: CreateProxyDto) {
    const provider: Provider = null;
    await this.proxyService.create({ provider, createProxyDto });
  }

  @Get()
  async list() {
    const proxies = await this.proxyService.list();
    return proxies.map(v => ProxyDto.create(v));
  }
}
