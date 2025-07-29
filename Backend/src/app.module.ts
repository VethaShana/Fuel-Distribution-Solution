import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Order } from './entities/order.entity';
import { OrderService } from './order/order.service';
import { OrdersController } from './orders/orders.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'fueldistribution',
      username: 'root',
      password: '',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService, OrderService],
})
export class AppModule {}
