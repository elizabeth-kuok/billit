import { Component, ViewChild, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { Bill, Account } from "../bill.model";
import { BillsService } from "../bills.service";

import { firestore } from "firebase";
import { MatCheckboxChange } from "@angular/material";
import { Router, ActivatedRoute, UrlSegment } from "@angular/router";

import { Util } from "../../util/util";

@Component({
    selector: "app-bill-add",
    templateUrl: "./bill-add.component.html",
    styleUrls: ["./bill-add.component.css"]
})
export class BillAddComponent implements OnInit {
    @ViewChild('f') bForm: NgForm;

    billForm: FormGroup;
    isEdit: boolean;
    editBill: Bill;

    constructor(
        private route: ActivatedRoute,
        private billService: BillsService,
        private router: Router
    ) { }
    periods = [
        "Month",
        "Week",
        "Year"
    ];
    selectedPeriod: 'month' | 'week' | 'year' = 'month';

    isRepeating = false;;
    amount;

    sourceMap = {
        month: ['1', 'End of month'],
        week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }

    filterMap = {
        month: [],
        week: []
    }

    default = {
        period: this.periods[0]
    }

    ngOnInit() {
        let urlSegments = this.route.snapshot.url;
        console.log(urlSegments);
        let bill: Bill;
        if (urlSegments[1].path === 'edit') {
            this.isEdit = true;
            bill = this.getBill(urlSegments);
            this.editBill = bill;
        }

        // let id = this.route.snapshot.paramMap.get('id');

        this.createForm(bill);

        for (let i = 2; i < 32; i++) {
            this.sourceMap.month.push('' + i);
        }
        this.filterMap.month = this.sourceMap.month.slice();
        this.filterMap.week = this.sourceMap.week.slice();
    }

    private createForm(bill: Bill) {
        if (!bill) {
            this.billForm = new FormGroup({
                name: new FormControl('', { validators: [Validators.required] }),
                amount: new FormControl(''),
                due_date: new FormControl(''),
                notes: new FormControl(''),
                day_repeat: new FormControl(''),
                repeat_on_date: new FormControl('')
            });
            return;
        }
        this.billForm = new FormGroup({
            name: new FormControl(bill.name, { validators: [Validators.required] }),
            amount: new FormControl(this.toCurrencyFormat(bill.amount.toString())),
            due_date: new FormControl(bill.due_date.toDate()),
            notes: new FormControl(bill.notes),
            day_repeat: new FormControl(''),
            repeat_on_date: new FormControl('')
        });
        if (bill.account_id) {
            this.isRepeating = true;
        }
    }

    private getBill(urlSegments: UrlSegment[]): Bill {
        if (urlSegments.length > 3) {
            const acctId = urlSegments[2].path;
            const billId = urlSegments[3].path;
            // get account bill
            return this.billService.getAccountBill(acctId, billId);
        } else {
            const billId = urlSegments[2].path;
            return this.billService.getBill(billId);
        }
    }

    onSubmit() {
        const value = this.billForm.value;

        const doMakeAccount = this.isRepeating;

        const bill: Bill = {
            name: value.name,
            amount: +value.amount,
            due_date: value.due_date && firestore.Timestamp.fromDate(value.due_date),
            payment: null,
            shared_with: [],
            notes: value.notes
        };

        if (!doMakeAccount) {
            console.log(bill);
            this.billService.createBill(bill);
            return;
        }

        const account: Account = {
            name: value.name,
            bills: [bill],
            notes: value.notes
        }
        console.log(account);
        if (!this.isEdit) {
            this.billService.createAccount(account);
            this.router.navigate(['/bills']);
            return;
        }
        bill.account_id = this.editBill.account_id;
        bill.id = this.editBill.id;
        this.billService.updateAccountBill(bill);
        this.router.navigate(['/bills', bill.account_id, bill.id]);
        
    }

    onRepeatChecked(event: MatCheckboxChange) {
        this.isRepeating = event.checked;
    }

    onBlur() {
        const cur = this.toCurrencyFormat(this.billForm.value.amount);
        this.billForm.patchValue({ amount: cur });
    }

    onPeriodSelect(p) {
        console.log(p);
        this.selectedPeriod = p.toLowerCase();
    }

    onKeyUpFilter(val: string, filter_key: string) {
        this.filterMap[filter_key] = this.sourceMap[filter_key].filter((day) => {
            return day.toLowerCase().includes(val.toLowerCase());
        });
    }

    private toCurrencyFormat(num: string) {
        return Util.toCurrencyFormat(num);
    }
}