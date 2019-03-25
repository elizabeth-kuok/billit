import { firestore } from "firebase";

export interface Bill {
    id: string;
    type: 'variable' | 'repeating';
    name: string;
    payments: Payment[];
    shared_with: Owed[];
    due_date?: firestore.Timestamp;
}

export interface RepeatingBill extends Bill {
    type: 'repeating';
    due_date: firestore.Timestamp;
    is_late: boolean;
}

export interface BillCollection {
    name: string;
    type: 'defined' | 'misc';
    bills: Bill[];
}

export interface Payment {
    date: Date;
    user_id: string;
    amount: number;
}

export interface Owed {
    user_id: string;
    amount: number;
}