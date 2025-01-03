import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../Screens/Onboarding';
import Profile from '../Screens/Profile';
import {buscar } from '../Database';
import {StyleSheet, Image, Alert} from "react-native";
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

function LogoTitle() {
    return (
      <Image source={require('../assets/Logo.png')}/>
    );
  }

const RootNavigator = () => {
    const [login, setLogin] = useState(false)
    useEffect (() => {
        buscar('login').then(res => setLogin(JSON.parse(res)))
    })
    return (
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
    );
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignContent:"center"
    },
    headerText:{
        fontSize:20,
    }
})
export default RootNavigator;