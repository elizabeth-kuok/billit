import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Bill } from "../bill.model";
import { BillsService } from "../bills.service";

import { firestore } from "firebase";
import { MatCheckbox, MatCheckboxChange } from "@angular/material";
const Timestamp = firestore.Timestamp;
@Component({
    selector: "app-bill-add",
    templateUrl: "./bill-add.component.html",
    styleUrls: ["./bill-add.component.css"]
})
export class BillAddComponent {
    @ViewChild('f') bForm: NgForm;
    @ViewChild('repeatCheck') repeatCheck: MatCheckbox;

    constructor(private billService: BillsService) { }
    periods = [
        "Month",
        "Week",
        "Year"
    ];
    isRepeating = false;;
    amount;
    onSubmit(form: NgForm) {
        const value = form.value;
        console.log(value);
        console.log(this.repeatCheck);
        const bill = {
            id: null,
            type: this.isRepeating ? 'repeating' : 'variable',
            name: value.name,
            amount: +value.amount,
            due_date: value.due_date && firestore.Timestamp.fromDate(value.due_date),
            payments: [],
            shared_with: [],
        };
        console.log(bill);
        // this.billService.addDataToDatabase(bill);
        form.reset();
    }

    onRepeatChecked(event: MatCheckboxChange) {
        this.isRepeating = event.checked;
    }

    onBlur(num: string) {
        const cur = this.toCurrencyFormat(num);
        this.amount = cur;
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