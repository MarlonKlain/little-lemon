import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserContext from './context/userContext';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from './Database/SQLite-CRUD';

const Stack = createNativeStackNavigator();

function LogoTitle() {
    return (
      <Image source={require("./assets/Logo.png")}/>
    );
  }

export default function App() {
  return (
    <SQLiteProvider databaseName='little-lemon.db' onInit={initializeDatabase}>
      <NavigationContainer>
          <UserContext>
            <RootNavigator />
          </UserContext>
      </NavigationContainer>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
