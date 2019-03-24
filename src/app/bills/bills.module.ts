import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillsComponent } from './bills.component';
import { BillsService } from './bills.service';

@NgModule({
    declarations: [
        BillsComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [
        BillsService
    ]
})
export class BillsModule { }