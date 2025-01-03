import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect} from 'react';
import Onboarding from './Screens/Onboarding';
import Profile from './Screens/Profile';
import {buscar, armazenar} from "./Database"

const Stack = createNativeStackNavigator();

function LogoTitle() {
    return (
      <Image source={require("./assets/Logo.png")}/>
    );
  }

export default function App() {
  const [login, setLogin] = useState(false)
  useEffect (() => {
      buscar('login').then(res => setLogin(JSON.parse(res)))
  })
  return (
    <NavigationContainer>
      <Stack.Navigator>
          {login ? (
              <Stack.Screen name="Profile" component={Profile}/>
          ) : (
              <Stack.Screen name="Onboarding" component={Onboarding} options={{
                  headerTitle: (props) => <LogoTitle {...props} />,
                  headerTitleAlign: "center",
              }}/>
              )}
      </Stack.Navigator>
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
