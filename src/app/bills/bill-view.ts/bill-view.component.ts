import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BillsService } from '../bills.service';
import { Bill } from '../bill.model';

import { Util as _u } from '../../util/util';

@Component({
    selector: 'app-view-bill',
    templateUrl: './bill-view.component.html',
    styleUrls: ['./bill-view.component.css']
})
export class ViewBillComponent implements OnInit {
    billId: string;
    accountId: string;
    bill: Bill;
    billsSubscription: Subscription;
    accountsSub: Subscription;

    transformDueDate = _u.transformDueDate;

    constructor(
        private route: ActivatedRoute,
        private billService: BillsService
    ) {}
    ngOnInit() {
        this.billsSubscription = this.billService.billsChanged
            .subscribe(bills => {
                this.findBill();
            });
        this.accountsSub = this.billService.accountsChanged
            .subscribe(accts => {
                this.findBill();
            });
        this.route.paramMap.pipe(
            switchMap(params => {
                this.billId = params.get('bill_id');
                this.accountId = params.get('account_id');
                console.log("Account:", this.accountId);
                console.log("Bill: " + this.billId)

                this.findBill();
                console.log('Bill View bill');
                console.log(this.bill);
                return new Observable();
            })
        ).subscribe(_ => {
            
        });
    }

    findBill() {
        this.bill = this.billService.getAccountBill(this.accountId, this.billId);
    }
}