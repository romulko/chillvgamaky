import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entity/order.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [OrderController],
  imports: [SequelizeModule.forFeature([Order]), HttpModule],
  providers: [OrderService],
})
export class OrderModule {}
