import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillsComponent } from './bills.component';
import { BillAddComponent } from './bill-add/bill-add.component';
import { ViewBillComponent } from './bill-view.ts/bill-view.component';

const routes: Routes = [
    { path: 'bills',    component: BillsComponent },
    { path: 'bills/new', component: BillAddComponent },
    { path: 'bills/:bill_id', component: ViewBillComponent },
    { path: 'bills/:account_id/:bill_id', component: ViewBillComponent }
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class BillsRoutingModule {}