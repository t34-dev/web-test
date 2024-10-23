import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProxyDto, ProxyDto } from './proxy.dto';
import { ProxyService } from './proxy.service';
import { ProviderKeyService } from '../providerKey';
import { UserService } from '../user/user.service';
import { type Request } from 'express';
import { ApiBody, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('proxy')
export class ProxyController {
  public constructor(
    private readonly proxyService: ProxyService,
    private readonly providerKeyService: ProviderKeyService,
    private readonly userService: UserService,
  ) {}

  @Put()
  @ApiBody({ type: CreateProxyDto })
  @ApiResponse({ type: ProxyDto })
  @ApiUnauthorizedResponse()
  async create(@Req() req: Request, @Body() createProxyDto: CreateProxyDto) {
    const providerKey = await this.getProviderApiKey(req);
    const user = await this.userService.get({ id: providerKey.userId });
    await this.proxyService.create({ user, createProxyDto });
  }

  @Get()
  @ApiResponse({ type: [ProxyDto] })
  async list() {
    const proxies = await this.proxyService.list();
    return proxies.map(v => ProxyDto.create(v));
  }

  private async getProviderApiKey(req: Request) {
    const key = req.get('X-Therpc-Provider-Key');
    if (key === undefined) {
      throw new UnauthorizedException();
    }
    const providerKey = await this.providerKeyService.get({ key });
    if (providerKey === null) {
      throw new UnauthorizedException();
    }
    return providerKey;
  }
}
