import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, Stack } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import React, { useEffect } from 'react';
import { Platform, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { TamaguiProvider, View } from 'tamagui';

import config from '../tamagui.config';

import { store } from '~/lib/store';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// function openDatabase() {
//   if (Platform.OS === 'web') {
//     return {
//       transaction: () => {
//         return {
//           executeSql: () => { },
//         };
//       },
//     };
//   }

//   const db = SQLite.openDatabase('myChequeDatabase.db');
//   return db;
// }

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // useEffect(() => {
  //   const initializeDatabase = () => {
  //     const db = openDatabase();
  //     // Now you can use 'db' for your database operations
  //     // e.g., create tables, insert data, query data, etc.
  //     // Create a table for managing your cheques
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         'CREATE TABLE IF NOT EXISTS cheques (id INTEGER PRIMARY KEY AUTOINCREMENT, customerName TEXT, dueDate TEXT, amount REAL)',
  //         [],
  //         (_, result) => {
  //           console.log('Table created successfully');
  //         }
  //         // (_, error) => {
  //         //   console.log('Error creating table:', error);
  //         //   return false;
  //         // }
  //       );
  //     });
  //     // Insert a new cheque into the database
  //     const insertCheque = (customerName: string, dueDate: string, amount: number) => {
  //       db.transaction((tx) => {
  //         tx.executeSql(
  //           'INSERT INTO cheques (customerName, dueDate, amount) VALUES (?, ?, ?)',
  //           [customerName, dueDate, amount],
  //           (_, result) => {
  //             console.log('Cheque inserted successfully');
  //           },
  //           (_, error) => {
  //             console.log('Error inserting cheque:', error);
  //             return false;
  //           }
  //         );
  //       });
  //     };

  //     // Query all cheques from the database
  //     const getAllCheques = (callback) => {
  //       db.transaction((tx) => {
  //         tx.executeSql(
  //           'SELECT * FROM cheques',
  //           [],
  //           (_, result) => {
  //             callback(result.rows._array);
  //           },
  //           (_, error) => {
  //             console.log('Error retrieving cheques:', error);
  //             return false;
  //           }
  //         );
  //       });
  //     };
  //     // Usage example
  //     insertCheque('Customer A', '2024-02-01', 500.0);

  //     getAllCheques((cheques) => {
  //       console.log('All Cheques:', cheques);
  //     });
  //   };

  //   initializeDatabase();
  // }, []);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* <Stack>
          <Stack.Screen name="(marketing)/index" options={{ headerShown: false }} />
          {/* <Stack.Screen name="home/index" options={{ title: 'Home', headerShadowVisible: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack> */}
        {/* <Stack>
          <Stack.Screen name="(marketing)/index" />
        </Stack> */}
        <Provider store={store}>
          <Slot />
        </Provider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
