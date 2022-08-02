import { Test, TestingModule } from '@nestjs/testing';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';

const mockProducersService = () => ({
  publish: jest.fn(),
  publishBatch: jest.fn(),
});

describe('ProducersController', () => {
  let controller: ProducersController;
  let producersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducersController],
      providers: [
        {
          provide: ProducersService,
          useFactory: mockProducersService,
        },
      ],
    }).compile();

    controller = module.get<ProducersController>(ProducersController);
    producersService = module.get<ProducersService>(ProducersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('publish', () => {
    it('calls ProducersService.publish and returns the result.', async () => {
      expect(producersService.publish).not.toHaveBeenCalled();

      producersService.publish.mockResolvedValue('someValue');
      const result = await producersService.publish({
        topic: 'test-topic',
        key: 'test-key',
        value: 'test-value',
      });

      expect(producersService.publish).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });
});
