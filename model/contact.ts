import { db } from '~/lib/db';

export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  bankName?: string;
  note?: string;
  timestamp?: number;
}
export const createContactTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS contact (id TEXT PRIMARY KEY, name TEXT,phoneNumber TEXT,email TEXT,bankName TEXT,note TEXT,timestamp INTEGER);',
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
