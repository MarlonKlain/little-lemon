import React, {useState, useContext} from 'react';
import { TextInput, View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import {storeData } from '../Database/AsyncStorag-Database';
import { UserContext} from '../context/userContext';

const Onboarding = () => {
    //Receives the first Name
    const [firstName, setFirstName] = useState(null);
    //Receives the user's email
    const [email, setEmail] = useState(null);
    //Destructuring the userContext
    const {changeLogin, changeFirstName, changeEmail} = useContext(UserContext)

    //validate the information provides by user
    function validateUserInfo(name, email){
        //  creating a regular expression (RegExp). The \d is a shorthand character class in regular expressions that matches any digit (0-9).
        const validate = /\d/;        
        //if the first name or email was not fullfilled, a alert will be show to the user
        if(name == "" || email == ""){
            Alert.alert("Please, fullfill all the fields.");
            //validating if there is any number inside the first name input
        } else if (validate.test(name)){
            Alert.alert(`The 'First Name' field can only contain letters`)
        } else {
        
        // If the user's personal information pass tha validation, it will create a object with the personal information 
            const createObject = (argName, argEmail, argLogin, argLastName, argPhone, argCbOrderStatus, argCbPasswordChanges, argCbSpecialOffers, argCbNewsletter ) => ({
                firstName: argName,
                email: argEmail,
                login: argLogin,
                lastName: argLastName,
                phone: argPhone,
                bdCbOrderStatus: argCbOrderStatus,
                bdCbPasswordChanges: argCbPasswordChanges,
                bdCbSpecialOffers: argCbSpecialOffers,
                bdCbNewsletter: argCbNewsletter,
            });
            // Here it is only passing three arguments and they will be stored locally
            const loginObject = createObject(name, email, true)
            // Storing locally
            storeData(loginObject)
            // Changing the state of user's login to true, after he finalized the login. It will triggered the change in RootNavigator and change the screen.
            changeLogin(true)
            // storing the first name and email inside the user context so they can be use inside the profile screen.
            changeFirstName(name)
            changeEmail(email)
        }
    }

    return (
        <>
        <View style={styles.container}>
            <Text style={styles.textInput}>First Name</Text>
            <TextInput style={styles.userInput} 
            value={firstName} 
            onChangeText={setFirstName}/>
            <Text style={styles.textInput}>Email</Text>
            <TextInput style={styles.userInput}
            value={email}
            onChangeText={setEmail}/>
        </View>
        <View style={styles.bottom}>
            <Pressable style={styles.nextButton} onPress={() => validateUserInfo(firstName, email)} >
                <Text style={styles.nextButtonText}>Next</Text>
            </Pressable>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:0.80,
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        backgroundColor:"#CBD2D9"
      },
    userInput: {
        borderWidth:1,
        borderColor:"black",
        width:250,
        height:50,
        marginBottom:30,
        borderRadius: 8
      },
    textInput:{
        width:250,
        height:30,
        textAlign:"center",
        fontSize:25,
        marginBottom:20,
        fontWeight:"bold"
    },
    bottom:{
        flex:0.20,
        direction: "rtl",
        justifyContent:"center",
        paddingRight:20,
        backgroundColor:"#F1F4F7",
    },
    nextButton:{
        backgroundColor:"#CBD2D9",
        width:100,
        height:50,
        borderRadius:8,
        justifyContent:"center"
    },
    nextButtonText:{
        fontSize:25,
        textAlign:"center",
        alignSelf:"center",
    }
});
export default Onboarding;