import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Bill } from "../bill.model";
import { BillsService } from "../bills.service";

@Component({
    selector: "app-bill-add",
    templateUrl: "./bill-add.component.html"
})
export class BillAddComponent {
    @ViewChild('f') bForm: NgForm;

    constructor(private billService: BillsService) { }

    onSubmit(form: NgForm) {
        const value = form.value;
        const bill = { name: value.name } as Bill;
        this.billService.addDataToDatabase(bill);
        form.reset();
    }
}