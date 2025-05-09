import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Order } from  './order';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_SERVER = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }

  public readOrders(){
    return this.httpClient.get<Order[]>(`${this.API_SERVER}/orders`);
  }

  public createOrder(order: Order){
    return this.httpClient.post<Order>(`${this.API_SERVER}/orders/create`, order);
  }

  public updateOrder(order: Order){
    return this.httpClient.put<Order>(`${this.API_SERVER}/orders/${order.id}/update`, order);
  }

  public deleteOrder(id: number){
    return this.httpClient.delete(`${this.API_SERVER}/orders/${id}/delete`);
  }

  
  
}
