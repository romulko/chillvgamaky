import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { CreateOrderDto, UpdateOrderDto } from '../dto/dto';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('statistic')
  statistic(@Query('email') email: string) {
    return this.orderService.getStatistic(email);
  }

  @Get()
  get(@Query('email') email: string) {
    return this.orderService.getUnpaid(email);
  }

  @Post()
  create(@Body() order: CreateOrderDto) {
    return this.orderService.create(order);
  }

  @Put()
  update(@Body() order: UpdateOrderDto) {
    return this.orderService.update(order);
  }

  @Get('verifyPaymentComplete')
  verifyPaymentComplete(@Query('orderId') orderId: number) {
    return this.orderService.verifyPaymentComplete(orderId);
  }

  @Post('monobankCallback')
  monobankCallbackHandler(@Body() data: any) {
    return this.orderService.monobankCallbackHandler(data);
  }

  @Get('generatePaymentUrl')
  async generatePaymentUrl(@Query('orderId') orderId: number) {
    return this.orderService.generatePaymentUrl(orderId);
  }
}
