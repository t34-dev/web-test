import { Module } from '@nestjs/common';
import { ProviderKeyService } from './providerKey.service';
import { ProviderKeyController } from './providerKey.controller';

@Module({
  controllers: [ProviderKeyController],
  providers: [ProviderKeyService],
  exports: [ProviderKeyService],
})
export class ProviderKeyModule {}
