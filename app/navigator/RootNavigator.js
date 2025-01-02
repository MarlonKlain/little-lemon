import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../Screens/Onboarding';
import {StyleSheet, Image}from "react-native";

const Stack = createNativeStackNavigator();

function LogoTitle() {
    return (
      <Image source={require('../assets/Logo.png')}/>
    );
  }

const RootNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Homescreen">
            <Stack.Screen name="Homescreen" component={Onboarding} options={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerTitleAlign: "center",
        }}/>
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