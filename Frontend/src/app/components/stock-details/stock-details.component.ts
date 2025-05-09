import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  CurrentStock = {
    FuelType : null,
    FuelStock : null,
    StockID : null 
  };
  message ='';
  

  constructor(
    private stockservice: StockService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.message='';
    this.getStock(this.route.snapshot.paramMap.get('id'));
  }

  getStock(id: any): void{
    this.stockservice.get(id)
    .subscribe(

      data =>{
        this.CurrentStock.StockID = data.id;
        this.CurrentStock.FuelType= data.fuelType;
        this.CurrentStock.FuelStock=data.fuelStock;
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
      
  }

  UpdateStock():void{
    const data = {
      fuelType:this.CurrentStock.FuelType,
      fuelStock:this.CurrentStock.FuelStock
    };
    this.stockservice.update(this.CurrentStock.StockID,data)
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

  DeleteStock():void{
    this.stockservice.delete(this.CurrentStock)
      .subscribe(
      response =>{
        console.log(response);
        this.router.navigate(['/stocks']);
      },
      error=>{
        console.log(error);
      }
      
    )
  }

}
