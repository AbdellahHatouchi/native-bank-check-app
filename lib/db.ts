import * as SQLite from 'expo-sqlite';
const databaseName = 'bankcheck.db';

export const db = SQLite.openDatabase(databaseName);

export const EnableForeginKeys = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'PRAGMA foreign_keys=ON;',
      [],
      (txObj, resultSet) => console.log('Foreign keys enabled')
      //   (txObj, error) => console.log('Error enabling foreign keys:', error)
    );
  });
};
