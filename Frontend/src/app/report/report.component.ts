import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { StockService } from '../services/stock.service';
import { AllocationService } from '../services/allocation.service';
import { Order } from '../order';
import {Location} from '@angular/common';
import { Allocation } from '../allocation';
import { ActivatedRoute } from '@angular/router';
import { Stock } from '../stock';
import { Moment } from 'moment';
import { filter } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  displayedColumns  :  string[] = ['id', 'uniqueKey', 'name', 'fuelType', 'fuel', 'date', 'status'];
  dataSource : Order [] = [];
  FilteredDataSource :any [] = this.dataSource;
  dataSource2 : Allocation [] = [];
  dataSource3 : Stock []=[];
  FilteredStocks :any [] = this.dataSource3;
  stocks : any;
  stock: any;
  order:any = {};
  message ='';
  details = {
    orderId : null,
    uniqueKey: null,
    name: null ,
    fuelType: null,
    fuel: null,
    date: null 
  };
  data : any ={};
  data2 ={
    id : null,
    fuelType : null,
    fuelStock : null
  };
  fS = 0;
  //clicked : boolean = false;
 findStatus = "Requested";
  
  

  constructor(
    private apiService: ApiService ,
    private location:Location , 
    private stockservice:StockService,
    private route : ActivatedRoute,
    private allocationService : AllocationService) { }

  ngOnInit(): void {
    this.apiService.readOrders().subscribe((result)=>{   
      this.dataSource =  result;
    });
    //this.FilterByStatus();
    //this.retrieveStocks();
    //this.getStock(this.route.snapshot.paramMap.get('id'));

  }

  FilterByStatus(){
    console.log(this.dataSource);
    console.log(this.findStatus);
    this.FilteredDataSource = this.dataSource.filter((lorder) =>lorder.status===this.findStatus);
    console.log(this.FilteredDataSource);
  }


  retrieveStocks(): void{
    this.stockservice.getAll()
    .subscribe(

      data =>{
        this.stocks = data;
       
        //console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
      
  }
/*
  toggleButton(id:number){
    this.clicked = !this.clicked;
  }*/



  backClicked() {
    this.location.back();
  }

  selectOrder(order: any){
    this.order = order;
  }

  createOrder(f: { value: Order; }){

    this.data = f;
    //console.log(this.data.uniqueKey);

    const details = {
      orderId : this.data.id,
      uniqueKey :this.data.uniqueKey,
      name : this.data.name,
      fuelType : this.data.fuelType,
      fuel : this.data.fuel,
      date :this.data.date 
    };
    console.log(details.orderId);
    this.allocationService.create(details).subscribe((Response)=>{
      console.log(Response);
    });



  }
 
  AllocateOrder(f: { value: Order; }){

    this.order = f;
    console.log(this.order.fuelType);

    this.stockservice.findByFuelType(this.order.fuelType).subscribe( 
    data=>{
      this.stock = data; 
      
      if(this.order.fuel<= this.stock[0].fuelStock){
        console.log(this.stock[0].fuelStock);
        this.stock[0].fuelStock = this.stock[0].fuelStock - this.order.fuel;
        this.message ='Successfully Allocated';
        console.log("done!!")
        this.fS = this.stock[0].fuelStock;
        this.UpdateStock(this.stock[0]);
        this.updateOrder(this.order);
        this.createOrder(this.order);
        
        //location.reload();
      }
      else {
        this.message ='Sorry! Cannot Allocate ';
      }
    });
    
  }

  updateOrder(f: { value: Order; }){

    this.order = f;
    this.order.status = 'Processing..';
    console.log(this.order.date);
    
  var n = Math.floor(Math.random()* 5) + 1;
  //console.log(n);
  var sdate = new Date(this.order.date);
  //console.log(sdate);
  sdate.setDate(sdate.getDate() + n);
  //console.log(sdate); 
  console.log("Date - success");

  this.order.date = sdate;
  console.log(this.order.date);
    // this.order.date = this.order.date + Math.floor (Math.random())
    
    this.apiService.updateOrder(this.order).subscribe((result)=>{
      //console.log(result);
    });
  
  }

  UpdateStock(f: { value: Stock; }){
    this.stock = f;
    this.stock.fuelStock= this.fS;
    
    const data2= {
      id : this.stock.id,
      fuelType: this.stock.fuelType,
      fuelStock:this.stock.fuelStock
    };

    console.log(data2);

    this.stockservice.update(this.stock.id, data2)
      .subscribe(
      response =>{
        console.log(response);
        this.message="Stock was updated successfully";
      },
      error=>{
        console.log(error);
      }
      
    )
  }

  CancelOrder(f: { value: Order; }){
    this.order = f ;
    this.order.status="Sorry! It is greater than available stock!!";
    this.apiService.updateOrder(this.order).subscribe((result)=>{
      
    });
    location.reload();

  }


  
    


}
