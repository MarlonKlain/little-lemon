import Profile from '../Screens/Profile';
import Onboarding from '../Screens/Onboarding';
import Splashscreen from '../Screens/Splashscreen';
import { getData, mergeData } from '../Database/Database';
import { UserContext } from '../context/userContext';
import { StyleSheet, Image, Pressable, TouchableOpacity } from "react-native";
import { useEffect, useContext, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from '../Screens/Homescreen';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function LogoTitle() {
    return (
      <Image source={require('../assets/Logo.png')}/>
    );
  }

    function HeaderProfilePicture (){
        const navigation = useNavigation()
        return (
            <TouchableOpacity onPressIn={() => navigation.navigate('Profile')}>
                <Image 
                    source={require('../assets/Profile.png')} 
                    style={{ width: 50, height: 50, borderRadius: 25 }} 
                />
            </TouchableOpacity>
        )
}

const RootNavigator = () => {
    const {oldState, changeLogin} = useContext(UserContext)
    
    useEffect(() => {
        

        getData()
            .then((res) => {
                changeLogin(res ? JSON.parse(res) : false
            )})
            .catch(err => console.error("Erro ao buscar login:", err));

    }, []); // Apenas uma execução inicial

    if (oldState.login === null) {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Splashscreen" component={Splashscreen}/>
            </Stack.Navigator>
        ); // Tela de carregamento ou retorno vazio enquanto o estado é carregado
    }
    return (
        <Stack.Navigator>
            {oldState.login ? (
                <>
                <Stack.Screen name="Homescreen" component={Homescreen} 
                    options={({navigation}) => ({
                        headerRight: (props) => <HeaderProfilePicture {...props} />
                    })}/>
                <Stack.Screen name="Profile" component={Profile} />
                </>
            ) : (
                <Stack.Screen
                    name="Onboarding"
                    component={Onboarding}
                    options={{
                        headerTitle: (props) => <LogoTitle {...props} />,
                        headerTitleAlign: "center",
                    }}
                />
            )}
        </Stack.Navigator>
    );
};

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