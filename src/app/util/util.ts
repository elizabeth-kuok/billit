import { Bill } from "../bills/bill.model";

export class Util {
    public static transformDueDate(bill: Bill) {
        if (!bill) return null;
        if (!bill.due_date) return null;
        return bill.due_date.toDate(); 
    }
}