import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillsComponent } from './bills.component';
import { BillAddComponent } from './bill-add/bill-add.component';
import { BillsService } from './bills.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BillsRoutingModule } from './bills-routing.module';
import { MaterialModule } from '../material.module';
import { ViewBillComponent } from './bill-view.ts/bill-view.component';

@NgModule({
    declarations: [
        BillsComponent,
        BillAddComponent,
        ViewBillComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        BillsRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    providers: [
        BillsService
    ]
})
export class BillsModule { }