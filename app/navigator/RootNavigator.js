import Profile from '../Screens/Profile';
import Onboarding from '../Screens/Onboarding';
import Splashscreen from '../Screens/Splashscreen';
import { getData } from '../Database/AsyncStorag-Database';
import { UserContext } from '../context/userContext';
import { Image, TouchableOpacity } from "react-native";
import { useEffect, useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from '../Screens/Homescreen';
import { useNavigation } from '@react-navigation/native';

// creating a stack navigator instance
const Stack = createNativeStackNavigator();

// The logo that is being shown in the header.
function LogoTitle() {
    return (
      <Image source={require('../assets/Logo.png')}/>
    );
  }

// the user's profile picture that will be showed in the header and can be touched and drive the user to profile screen
function HeaderProfilePicture (){
    //calling the useNavigation hook to gain acess to the navigation object
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
    //Destructuring the userContext
    const {user, changeLogin} = useContext(UserContext)
    
    useEffect(() => {
        // calling the getData async method to get verify if the user has logged in previously, this value is stored locally
        // if he has, it will be showed to him the homescreen, 
        // if not will be showed the Onboarding screen
        getData()
            .then((res) => {
                changeLogin(res ? JSON.parse(res) : false
            )})
            .catch(err => console.error("Erro ao buscar login:", err));

    }, []);

    // while the login validation is not complete, will be showed the splashscreen
    if (user.login === null) {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Splashscreen" component={Splashscreen}/>
            </Stack.Navigator>
        ); // Tela de carregamento ou retorno vazio enquanto o estado é carregado
    }
    return (
        <Stack.Navigator>
            {/* Checking the login value */}
            {user.login ? (
                <>
                <Stack.Screen name="Homescreen" component={Homescreen} 
                    options={() => ({
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

export default RootNavigator;