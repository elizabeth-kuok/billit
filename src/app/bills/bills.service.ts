import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";

import { Bill, Account } from "./bill.model"
import { Subject } from "rxjs";
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class BillsService {

    constructor(private db: AngularFirestore) { }

    billsChanged = new Subject<Bill[]>();
    accountsChanged = new Subject<Account[]>();
    private bills: Bill[] = [];
    private accounts: Account[] = [];
    private fbSubs: Subscription[] = [];

    fetchBills() {
        const sub = this.db
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
            }, error => {
                // nothing yet
            });
        this.fbSubs.push(sub);
    }

    fetchAccounts() {
        const sub = this.db
            .collection('accounts')
            .snapshotChanges()
            .map(docArray => {
                return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    } as Account;
                })
            })
            .subscribe((accts: Account[]) => {
                this.accounts = accts;
                this.accountsChanged.next([...this.accounts]);
            }, error => {
                // nothing yet
            });
        
        this.fbSubs.push(sub);
    }

    addDataToDatabase(bill: Bill) {
        this.db.collection('bills')
            .add(bill);
    }

    createAccount(acct: Account) {
        this.db.collection('accounts')
            .add(acct);
    }

    cancelSubs() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    // testNestedDocuments() {
    //     const doc = this.db.doc('/parent/inDYLGtpuWKQAqCQqDPr');
    //     doc.collection('rent')
    //         .valueChanges()
    //         .subscribe(shit => {
    //             console.log(shit);
    //         });
    // }

    // testCreateNestedCollection() {
    //     let item = {
    //         id: this.db.createId()
    //     };
    //     let subitem = {
    //         id: this.db.createId(),
    //         name: 'nesttest'
    //     };
    //     this.db.collection('parent')
    //         .add(item)
    //         .then(doc => {
    //             doc.collection('test').add(subitem);
    //         });
    // }
}