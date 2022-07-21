import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaIntegrationService } from './kafka-integration-service';

@Module({
  imports: [ConfigModule],
  providers: [KafkaIntegrationService],
  exports: [KafkaIntegrationService],
})
export class KafkaIntegrationModule {}
