import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

async function openDatabase(pathToDatabaseFile: string): Promise<SQLite.WebSQLDatabase> {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require(pathToDatabaseFile)).uri,
    FileSystem.documentDirectory + 'SQLite/myChequeDatabase.db'
  );
  return SQLite.openDatabase('myChequeDatabase.db');
}

export default openDatabase;
