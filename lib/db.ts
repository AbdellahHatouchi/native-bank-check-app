import * as SQLite from 'expo-sqlite';
const databaseName = 'bankcheck.db';

export const db = SQLite.openDatabase(databaseName);
