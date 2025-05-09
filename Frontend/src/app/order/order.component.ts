import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { ApiService } from '../api.service';
import { Order } from '../order';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  displayedColumns  :  string[] = ['id', 'uniqueKey', 'name', 'fuelType', 'fuel', 'date', 'status'];
  dataSource : Order [] = [];
  order:any = {};
  FindKey = this.order.uniqueKey;
  FilteredOrders :any [] = this.dataSource;
  givenDate = null;
  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.readOrders().subscribe((result)=>{   
    this.dataSource =  result;
    })
  }

  FilterByUniqueKey(){
    
    console.log(this.FindKey);
    this.FilteredOrders = this.dataSource.filter((lorder) =>lorder.uniqueKey===this.FindKey);
    console.log(this.FilteredOrders);
  }
 

  selectOrder(order: any){
    this.order = order;
  }

  newOrder(){
    this.order = {};
  }

  createOrder(f: { value: Order; }){
    this.apiService.createOrder(f.value).subscribe((result)=>{
      console.log(result);
    });
    location.reload();
    
  }

  deleteOrder(id: number){
    this.apiService.deleteOrder(id).subscribe((result)=>{
      console.log(result);
    });
    location.reload();
  }

  updateOrder(f: { value: Order; }){
    f.value.id = this.order['id'];
    this.apiService.updateOrder(f.value).subscribe((result)=>{
      console.log(result);
    });
  }

}


