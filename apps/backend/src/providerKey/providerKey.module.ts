import { Module } from '@nestjs/common';
import { ProviderKeyService } from './providerKey.service';

@Module({
  controllers: [],
  providers: [ProviderKeyService],
  exports: [ProviderKeyService],
})
export class ProviderKeyModule {}
