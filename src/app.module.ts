import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaIntegrationModule } from './kafka-integration/kafka-integration.module';
import { ProducersModule } from './producers/producers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    KafkaIntegrationModule,
    ProducersModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
