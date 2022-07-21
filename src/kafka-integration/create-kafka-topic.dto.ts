export class CreateKafkaTopicDto {
  name: string;

  partitions: number;

  replicas: number;
}