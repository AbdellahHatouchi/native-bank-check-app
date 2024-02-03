import { db } from '~/lib/db';
import { BankCheck } from '~/model/bank-check';

const create = (check: BankCheck) => {
  return new Promise<BankCheck>((resolve, reject) => {
    const timestamp = Date.now();
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO bankcheck (id, checkType, checkNumber, paymentDate, amount, bankName, userId, note, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          check.id,
          check.checkType,
          check.checkNumber,
          check.paymentDate,
          check.amount,
          check.bankName ?? null,
          check.userId,
          check.note ?? null,
          timestamp,
        ],
        (_, result) => {
          console.log('Cheque inserted successfully');
          resolve({ ...check, timestamp });
        },
        (_, error) => {
          console.log('Error inserting cheque:', error);
          reject('Error inserting check');
          return !!error;
        }
      );
    });
  });
};
const updateStatus = (id: string, status: string) => {
  return new Promise<{ status: string; id: string }>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE bankcheck SET checkStatus = ? WHERE id = ?',
        [status, id],
        (_, result) => {
          console.log('Update Cheque Status successfully');
          resolve({ id, status });
        },
        (_, error) => {
          console.log('Error update status cheque:', error);
          reject('Error update status check');
          return !!error;
        }
      );
    });
  });
};
const deleteBankCheck = (id: string) => {
  return new Promise<{ id: string }>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM bankcheck WHERE id = ?',
        [id],
        (_, result) => {
          console.log('Delete Cheque successfully');
          resolve({ id });
        },
        (_, error) => {
          console.log('Error deleteing cheque:', error);
          reject('Error deleteing check');
          return !!error;
        }
      );
    });
  });
};

const getAllChecks = ({
  checkNumber,
  checkStatus,
  checkType,
}: {
  checkStatus: string;
  checkNumber: string;
  checkType: 'personal' | 'customer';
}) => {
  return new Promise<BankCheck[]>((resolve, reject) => {
    db.transaction((tx) => {
      let query = 'SELECT * FROM bankcheck WHERE checkType = ? AND checkStatus = ?';
      const params: string[] = [checkType, checkStatus];

      if (checkNumber) {
        query += ' AND checkNumber LIKE ?';
        params.push(`%${checkNumber}%`);
      }

      query += ' ORDER BY paymentDate, checkStatus';
      tx.executeSql(
        query,
        params,
        // 'SELECT * FROM bankcheck WHERE checkNumber LIKE ? ORDER BY paymentDate',
        // [`%${checkNumber}%`],
        (_, result) => {
          const bankChecks = result.rows._array; // Retrieve the result as an array of objects
          console.log('Bank checks:', bankChecks);
          resolve(bankChecks);
        },
        (_, error) => {
          console.log('Error querying bank checks:', error);
          reject(error);
          return !!error;
        }
      );
    });
  });
};
export { create, getAllChecks, updateStatus, deleteBankCheck };
