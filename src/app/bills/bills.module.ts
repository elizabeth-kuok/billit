import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillsComponent } from './bills.component';
import { BillAddComponent } from './bill-add/bill-add.component';
import { BillsService } from './bills.service';
import { FormsModule } from '@angular/forms';
import { BillsRoutingModule } from './bills-routing.module';

@NgModule({
    declarations: [
        BillsComponent,
        BillAddComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        BillsRoutingModule
    ],
    providers: [
        BillsService
    ]
})
export class BillsModule { }