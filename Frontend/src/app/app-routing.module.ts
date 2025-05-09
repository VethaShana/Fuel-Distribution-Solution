import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderComponent } from './order/order.component';
import { StocksListComponent } from './components/stocks-list/stocks-list.component';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { ReportComponent } from './report/report.component';
import { AllocatedStocksComponent } from './allocated-stocks/allocated-stocks.component';

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "orders"},
  {path: "orders", component: OrderComponent},
  {path: "stocks", component: StocksListComponent},
  {path: "stocks/:id", component: StockDetailsComponent},
  {path: "add", component: AddStockComponent},
  {path: "orders/all", component: ReportComponent},
  {path: "allocatedStocks", component: AllocatedStocksComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
