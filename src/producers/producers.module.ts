import { Module } from '@nestjs/common';
import { KafkaIntegrationModule } from 'src/kafka-integration/kafka-integration.module';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';

@Module({
  imports: [KafkaIntegrationModule],
  controllers: [ProducersController],
  providers: [ProducersService],
})
export class ProducersModule {}
