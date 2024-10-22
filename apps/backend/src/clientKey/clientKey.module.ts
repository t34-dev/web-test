import { Module } from '@nestjs/common';
import { ClientKeyController } from './clientKey.controller';
import { ClientKeyService } from './clientKey.service';

@Module({
  controllers: [ClientKeyController],
  providers: [ClientKeyService],
  exports: [ClientKeyService],
})
export class ClientKeyModule {}
