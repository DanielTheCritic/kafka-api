import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { KafkaIntegrationService } from 'src/kafka-integration/kafka-integration-service';
import { ProducerBatchMessageResult } from './dto/producer-batch-message-result.dto';
import { ProducerBatchMessage } from './dto/producer-batch-message.dto';
import { ProducerMessageResult } from './dto/producer-message-result.dto';
import { ProducerMessage } from './dto/producer-message.dto';
import { ProducerBatchMessageResultValue } from './dto/producer-batch-message-result-value.dto';
import { KafkaJSNonRetriableError } from 'kafkajs';

@Injectable()
export class ProducersService {
  constructor(private kafkaIntegrationService: KafkaIntegrationService) {}

  async publish(
    producerMessage: ProducerMessage,
  ): Promise<ProducerMessageResult> {
    try {
      const producer = await this.kafkaIntegrationService.createProducer();
      const result = await producer.send({
        topic: producerMessage.topic,
        messages: [{ key: producerMessage.key, value: producerMessage.value }],
      });

      return {
        offset: result[0].baseOffset,
        partition: result[0].partition,
      };
    } catch (error) {
      this.processKafkaError(error);
    }
  }

  async publishBatch(
    produceBatchMessage: ProducerBatchMessage,
  ): Promise<ProducerBatchMessageResult> {
    try {
      const producer = await this.kafkaIntegrationService.createProducer();
      const result = await producer.send({
        topic: produceBatchMessage.topic,
        messages: produceBatchMessage.messages.map((message) => {
          return { key: message.key, value: message.value };
        }),
      });

      const producerResult = new ProducerBatchMessageResult();
      producerResult.results = result.map((item) => {
        const val = new ProducerBatchMessageResultValue();
        val.offset = item.baseOffset;
        val.partition = item.partition;
        return val;
      });
      
      return producerResult;
    } catch (error) {
      this.processKafkaError(error);
    }
  }

  private processKafkaError(error) {
    const kafkaJSNonRetriableError = error as KafkaJSNonRetriableError;
    if (kafkaJSNonRetriableError) {
      throw new BadRequestException(error.message);
    }

    throw new InternalServerErrorException(error.message);
  }
}
