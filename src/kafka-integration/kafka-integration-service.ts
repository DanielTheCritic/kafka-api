import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Admin, Consumer, Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaIntegrationService {
  constructor(private configService: ConfigService) {}

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
