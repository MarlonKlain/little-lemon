import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import UserContext from './context/userContext';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from './Database/SQLite-CRUD';

export default function App() {
  return (
    // Wrapping all the navigation inside the SQLProvider, so all the children components can have acess to database. 
    // All descendants of this component will be able to access the database using the useSQLiteContext hook.
    <SQLiteProvider databaseName='little-lemon.db' onInit={initializeDatabase}>
      {/* Is responsible for managing app's navigation */}
      <NavigationContainer>
        {/* Provides acess to the Context to all children componentes*/}
          <UserContext>
            {/* The navigation */}
            <RootNavigator />
          </UserContext>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
