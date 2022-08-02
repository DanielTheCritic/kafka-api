import { Test, TestingModule } from '@nestjs/testing';
import { KafkaIntegrationService } from '../kafka-integration/kafka-integration-service';
import { ProducersService } from './producers.service';

const mockKafkaIntegrationService = () => ({
  createProducer: jest.fn(),
});

describe('ProducersService', () => {
  let service: ProducersService;
  let kafkaIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducersService,
        {
          provide: KafkaIntegrationService,
          useFactory: mockKafkaIntegrationService,
        },
      ],
    }).compile();

    kafkaIntegrationService = module.get<KafkaIntegrationService>(
      KafkaIntegrationService,
    );
    service = module.get<ProducersService>(ProducersService);
  });

  it('should be defined', () => {
    console.log(service);
    expect(service).toBeDefined();
  });
});
