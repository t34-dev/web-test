import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { WalletService } from './wallet.service';
import { ClerkUserId, type ClerkUserIdType } from '../auth/clerk';
import {
  UpdateWalletBodyDto,
  UpdateWalletParamsDto,
  WalletDto,
} from '@repo/common';
import { isHex } from 'viem';
import { UseClerkGuard } from '../auth/clerk.guard';

@Controller('wallets')
@UseClerkGuard()
@ApiTags('wallets')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
export class WalletController {
  public constructor(
    private readonly userService: UserService,
    private readonly walletService: WalletService,
  ) {}

  @Post()
  @ApiResponse({ type: WalletDto })
  public async replace(@ClerkUserId() clerkUserId: ClerkUserIdType) {
    const user = await this.userService.get({ clerkUserId });
    const wallet = await this.walletService.create({ user });
    const message = this.walletService.getTypedMessage({ wallet });
    return WalletDto.create({ ...wallet, message });
  }

  @Get()
  @ApiResponse({ type: WalletDto })
  public async get(@ClerkUserId() clerkUserId: ClerkUserIdType) {
    const user = await this.userService.get({ clerkUserId });
    const wallet = await this.walletService.get({ user });
    if (wallet === null) {
      return null;
    }
    const message = this.walletService.getTypedMessage({ wallet });
    return WalletDto.create({ ...wallet, message });
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ type: WalletDto })
  @ApiNotFoundResponse()
  public async update(
    @ClerkUserId() clerkUserId: ClerkUserIdType,
    @Body() updateWalletBodyDto: UpdateWalletBodyDto,
    @Param() updateWalletParamsDto: UpdateWalletParamsDto,
  ) {
    const user = await this.userService.get({ clerkUserId });
    const wallet = await this.walletService.get({ user });
    if (wallet === null) {
      throw new NotFoundException();
    }
    if (wallet.id !== updateWalletParamsDto.id) {
      throw new NotFoundException();
    }

    const signature = updateWalletBodyDto.signature;
    if (isHex(signature) === false) {
      throw new BadRequestException('Invalid signature');
    }

    const updatedWallet = await this.walletService.update({
      wallet,
      signature,
    });
    const message = this.walletService.getTypedMessage({
      wallet: updatedWallet,
    });
    return WalletDto.create({ ...updatedWallet, message });
  }
}
