import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.css']
})
export class StocksListComponent implements OnInit {

  stocks : any;
  currentStock = null;
  currentIndex = -1;
  fuelType = '';
  currentStockID = null;
  currentStockFuelType = null;
  currentStockFuelStock = null;

  constructor(private stockservice : StockService) { }

  ngOnInit(): void {
    this.retrieveStocks();
  }

  retrieveStocks(): void{
    this.stockservice.getAll()
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

  refreshList(): void{
  this.retrieveStocks() ;
  this.currentStock = null;
  this.currentIndex = -1;
  }

  setActiveStock(stock:any,index: number):void{
    this.currentStock= stock;
    this.currentStockID = stock.id;
    this.currentStockFuelType = stock.fuelType;
    this.currentStockFuelStock = stock.fuelStock;
    this.currentIndex =index;

  }

  removeAllStocks(): void{
    this.stockservice.deleteAll()
    .subscribe(

      response =>{
        console.log(response);
        this.retrieveStocks();
        
      },
      error=>{
        console.log(error);
      }
    )
      
  }

  searchFuelType(): void{
    this.stockservice.findByFuelType(this.fuelType)
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

}


