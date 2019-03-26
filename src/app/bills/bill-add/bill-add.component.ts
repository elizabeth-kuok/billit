import { Component, ViewChild, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Bill, Account } from "../bill.model";
import { BillsService } from "../bills.service";

import { firestore } from "firebase";
import { MatCheckboxChange } from "@angular/material";

@Component({
    selector: "app-bill-add",
    templateUrl: "./bill-add.component.html",
    styleUrls: ["./bill-add.component.css"]
})
export class BillAddComponent implements OnInit {
    @ViewChild('f') bForm: NgForm;

    constructor(private billService: BillsService) { }
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
        for (let i = 2; i < 32; i++) {
            this.sourceMap.month.push('' + i);
        }
        this.filterMap.month = this.sourceMap.month.slice();
        this.filterMap.week = this.sourceMap.week.slice();
    }
    onSubmit(form: NgForm) {
        const value = form.value;
        console.log(value);

        const doMakeAccount = this.isRepeating;

        const bill: Bill = {
            name: value.name,
            amount: +value.amount,
            due_date: value.due_date && firestore.Timestamp.fromDate(value.due_date),
            payment: null,
            shared_with: [],
        };

        if (!doMakeAccount) {
            console.log(bill);
            this.billService.addDataToDatabase(bill);
            form.reset();
            return;
        }

        const account: Account = {
            name: value.name,
            bills: [bill]
        }
        console.log(account);
        this.billService.createAccount(account);
        form.reset();
        
    }

    onRepeatChecked(event: MatCheckboxChange) {
        this.isRepeating = event.checked;
    }

    onBlur(num: string) {
        const cur = this.toCurrencyFormat(num);
        this.amount = cur;
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
        let i = -1
        if (+num === 0 || isNaN(+num)) {
            return "0.00";
        }
        if (!/[0-9]?\.?[0-9]?/.test(num)) {
            return "0.00";
        }
        while(++i < num.length) {
            if (num[i] !== "0") break;
        }
        if (num.indexOf('.') < 0) {
            return num.slice(i) + ".00";
        }
        let dec = num.split('.');

        let j = -1, d = "";
        while(++j < 2) {
            if (dec[1][j]) {
                d += dec[1][j];
                continue;
            }
            d += "0";
        }
        return dec[0].slice(i) + "." + d;
    }
}