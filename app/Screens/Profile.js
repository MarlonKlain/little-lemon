import {View, Text, Pressable, StyleSheet, TextInput} from 'react-native';
import { armazenar } from '../Database';
import { useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import Checkbox from 'expo-checkbox';
import { MaskedTextInput } from 'react-native-mask-text';

const Profile = () =>{
    const {user, changeLogin, changePhoneNumber} = useContext(UserContext)
    const [checkBox, setCheck] = useState(false)
    const [phone, setPhone] = useState('')
    return(
        // Biggest container
        <View>
            {/* Header content */}
            <View>
                <Text>Personal Information</Text>
                <Text>Avatar</Text>
                {/* Avatar photo */}
                <Pressable>
                    <Text>Change</Text>
                </Pressable>
                <Pressable>
                    <Text>Remove</Text>
                </Pressable>
            </View>
            {/* Middle content */}
            <View>
                <Text>First name</Text>
                <TextInput style={styles.userInput}></TextInput>
                <Text>Last name</Text>
                <TextInput style={styles.userInput}></TextInput>
                <Text>Email</Text>
                <TextInput style={styles.userInput}></TextInput>
                <Text>Phone</Text>
                <MaskedTextInput
                    mask='(999) 999-999'
                    value={phone}
                    onChangeText= {(text) => setPhone(text)}
                    style={styles.userInput}
                    keyboardType='numeric'
                />
            </View>
            {/* Notification content */}
            <View style={styles.notification}>
                <Checkbox 
                    value={checkBox}
                    onValueChange={setCheck}
                    color={checkBox? "green" : undefined}
                />
                <Text>Order Status</Text>
            </View>
            <View style={styles.notification}>
                <Checkbox 
                    value={checkBox}
                    onValueChange={setCheck}
                    color={checkBox? "green" : undefined}
                />
                <Text>Password changes</Text>
            </View>
            <View style={styles.notification}>
                <Checkbox 
                value={checkBox}
                onValueChange={setCheck}
                color={checkBox? "green" : undefined}
                />
                <Text>Special offers</Text>
            </View>
            <View style={styles.notification}>
                <Checkbox 
                    value={checkBox}
                    onValueChange={setCheck}
                    color={checkBox? "green" : undefined}
                />
                <Text>Newsletter</Text>
            </View>
            <Pressable style={styles.logOutButton} onPress={() => {armazenar('login', 'false'), changeLogin(false)}}>
                <Text style={styles.logOutButtonText}>
                    Log out
                </Text>
            </Pressable>
            <View>
                <Pressable>
                    <Text>Discard changes</Text>
                </Pressable>
                <Pressable>
                    <Text>Save changes</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    logOutButton:{
        backgroundColor:"#CBD2D9",
        width:100,
        height:50,
        borderRadius:8,
        justifyContent:"center"
    },
    logOutButtonText:{
        fontSize:25,
        textAlign:"center",
        alignSelf:"center",
    },
    userInput: {
        borderWidth:1,
        borderColor:"black",
        width:250,
        height:40,
        marginBottom:30,
        borderRadius: 8
    },
    notification:{
        flexDirection: 'row',
        alignItems: 'center',
    }
})
export default Profile;