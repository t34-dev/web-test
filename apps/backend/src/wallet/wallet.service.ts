import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WalletMessageVersion, User, Wallet } from '@prisma/client';
import {
  Hex,
  isHex,
  recoverTypedDataAddress,
  TypedData,
  TypedDataDomain,
  validateTypedData,
} from 'viem';
import { randomBytes } from 'crypto';

@Injectable()
export class WalletService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async create(args: { user: User }): Promise<Wallet> {
    const { user } = args;

    await this.prismaService.wallet.updateMany({
      data: { deletedAt: new Date() },
      where: { userId: user.id, deletedAt: null },
    });

    return await this.prismaService.wallet.create({
      data: {
        messageVersion: WalletMessageVersion.v1,
        userId: user.id,
        salt: randomBytes(16).toString('hex'),
      },
    });
  }

  public async update(args: {
    wallet: Wallet;
    signature: Hex;
  }): Promise<Wallet> {
    const { signature, wallet } = args;

    const msg = this.getTypedMessage({ wallet });

    let address;
    try {
      address = await recoverTypedDataAddress({ ...msg, signature });
    } catch (e) {
      throw new BadRequestException('Invalid signature', { cause: e });
    }

    await this.prismaService.wallet.updateMany({
      data: { deletedAt: new Date() },
      where: { address, deletedAt: null },
    });

    await this.prismaService.wallet.update({
      data: { signature, address },
      where: { id: wallet.id },
    });

    return wallet;
  }

  public async get(args: { user: User }): Promise<Wallet | null> {
    const { user } = args;

    const userWallet = await this.prismaService.wallet.findFirst({
      where: {
        userId: user.id,
        deletedAt: null,
      },
    });

    return userWallet ?? null;
  }

  public getTypedMessage(args: { wallet: Wallet }) {
    const { wallet } = args;
    const v1MessgeContent = `Dear user,

To verify that you are the owner of this wallet, we kindly ask you to sign this message. This process helps us ensure the security of your account and confirm that this wallet is genuinely linked to you.

Important:

 • This action is completely free.
 • It does not involve any transaction or transfer of assets.
 • Signing this message does not provide any third party access to your funds.

Please sign the message to complete the verification.

Thank you for your cooperation!
`;

    const salt = `0x${wallet.salt}`;
    if (!isHex(salt)) {
      throw new Error();
    }
    const domain: TypedDataDomain = {
      name: 'Attach wallet to user',
      version: WalletMessageVersion.v1,
      salt,
    } as const;

    const types: TypedData = {
      Login: [
        { name: 'content', type: 'string' },
        { name: 'timestamp', type: 'string' },
      ],
    } as const;

    const msg = {
      domain: domain,
      types: types,
      primaryType: 'Login',
      message: {
        content: v1MessgeContent,
        timestamp: wallet.createdAt.toISOString(),
      },
    } as const;

    try {
      validateTypedData(msg);
    } catch (e) {
      throw new Error('Invalid message', { cause: e });
    }

    return msg;
  }
}
