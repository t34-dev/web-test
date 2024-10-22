import { Injectable } from '@nestjs/common';
import { MessageVersion } from '@prisma/client';
import { Address, Hex, recoverTypedDataAddress } from 'viem';

@Injectable()
export class Web3Service {
  private readonly domain = {
    name: 'User login',
    version: '1',
  } as const;

  private readonly types = {
    Login: [
      { name: 'messageVersion', type: 'string' },
      { name: 'timestamp', type: 'uint256' },
    ],
  } as const;

  public getTypedDataForSigning(timestamp: number) {
    const message = {
      messageVersion: MessageVersion.v1,
      timestamp: timestamp,
    } as const;

    return {
      domain: this.domain,
      types: this.types,
      primaryType: 'Login',
      message,
    };
  }

  public async verifyAndRecoverTypedDataAddress(args: {
    timestamp: number;
    address: Address;
    signature: Hex;
  }): Promise<boolean> {
    const { timestamp, signature, address: userAddress } = args;

    const message = {
      messageVersion: MessageVersion.v1,
      timestamp: BigInt(timestamp),
    } as const;

    const address = await recoverTypedDataAddress({
      domain: this.domain,
      types: this.types,
      primaryType: 'Login',
      message,
      signature,
    });

    if (address !== userAddress) {
      return false;
    }

    return true;
  }

  // TODO: add function
  public async getTransferTxData() {}
}
