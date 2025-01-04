import React, {useEffect, useState, useContext} from 'react';
import { TextInput, View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import { armazenar } from '../Database';
import { LoginContext } from '../context/loginContext';

const Onboarding = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const {changeLogin} = useContext(LoginContext)

    return (
        <>
        <View style={styles.container}>
            <Text style={styles.textInput}>First Name</Text>
            <TextInput style={styles.userInput} 
            value={name} 
            onChangeText={setName}/>
            <Text style={styles.textInput}>Email</Text>
            <TextInput style={styles.userInput}
            value={email}
            onChangeText={setEmail}/>
        </View>
        <View style={styles.bottom}>
            <Pressable style={styles.nextButton} onPress={() => validateInfos(name, email) ? changeLogin(true): Alert.alert("ERRO")} >
                <Text style={styles.nextButtonText}>Next</Text>
            </Pressable>
        </View>
        </>
    );
}

function validateInfos(name, email){
    const validate = /\d/;
    if(name == "" || email == ""){
        Alert.alert("Please, fullfill all the fields.");
        return false
        
    } else if (validate.test(name)){
        Alert.alert(`The 'First Name' field can only contain letters`)
        return false
    } else {
        armazenar('login','true')
        return true
        
    }
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