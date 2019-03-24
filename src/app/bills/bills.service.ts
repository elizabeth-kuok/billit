import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";

import { Bill } from "./bill.model"
import { Subject } from "rxjs";

@Injectable()
export class BillsService {

    constructor(private db: AngularFirestore) { }

    billsChanged = new Subject<Bill[]>();

    private bills: Bill[] = [];

    fetchBills() {
        return this.db
            .collection('bills')
            .snapshotChanges()
            .map(docArray => {
                return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    } as Bill;
                })
            })
            .subscribe((bills: Bill[]) => {
                this.bills = bills;
                this.billsChanged.next([...this.bills]);
            });
    }

    addDataToDatabase(bill: Bill) {
        this.db.collection('bills')
            .add(bill);
    }
}