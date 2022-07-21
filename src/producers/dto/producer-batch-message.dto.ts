import { ProducerBatchMessageValue } from "./producer-batch-message-value.dto";

export class ProducerBatchMessage {
    topic: string;

    messages: ProducerBatchMessageValue[];
}