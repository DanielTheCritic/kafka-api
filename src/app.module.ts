import { Module } from '@nestjs/common';
import { TopicsModule } from './topics/topics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Topic } from './topics/topic.entity';
import { KafkaIntegrationModule } from './kafka-integration/kafka-integration.module';
import { ProducersModule } from './producers/producers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TopicsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('MONGODB_URL'),
        synchronize: true,
        useUnifiedTopology: true,
        entities: [Topic],
      }),
    }),
    KafkaIntegrationModule,
    ProducersModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
