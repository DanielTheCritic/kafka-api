import { Controller, Get } from '@nestjs/common';
import { KafkaService } from '../services/kafka.service';

@Controller()
export class TopicController {
    constructor(private readonly kafkaService: KafkaService) {}

    @Get()
    getTopics(): string[] {
        return this.kafkaService.getTopics();
    }
}