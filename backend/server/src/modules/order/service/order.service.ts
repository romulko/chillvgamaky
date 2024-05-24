import { Injectable } from '@nestjs/common';
import { Order } from '../entity/order.entity';
import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto, UpdateOrderDto } from '../dto/dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getStatistic(email: string) {
    const orders = await Order.findAll({
      where: {
        email,
        startTime: {
          [Op.not]: null,
        },
        endTime: {
          [Op.not]: null,
        },
      },
    });

    let time = 0;

    orders.map((value) => {
      time += (value.endTime.getTime() - value.startTime.getTime()) / 1000 / 60;
    });

    return Math.round(time);
  }

  getUnpaid(email: string) {
    return Order.findOne({
      where: {
        email,
        paymentStatus: {
          [Op.not]: 'success',
        },
      },
    });
  }

  create(order: CreateOrderDto) {
    return Order.create({ ...order });
  }

  async update(order: UpdateOrderDto) {
    await Order.update(order, { where: { id: order.id } });

    return Order.findOne({ where: { id: order.id } });
  }

  async verifyPaymentComplete(orderId: number) {
    const order = await Order.findOne({ where: { id: orderId } });

    return order.paymentStatus === 'success';
  }

  async generatePaymentUrl(orderId: number) {
    const order = await Order.findOne({ where: { id: orderId } });

    const startTime = order?.startTime;
    const endTime = order?.endTime;

    const amount =
      Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60) * 100;

    const data = await this.httpService
      .post(
        'https://api.monobank.ua/api/merchant/invoice/create',
        JSON.stringify({
          amount,
          ccy: 980,
          merchantPaymInfo: {
            reference: order.id,
            destination: 'Оренда гамака',
          },
          redirectUrl: `https://chillvgamaky.if.ua/order/${order.id}`,
          webHookUrl:
            'https://chillvgamaky.if.ua/server_api/order/monobankCallback',
          validity: 3600,
          paymentType: 'debit',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Token': this.configService.get('MONOBANK_TOKEN'),
          },
        },
      )
      .toPromise();

    return JSON.stringify({ ...data.data, amount });
  }

  monobankCallbackHandler(data: any) {
    console.log(data);

    return Order.update(
      {
        monobankData: data,
        paymentStatus: data.status,
      },
      { where: { id: data.reference } },
    );
  }
}
