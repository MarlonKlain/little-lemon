import {View, Text, Pressable, StyleSheet} from 'react-native';
import { armazenar } from '../Database';
import { useState, useContext } from 'react';
import { LoginContext } from '../context/loginContext';

const Profile = () =>{
    const {changeLogin} = useContext(LoginContext)
    return(
        <View>
            <View>
            <Text>Personal information</Text>
            <Text>Avatar</Text>
            <Text>Foto</Text>
            <Pressable>
                <Text>Change</Text>
            </Pressable>
            <Pressable>
                <Text>Remove</Text>
            </Pressable>
            </View>
            <Pressable style={styles.logOutButton} onPress={() => {armazenar('login', 'false'), changeLogin(false)}}>
                <Text style={styles.logOutButtonText}>
                    Log out
                </Text>
            </Pressable>
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
    }
})
export default Profile;