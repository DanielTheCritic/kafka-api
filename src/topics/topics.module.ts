import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaIntegrationModule } from 'src/kafka-integration/kafka-integration.module';
import { Topic } from './topic.entity';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic]),
    KafkaIntegrationModule,
    ConfigModule,
  ],
  controllers: [TopicsController],
  providers: [TopicsService],
})
export class TopicsModule {}
