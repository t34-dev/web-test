import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Web3Service } from '../web3/web3.service';
import { MessageVersion, Wallet } from '@prisma/client';
import { Address, Hex } from 'viem';

@Injectable()
export class WalletService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly web3Service: Web3Service,
  ) {}

  public async getTypedDataForSigning(userId: string) {
    const wallet = await this.getNewWallet(userId);

    const typedDataForSigning = this.web3Service.getTypedDataForSigning(
      wallet.createdAt.getTime() * 1000,
    );

    return { typedDataForSigning, wallet };
  }

  public async updateSignature(args: {
    walletId: string;
    address: Address;
    signature: Hex;
  }): Promise<Wallet> {
    const { walletId, signature, address } = args;

    const wallet = await this.prismaService.wallet.findUnique({
      where: {
        id: walletId,
      },
    });

    if (!wallet) {
      throw new Error();
    }

    const isVerifySignature =
      await this.web3Service.verifyAndRecoverTypedDataAddress({
        timestamp: wallet.createdAt.getTime() * 1000,
        address,
        signature,
      });

    if (!isVerifySignature) {
      throw new Error();
    }

    const walletForOtherUser = await this.prismaService.wallet.findFirst({
      where: {
        address,
      },
    });

    if (walletForOtherUser) {
      await this.deleteWallet(walletId);
    }

    return await this.prismaService.wallet.update({
      where: {
        id: walletId,
      },
      data: {
        signature,
        address,
      },
    });
  }

  public async getWallets(userId: string): Promise<Wallet[]> {
    return await this.prismaService.wallet.findMany({
      where: {
        userId,
        NOT: {
          deletedAt: null,
        },
      },
    });
  }

  public async deleteWallet(walletId: string): Promise<Wallet> {
    return await this.prismaService.wallet.update({
      where: {
        id: walletId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  private async getNewWallet(userId: string): Promise<Wallet> {
    const wallets = await this.prismaService.wallet.findMany({
      where: {
        userId,
        NOT: {
          deletedAt: null,
        },
      },
    });

    if (wallets.length > 20) {
      // TODO: add softDelete
      throw new Error();
    }

    const walletsWithoutAddress = wallets.filter(
      wallet => wallet.address !== null,
    );

    return walletsWithoutAddress.length === 0
      ? await this.prismaService.wallet.create({
          data: {
            messageVersion: MessageVersion.v1,
            userId,
          },
        })
      : walletsWithoutAddress[0]!;
  }
}
