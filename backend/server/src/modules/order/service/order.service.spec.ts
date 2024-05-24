import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';

describe('AppController', () => {
  let service: OrderService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [OrderService],
    }).compile();

    service = app.get(OrderService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(service.getStatistic('email')).toBe('Hello World!');
    });
  });
});
