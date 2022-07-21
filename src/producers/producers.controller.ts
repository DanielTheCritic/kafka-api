import { Body, Controller, Post } from '@nestjs/common';
import { ProducerBatchMessageResult } from './dto/producer-batch-message-result.dto';
import { ProducerBatchMessage } from './dto/producer-batch-message.dto';
import { ProducerMessageResult } from './dto/producer-message-result.dto';
import { ProducerMessage } from './dto/producer-message.dto';
import { ProducersService } from './producers.service';

@Controller('producers')
export class ProducersController {
  constructor(private producersService: ProducersService) {}

  @Post()
  publish(
    @Body() producerMessage: ProducerMessage,
  ): Promise<ProducerMessageResult> {
    return this.producersService.publish(producerMessage);
  }

  @Post('/batch')
  publishBatch(
    @Body() producerBatchMessage: ProducerBatchMessage,
  ): Promise<ProducerBatchMessageResult> {
    return this.producersService.publishBatch(producerBatchMessage);
  }
}
