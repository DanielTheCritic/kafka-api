import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { KafkaService } from './services/kafka.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, KafkaService],
})
export class AppModule {}
