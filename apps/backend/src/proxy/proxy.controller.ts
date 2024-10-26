import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProxyDto, ProxyDto } from './proxy.dto';
import { ProxyService } from './proxy.service';
import { ProviderKeyService } from '../providerKey';
import { UserService } from '../user/user.service';
import {
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProviderKey, UseProviderKeyGuard } from '../auth/providerKey';
import { UseClerkGuard } from '../auth/clerk';

@Controller('proxies')
@ApiTags('proxies')
@ApiUnauthorizedResponse()
export class ProxyController {
  public constructor(
    private readonly proxyService: ProxyService,
    private readonly providerKeyService: ProviderKeyService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseProviderKeyGuard()
  @ApiBody({ type: CreateProxyDto })
  @ApiResponse({ type: ProxyDto })
  @ApiUnauthorizedResponse()
  async create(
    @ProviderKey() providerKeyHeader: string,
    @Body() createProxyDto: CreateProxyDto,
  ) {
    const providerKey = await this.providerKeyService.get({
      key: providerKeyHeader,
    });
    if (providerKey === null) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.get({ id: providerKey.userId });
    const proxy = await this.proxyService.create({ user, createProxyDto });
    return ProxyDto.create(proxy);
  }

  @Get()
  @UseClerkGuard()
  @ApiResponse({ type: [ProxyDto] })
  async list() {
    const proxies = await this.proxyService.list();
    return proxies.map(v => ProxyDto.create(v));
  }
}
