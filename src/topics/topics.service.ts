import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Topic } from './topic.entity';
import { v4 as UUID } from 'uuid';
import { KafkaIntegrationService } from 'src/kafka-integration/kafka-integration-service';
import { GetKafkaTopicDto } from 'src/kafka-integration/get-kafka-topic.dto';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepository: Repository<Topic>,
    private kafkaIntegrationService: KafkaIntegrationService
  ) {}

  async getTopics(): Promise<GetKafkaTopicDto[]> {

   return await this.kafkaIntegrationService.getTopics();
  }

  async createTopic(createTopicDto: CreateTopicDto): Promise<Topic> {
  
    const topic = this.topicsRepository.create({
      id: UUID(),
      name: createTopicDto.name,
      partitions: createTopicDto.partitions,
      replicas: createTopicDto.replicas,
    });

   /* const topicResult = await this.topicsRepository.save(topic);

    */

    await this.kafkaIntegrationService.getOrCreateTopic({
      name: createTopicDto.name,
      partitions: createTopicDto.partitions,
      replicas: createTopicDto.replicas,
    });
    return topic;
  }
}
