import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  stock = {
    fuelType: '',
    fuelStock : 0
  };
  submitted = false;
  constructor(private stockservice : StockService) { }

  ngOnInit(): void {
  }

  saveStock():void{
    const data = {
      fuelType:this.stock.fuelType,
      fuelStock:this.stock.fuelStock
    };

    this.stockservice.create(data)
    .subscribe(
      Response =>{
        console.log(Response);
        this.submitted=true;
      },
      error=>{
        console.log(error);
      }
      
    );
  }

  newStock():void{
    this.submitted=false;
    this.stock={
      fuelType:'',
      fuelStock:0
    };
  }

}
