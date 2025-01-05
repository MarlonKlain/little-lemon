import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserContext from './context/userContext';


const Stack = createNativeStackNavigator();

function LogoTitle() {
    return (
      <Image source={require("./assets/Logo.png")}/>
    );
  }

export default function App() {
  return (
  <NavigationContainer>
    <UserContext>
      <RootNavigator />
    </UserContext>
  </NavigationContainer>
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
