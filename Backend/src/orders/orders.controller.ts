
import { OrderService } from '../order/order.service';

import { Controller, Get, Post,Put, Delete, Body, Param } from  '@nestjs/common';
import { Order } from  '../entities/order.entity';

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrderService){
    }

    @Get()
    read(): Promise<Order[]> {
      return this.orderService.readAll();
    }
    
    @Post('create')
    async create(@Body() order: Order): Promise<any> {
      return this.orderService.create(order);
    }  
    
    @Put(':id/update')
    async update(@Param('id') id, @Body() order: Order): Promise<any> {
        order.id = Number(id);
        return this.orderService.update(order);
    }  
    
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.orderService.delete(id);
    }
}
