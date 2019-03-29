import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BillsService } from '../bills.service';
import { Bill } from '../bill.model';

import { Util as _u } from '../../util/util';
import { FormArray, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';

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

    shareForm: FormGroup;

    transformDueDate = _u.transformDueDate;

    isSplit: boolean;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private billService: BillsService
    ) {}
    ngOnInit() {
        this.initShareForm();
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

    navigateToBillEdit(bill: Bill) {
        if (bill.account_id) {
            this.router.navigate(['bills/edit/' + bill.account_id + '/' + bill.id]);
        } else {
            this.router.navigate(['bills/edit/' + bill.id]);
        }
    }

    initShareForm() {
        this.shareForm = new FormGroup({
            'friends': new FormArray([])
        });
    }

    onAddFriend() {
        (<FormArray>this.shareForm.get('friends')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null)
            })
        )
    }

    onDeleteFriend(index: number) {
        (<FormArray>this.shareForm.get('friends')).removeAt(index);
      }

    getControls(): AbstractControl[] {
        return (<FormArray>this.shareForm.get('friends')).controls;
    }

    onSubmit() {
        console.log("Submit");
        console.log(this.shareForm.value);
    }

    onSplitChecked(event: MatCheckboxChange) {
        this.isSplit = event.checked;
        if (!this.isSplit) return;

        const controls = this.getControls();
        
        controls.forEach(c => {
            c.patchValue({
                amount: _u.toCurrencyFormat(
                    (this.bill.amount / controls.length)
                        .toString()
                )
            })
        })
    }
}