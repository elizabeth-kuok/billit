import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bill, Account } from './bill.model';
import { BillsService } from './bills.service';
import { Router } from '@angular/router';

import { Util as _u } from '../util/util';

@Component({
    selector: 'app-bills',
    templateUrl: './bills.component.html',
    styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit, OnDestroy {
    bills: Bill[];
    billsSubscription: Subscription;
    accounts: Account[];
    accountsSub: Subscription;

    sumPerYear: number = 0;
    sumPerMonth = 0;
    
    constructor(
        private router: Router,
        private billsService: BillsService) { }

    ngOnInit() {
        this.billsSubscription = this.billsService.billsChanged
            .subscribe(bills => {
                this.bills = bills.sort((a, b) => {
                    if (!a.due_date)
                        return 1;
                    if (a.due_date > b.due_date)
                        return 1;
                    return -1;
                });
            });
        this.billsService.fetchBills();
        this.accountsSub = this.billsService.accountsChanged
            .subscribe(accts => {
                console.log(accts);
                const acctBills: Bill[] = [];
                for (let acct of accts) {
                    acctBills.push(acct.bills[0]);
                }
                this.accounts = accts;
                const bills = [...acctBills, ...this.bills];
                this.bills = bills.sort((a, b) => {
                    if (!a.due_date)
                        return 1;
                    if (a.due_date > b.due_date)
                        return 1;
                    return -1;
                });
                let perMonth = this.accounts.reduce((p, c) => {
                    return p + c.bills[0].amount;
                }, 0);
                this.sumPerMonth = perMonth;
                this.sumPerYear = perMonth * 12;
            });
        this.billsService.fetchBills();
        this.billsService.fetchAccounts();
    }

    ngOnDestroy() {
        this.billsSubscription.unsubscribe();
        this.accountsSub.unsubscribe();
    }

    transformDueDate = _u.transformDueDate;

    navigateToBillView(bill: Bill) {
        console.log("Navigate to bill")
        console.log(bill);
        if (bill.account_id) {
            this.router.navigate(['/bills/' + bill.account_id + '/' + bill.id]);
        } else {
            this.router.navigate(['/bills/' + bill.id]);
        }
    }

    onPay(bill) {
        if (!bill.link) return;
        window.open(bill.link);
    }
}