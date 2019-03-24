import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillsComponent } from './bills.component';
import { BillAddComponent } from './bill-add/bill-add.component';

const routes: Routes = [
    { path: 'bills',    component: BillsComponent },
    { path: 'bills/new', component: BillAddComponent}
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class BillsRoutingModule {}