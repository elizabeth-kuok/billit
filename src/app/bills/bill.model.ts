import { firestore } from "firebase";

export interface Bill {
    id: string;
    name: string;
    payments: Payment[];
    shared_with: Owed[];
    due_date?: firestore.Timestamp;
}

export interface FixedBill extends Bill {
    type: 'fixed';
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