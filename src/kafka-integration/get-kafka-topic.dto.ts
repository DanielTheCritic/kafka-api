import { GetKafkaTopicPartitionDto } from "./get-kafka-topic-partition.dto";

export class GetKafkaTopicDto {
  name: string;

  partitions: GetKafkaTopicPartitionDto[];
}
