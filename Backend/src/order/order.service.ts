import { Injectable } from '@nestjs/common';

import { InjectRepository } from  '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, FilterQuery } from  'typeorm';
import { Order } from  '../entities/order.entity';

@Injectable()
export class OrderService {
    
constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>
) { }

async create(order: Order): Promise<Order> {
    return await this.orderRepository.save(order);
}

async  readAll(): Promise<Order[]> {
    return await this.orderRepository.find();
}

async update(order: Order): Promise<UpdateResult> {

    return await this.orderRepository.update(order.id,order);
}

async delete(id): Promise<DeleteResult> {
    return await this.orderRepository.delete(id);
}




}
