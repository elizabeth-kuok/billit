import { Bill } from "../bills/bill.model";

export class Util {
    public static transformDueDate(bill: Bill) {
        if (!bill) return null;
        if (!bill.due_date) return null;
        return bill.due_date.toDate(); 
    }

    public static toCurrencyFormat(num: string) {
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