import React, {useEffect, useState} from 'react';
import { TextInput, View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import { armazenar } from '../Database';

const Onboarding = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    useEffect(() => {
        
    })
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
            <Pressable style={styles.nextButton} onPress={() => validateInfos(name, email)} >
                <Text style={styles.nextButtonText}>Next</Text>
            </Pressable>
        </View>
        </>
    );
}

function validateInfos(name, email){
    const validate = /\d/;
    if(name == "" || email == ""){
        return Alert.alert("Please, fullfill all the fields.");
    } else if (validate.test(name)){
        return Alert.alert(`The 'First Name' field can only contain letters`)
    } else {
        armazenar('login','true')
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