import { Component, OnInit } from '@angular/core';
import { AllocationService } from '../services/allocation.service';
import { ApiService } from '../api.service';
import { Allocation } from '../allocation';
import { Order } from '../order';
import { StockService } from '../services/stock.service';
import { Stock } from '../stock';
import { Location } from '@angular/common';
import { DispatchService } from '../services/dispatch.service';

@Component({
  selector: 'app-allocated-stocks',
  templateUrl: './allocated-stocks.component.html',
  styleUrls: ['./allocated-stocks.component.css']
})
export class AllocatedStocksComponent implements OnInit {
  displayedColumns  :  string[] = ['id','orderId','uniqueKey', 'name', 'fuelType', 'fuel', 'date','actions'];
  stocks : any;
  dataSource2 : Allocation [] = [];
  stock : any = {};
  stock2 : any ={};
  order : any = {};
  order2 : any = {};
  data2 : any = {
    
    id:null,
    uniqueKey: null,
    name: null ,
    fuelType: null,
    fuel: null,
    date: null,
    status : ''
  }; 
  message = '';
  fS = 0;

  constructor(
    private allocationservice : AllocationService,
    private apiService : ApiService,
    private stockService : StockService,
    private dispatchservice : DispatchService,
    private location : Location
    ) { }

  ngOnInit(): void {
    this.retrieveStocks();
  }

  retrieveStocks(): void{
    this.allocationservice.getAll()
    .subscribe(

      data =>{
        this.stocks = data;
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
      
  }

  backClicked(){
    this.location.back();
  }


  dispatchOrder(f: { value: Allocation; }){
    this.stock = f ;
    console.log(this.stock.orderId);

   this.data2 ={
      id :this.stock.orderId,
      uniqueKey: this.stock.uniqueKey,
      name: this.stock.name ,
      fuelType: this.stock.fuelType,
      fuel: this.stock.fuel,
      date: this.stock.date,
      status : "Processing.."
    }
    this.updateOrder(this.data2);
    this.removeOrder(this.stock.id);
    location.reload();
    
  }

  updateOrder(f: { value: Order; }){

    this.order = f;
    console.log(this.order);
    this.order.status = 'Delivered!!';
    this.apiService.updateOrder(this.order).subscribe((result)=>{
      console.log(result);
    });

  }

  updateOrderReject(f:{ value: Order; }){

    this.order2 = f;
    console.log(this.order2);
    this.order2.status = 'Cancelled!!';
    this.apiService.updateOrder(this.order2).subscribe((result)=>{
      console.log(result);
    });

  }


  CancelOrder(f: { value: Allocation; }){

    this.stock = f;
    console.log(this.stock.fuelType);

    this.stockService.findByFuelType(this.stock.fuelType).subscribe( 
    data=>{
      this.stock2 = data; 
      
      console.log(this.stock2[0].fuelStock);
      this.stock2[0].fuelStock = this.stock2[0].fuelStock +  this.stock.fuel;
      console.log(this.stock2[0].fuelStock);
      this.fS = this.stock2[0].fuelStock;
      this.message ='Successfully Added to stock';
      console.log("done!!")
     
      this.UpdateStock(this.stock2[0]);
      

    });


    this.data2 = {
      id :this.stock.orderId,
      uniqueKey: this.stock.uniqueKey,
      name: this.stock.name ,
      fuelType: this.stock.fuelType,
      fuel: this.stock.fuel,
      date: this.stock.date,
      status : "Processing.."
    }

    console.log(this.data2);

    this.updateOrderReject(this.data2);
    this.removeOrder(this.stock.id);
    location.reload();
    
  }

  removeOrder(id : number){
    this.dispatchservice.delete(id).subscribe(
      (results)=>{
        console.log(results);
      }
    );
  }

  UpdateStock(f: { value: Stock; }){
    this.stock2 = f;
    this.stock2.fuelStock= this.fS;
    
    const data2= {
      id : this.stock2.id,
      fuelType: this.stock2.fuelType,
      fuelStock:this.stock2.fuelStock
    };

    console.log(data2);

    this.stockService.update(this.stock2.id, data2)
      .subscribe(
      response =>{
        console.log(response);
        this.message="Stock was updated successfully";
        console.log("Stock-done!")
      },
      error=>{
        console.log(error);
      }
      
    )
  }


}
