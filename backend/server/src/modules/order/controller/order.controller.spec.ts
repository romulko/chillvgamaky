import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../service/order.service';

describe('AppController', () => {
  let appController: OrderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    appController = app.get<OrderController>(OrderController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.get('asd')).toBe('Hello World!');
    });
  });
});
