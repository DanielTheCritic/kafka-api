import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateKafkaTopicDto } from './create-kafka-topic.dto';
import { Admin, Consumer, Kafka, Producer } from 'kafkajs';
import { GetKafkaTopicDto } from './get-kafka-topic.dto';
import { GetKafkaTopicPartitionDto } from './get-kafka-topic-partition.dto';

@Injectable()
export class KafkaIntegrationService {
  constructor(private configService: ConfigService) {}

  async getOrCreateTopic(
    createKafkaTopicDto: CreateKafkaTopicDto,
  ): Promise<void> {
    const admin = await this.openAdminConnection();

    await admin.createTopics({
      validateOnly: false,
      waitForLeaders: false,
      timeout: 30,
      topics: [
        {
          topic: createKafkaTopicDto.name,
          numPartitions: createKafkaTopicDto.partitions,
          replicationFactor: createKafkaTopicDto.replicas,
        },
      ],
    });

    await admin.disconnect();
  }

  async getTopics(): Promise<GetKafkaTopicDto[]> {
    const admin = await this.openAdminConnection();

    const topicResult = await admin.fetchTopicMetadata();

    const results: GetKafkaTopicDto[] = await Promise.all(
      topicResult.topics.map(async (item): Promise<GetKafkaTopicDto> => {
        const topicOffsetResult = await admin.fetchTopicOffsets(item.name);

        const val = new GetKafkaTopicDto();
        val.name = item.name;
        val.partitions = item.partitions.map((partition) => {
          const partitionOffsetInfo = topicOffsetResult.find(
            (v) => v.partition == partition.partitionId,
          );
          const partitionResult = new GetKafkaTopicPartitionDto();
          partitionResult.id = partition.partitionId;
          partitionResult.offset = partitionOffsetInfo.offset;
          return partitionResult;
        });
        return val;
      }),
    );

    return results;
  }

  private createConnection(): Kafka {
    return new Kafka({
      clientId: this.configService.get('KAFKA_CLIENTID'),
      brokers: this.configService.get('KAFKA_BROKERS').split(','),
    });
  }

  async createProducer(): Promise<Producer> {
    const connection = this.createConnection();
    const producer = connection.producer({
      allowAutoTopicCreation: false,
      transactionTimeout: 30000,
    });

    await producer.connect();
    return producer;
  }

  async createConsumer(topicName: string, groupId: string): Promise<Consumer> {
    const connection = this.createConnection();
    const consumer = connection.consumer({
      groupId: groupId,
    });

    await consumer.connect();
    await consumer.subscribe({
      topic: topicName,
    });
    return consumer;
  }

  async openAdminConnection(): Promise<Admin> {
    const connection = this.createConnection();
    const admin = connection.admin();

    await admin.connect();
    return admin;
  }
}
