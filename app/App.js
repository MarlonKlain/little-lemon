import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginProvider from './context/loginContext';


const Stack = createNativeStackNavigator();

function LogoTitle() {
    return (
      <Image source={require("./assets/Logo.png")}/>
    );
  }

export default function App() {
  return (
  <NavigationContainer>
    <LoginProvider>
      <RootNavigator />
    </LoginProvider>
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
