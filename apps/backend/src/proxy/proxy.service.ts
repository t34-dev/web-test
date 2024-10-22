import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProxyDto } from './proxy.dto';
import { Provider } from '@prisma/client';

@Injectable()
export class ProxyService {
  public constructor(private readonly prismaService: PrismaService) {}

  async create(args: { provider: Provider; createProxyDto: CreateProxyDto }) {
    const { createProxyDto, provider } = args;
    await this.prismaService.proxy.upsert({
      create: {
        providerId: provider.id,
        providerProxyId: createProxyDto.providerProxyId,
        providerProxyName: createProxyDto.providerProxyName,
        url: createProxyDto.url,
      },
      where: {
        providerProxyId: createProxyDto.providerProxyId,
      },
      update: {
        providerProxyName: createProxyDto.providerProxyName,
        url: createProxyDto.url,
      },
    });
  }

  async list() {
    return await this.prismaService.proxy.findMany({
      where: {
        deletedAt: null,
      },
    });
  }
}
