import { db } from '~/lib/db';
import { Contact } from '~/model/contact';

const create = (contact: Contact) => {
  return new Promise<Contact>((resolve, reject) => {
    const timestamp = Date.now();
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO contact (id, name, phoneNumber, email, bankName, note, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          contact.id,
          contact.name,
          contact.phoneNumber,
          contact.email ?? null,
          contact.bankName ?? null,
          contact.note ?? null,
          timestamp,
        ],
        (_, result) => {
          console.log('contact inserted successfully');
          resolve({ ...contact, timestamp });
        },
        (_, error) => {
          console.log('Error inserting contact:', error);
          reject('Error inserting contact');
          return !!error;
        }
      );
    });
  });
};
// const update = (id: string, status: string) => {
//   return new Promise<{ status: string; id: string }>((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'UPDATE bankcheck SET checkStatus = ? WHERE id = ?',
//         [status, id],
//         (_, result) => {
//           console.log('Update Cheque Status successfully');
//           resolve({ id, status });
//         },
//         (_, error) => {
//           console.log('Error update status cheque:', error);
//           reject('Error update status check');
//           return !!error;
//         }
//       );
//     });
//   });
// };
// const deleteBankCheck = (id: string) => {
//   return new Promise<{ id: string }>((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'DELETE FROM bankcheck WHERE id = ?',
//         [id],
//         (_, result) => {
//           console.log('Delete Cheque successfully');
//           resolve({ id });
//         },
//         (_, error) => {
//           console.log('Error deleteing cheque:', error);
//           reject('Error deleteing check');
//           return !!error;
//         }
//       );
//     });
//   });
// };

const getAllContacts = ({ name }: { name: string }) => {
  return new Promise<Contact[]>((resolve, reject) => {
    db.transaction((tx) => {
      let query = 'SELECT * FROM contact';
      const params: string[] = [];

      if (name) {
        query += ' WHERE name LIKE ?';
        params.push(`%${name}%`);
      }

      query += ' ORDER BY name';
      tx.executeSql(
        query,
        params,
        // 'SELECT * FROM bankcheck WHERE checkNumber LIKE ? ORDER BY paymentDate',
        // [`%${checkNumber}%`],
        (_, result) => {
          const contacts = result.rows._array; // Retrieve the result as an array of objects
          console.log('contacts:', contacts);
          resolve(contacts);
        },
        (_, error) => {
          console.log('Error querying contacts:', error);
          reject(error);
          return !!error;
        }
      );
    });
  });
};
export { create, getAllContacts };
