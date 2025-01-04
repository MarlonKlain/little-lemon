import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../Screens/Onboarding';
import Profile from '../Screens/Profile';
import {buscar } from '../Database';
import {StyleSheet, Image, } from "react-native";
import { useEffect, useContext} from 'react';
import { LoginContext } from '../context/loginContext';
import Splashscreen from '../Screens/Splashscreen';

const Stack = createNativeStackNavigator();

function LogoTitle() {
    return (
      <Image source={require('../assets/Logo.png')}/>
    );
  }

const RootNavigator = () => {
    const {login, changeLogin} = useContext(LoginContext)
    // const [login, setLogin] = useState(null); // Inicializado como null
    useEffect(() => {
        buscar('login')
            .then(res => changeLogin(res ? JSON.parse(res) : false)) // Corrige o estado inicial
            .catch(err => console.error("Erro ao buscar login:", err));
    }); // Apenas uma execução inicial

    if (login === null) {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Splashscreen" component={Splashscreen}/>
            </Stack.Navigator>
        ); // Tela de carregamento ou retorno vazio enquanto o estado é carregado
    }

    return (
        <Stack.Navigator>
            {login ? (
                <Stack.Screen name="Profile" component={Profile} />
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