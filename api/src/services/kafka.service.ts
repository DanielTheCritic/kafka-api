import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService {
    getTopics():string[] {
        return [ "topic1", "topic2" ];
    }
}