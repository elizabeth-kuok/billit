import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bill } from './bill.model';
import { BillsService } from './bills.service';
@Component({
    selector: 'app-bills',
    templateUrl: './bills.component.html'
})
export class BillsComponent implements OnInit, OnDestroy {
    bills: Bill[];
    billsSubscription: Subscription;
    
    constructor(private billsService: BillsService) { }

    ngOnInit() {
        this.billsSubscription = this.billsService.billsChanged
            .subscribe(bills => {
                this.bills = bills;
            });
        this.billsService.fetchBills();
    }

    ngOnDestroy() {
        this.billsSubscription.unsubscribe();
    }
}