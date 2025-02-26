import Profile from '../Screens/Profile';
import Onboarding from '../Screens/Onboarding';
import Splashscreen from '../Screens/Splashscreen';
import { getData } from '../Database/AsyncStorag-Database';
import { UserContext } from '../context/userContext';
import { Image, TouchableOpacity, StyleSheet, View, Text} from "react-native";
import { useEffect, useContext, useState} from 'react';
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
function HeaderProfilePicture({ profilePicture, firstName, lastName }) {
    const navigation = useNavigation();

    // Function to generate a fallback view with initials
    const pictureWithFirstLetter = () => {
        const initials = `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`;
        return (
            <View style={styles.initialsContainer}>
                <Text style={styles.initialsText}>{initials.toUpperCase()}</Text>
            </View>
        );
    };

    return (
        <TouchableOpacity onPressIn={() => navigation.navigate('Profile')}>
            {profilePicture ? (
                <Image 
                    source={{ uri: profilePicture }} 
                    style={styles.profilePicture} 
                />
            ) : (
                pictureWithFirstLetter()
            )}
        </TouchableOpacity>
    );
}

const RootNavigator = () => {
    //Destructuring the userContext
    const {user, updateUser, changeLogin} = useContext(UserContext)
    const [profilePicture, setProfilePicture] = useState(null)
    
    useEffect(() => {
        // calling the getData async method to get verify if the user has logged in previously, this value is stored locally
        // if he has, it will be showed to him the homescreen, 
        // if not will be showed the Onboarding screen
        getData()
            .then((res) => {
                let response = JSON.parse(res)
                if(response != null){
                    updateUser({
                        login: response.login || false,
                        firstName: response.firstName,
                        lastName: response.lastName,
                      });
                      setProfilePicture(response.profilePicture)      
                } else {
                    changeLogin(false)  
                }
            })
            .catch(err => console.error("Erro ao buscar login:", err));

    }, [profilePicture, updateUser]);

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
                        headerRight: (props) => <HeaderProfilePicture profilePicture={profilePicture} lastName={user.lastName} firstName={user.firstName} {...props} />
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

const styles = StyleSheet.create({
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    initialsContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ccc', // Default background color for initials
        justifyContent: 'center',
        alignItems: 'center',
    },
    initialsText: {
        color: '#fff', // Text color
        fontSize: 18,
        fontWeight: 'bold',
    },
});



export default RootNavigator;