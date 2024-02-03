import { db } from '~/lib/db';

export interface checkStatus {
  status: 'open' | 'paid' | 'trasferred';
}

export interface BankCheck {
  id: string;
  checkType: 'personal' | 'customer';
  checkNumber: string;
  paymentDate: string;
  amount: number;
  bankName?: string;
  userId: string;
  checkStatus: string;
  note?: string;
  timestamp?: number;
}
export const createBankCheckTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS bankcheck (id TEXT PRIMARY KEY, checkType TEXT,checkNumber TEXT,paymentDate TEXT,amount NUMERIC,bankName TEXT,checkStatus TEXT DEFAULT "open",userId TEXT,note TEXT,timestamp INTEGER);',
      [],
      (_, result) => {
        console.log('Table created successfully');
      }
      // (_, error) => {
      //   console.log('Error creating table:', error);
      //   return false;
      // }
    );
  });
};
