//The screen that contains all the user's information
import {View, Text, Pressable, StyleSheet, TextInput, Image, ScrollView} from 'react-native';
import { storeData, clearAll, getData} from '../Database/AsyncStorag-Database';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import Checkbox from 'expo-checkbox';
import { MaskedTextInput } from 'react-native-mask-text';
import * as ImagePicker from 'expo-image-picker';

const Profile = () =>{
    const {user, changeLogin} = useContext(UserContext)
    const [cbOrderStatus, setOrderStatus] = useState(false)
    const [cbPasswordChanges, setPasswordChanges] = useState(false)
    const [cbSpecialOffers, setSpecialOffers] = useState(false)
    const [cbNewsletter, setNewsletter] = useState(false)
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState(null)
    const [lastName, setLastName] = useState('')
    const [userObject, setUserObject] = useState({})
    
    //Defining how some properties of the image that the user will choose from his galery
    async function handleImagePicker() {
        const result = await ImagePicker.launchImageLibraryAsync ({
            aspect:[4,4],
            allowsEditing: true,
            base64:true,
            quality:1
        })

        //If the user cancels the process of choosing a picture from his galery
        if(!result.canceled){
            console.log(setImage(result.assets[0].uri))
        }
    }

    //Verifng if the user fullfilled the last name field,
    //if yes, the first letter of his last name will be showed together
    //with the first letter of his first name 
    //as his profile picture
    function verifyLastName () {
        if (lastName != null) {
            return lastName.charAt(0)
        } else {
            return ""
        }
    }

    //Verifying if the user has uploaded a picture from his galery, 
    //if not, a picture with the first letter of his first and last name will be showed as profile picture
    const verifyImage = () => {
        if(image == null){
            return false
        } else {
            return true
        }
    }

    //validating if the user fulfilled all the field that are required of his profile
    const validateInfo = (argProfilePic, argName, argEmail, argLogin, argLastName, argPhone, argCbOrderStatus, argCbPasswordChanges, argCbSpecialOffers, argCbNewsletter ) => {
        if ( argLastName != null && argPhone != null){
            storeData({
                    profilePicture: argProfilePic,
                    firstName: argName,
                    email: argEmail,
                    login: argLogin,
                    lastName: argLastName,
                    phone: argPhone,
                    bdCbOrderStatus: argCbOrderStatus,
                    bdCbPasswordChanges: argCbPasswordChanges,
                    bdCbSpecialOffers: argCbSpecialOffers,
                    bdCbNewsletter: argCbNewsletter
            })
            console.log("Informações salvas com sucesso!")
        }
    }
    //getting all the user's information if he has informed previously
    useEffect(() => {
            getData()
                .then(function (res) {
                    setUserObject(JSON.parse(res))
                    const objectTest = JSON.parse(res)
                    updateUser({
                        firstName: objectTest.firstName,
                        lastName: objectTest.email,
                      });

                    setLastName(objectTest.lastName)
                    setPhone(objectTest.phone)
                    setOrderStatus(objectTest.bdCbOrderStatus)
                    setPasswordChanges(objectTest.bdCbPasswordChanges)
                    setSpecialOffers(objectTest.bdCbSpecialOffers)
                    setNewsletter(objectTest.bdCbNewsletter)
                    setImage(objectTest.profilePicture)
                })
                .catch(err => console.error("Erro ao buscar login:", err))
                .finally()
            }, []);
    
    return(
        <ScrollView style={styles.container}>
                <Text style={styles.screenTitle}>Personal Information</Text>
                <Text style={styles.avatarText}>Avatar</Text>
            <View style={styles.header}>
                {verifyImage() ? (
                    <Image style={styles.userPhoto} source={{uri:image}} />
                ) : (
                    <Text style={styles.noPhoto}>{user.firstName != null ? user.firstName.charAt(0).concat(verifyLastName()) : console.log("vazia")}</Text>
                )}
                <Pressable
                    onPress={() => handleImagePicker()}
                    style={styles.changePhotoButton}>
                    <Text style={styles.changePhotoButtonText}>Change</Text>
                </Pressable>
                <Pressable
                onPress={() => setImage(undefined)} 
                style={styles.removePhotoButton}>
                    <Text style={styles.removePhotoButtonText}>Remove</Text>
                </Pressable>
            </View>
            {/* Middle content */}
            <View style={styles.middleContent}>
                <Text style={styles.inputText}>First name</Text>
                <TextInput style={styles.userInput} value={user.firstName} editable={false}></TextInput>
                <Text style={styles.inputText}>Last name</Text>
                <TextInput style={styles.userInput} value={lastName} onChangeText={setLastName}></TextInput>
                <Text style={styles.inputText}>Email</Text>
                <TextInput style={styles.userInput} value={user.email} editable={false}></TextInput>
                <Text style={styles.inputText}>Phone</Text>
                {/* Mask for when the user fulfill the phone number */}
                <MaskedTextInput
                    mask='(999) 999-999'
                    value={phone}
                    onChangeText= {(text) => setPhone(text)}
                    style={styles.userInput}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.notification}>
                <Checkbox 
                    value={cbOrderStatus}
                    onValueChange={setOrderStatus}
                    color={cbOrderStatus? "#495E57" : undefined}
                />
                <Text style={styles.notificationsText}>Order Status</Text>
            </View>
            <View style={styles.notification}>
                <Checkbox 
                    value={cbPasswordChanges}
                    onValueChange={setPasswordChanges}
                    color={cbPasswordChanges? "#495E57" : undefined}
                />
                <Text style={styles.notificationsText}>Password changes</Text>
            </View>
            <View style={styles.notification}>
                <Checkbox 
                value={cbSpecialOffers}
                onValueChange={setSpecialOffers}
                color={cbSpecialOffers? "#495E57" : undefined}
                />
                <Text style={styles.notificationsText}>Special offers</Text>
            </View>
            <View style={styles.notification}>
                <Checkbox 
                    value={cbNewsletter}
                    onValueChange={setNewsletter}
                    color={cbNewsletter? "#495E57" : undefined}
                />
                <Text style={styles.notificationsText}>Newsletter</Text>
            </View>
            <Pressable style={styles.logOutButton} onPress={() => {clearAll(), changeLogin(false)}}>
                <Text style={styles.logOutButtonText}>
                    Log out
                </Text>
            </Pressable>
            <View style={styles.bottom}>
                <Pressable style={styles.discardButton}>
                    <Text style={styles.discardButtonText} onPress={() => console.log(userObject)}>Discard changes</Text>
                </Pressable>
                <Pressable style={styles.saveButton}>
                    <Text style={styles.saveButtonText} onPress={() => validateInfo(image, user.firstName, user.email, user.login, lastName, phone, cbOrderStatus, cbPasswordChanges, cbSpecialOffers, cbNewsletter)}>Save changes</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        flex:1,
        paddingLeft:20
    },
    screenTitle:{
        fontSize:25,
        marginTop:10,
        marginBottom:15

    },
    header:{
        flexDirection: 'row',
        borderColor: "black",
        alignItems:'center',
        },

    changePhotoButton:{
        width:100,
        height:50,
        backgroundColor: "#495E57",
        borderRadius: 8,
        margin:5,
        justifyContent:'center',

    },
    changePhotoButtonText:{
        textAlign:'center',
        color:"white",
    },
    removePhotoButton:{
        width:100,
        height:50,
        backgroundColor: "white",
        borderColor: "#495E57",
        borderWidth:1,
        margin:5,
        marginLeft:10,
        justifyContent:'center',

    },
    removePhotoButtonText:{
        textAlign:'center',
    },
    avatarText:{
        marginBottom:5
    },
    userPhoto: {
        height: 100,
        width:100,
        marginRight:10,
        marginBottom:10,
        borderRadius:50

    },
    noPhoto:{
        fontSize:40,
        color:"white",
        height: 100,
        width:100,
        borderColor: "black",
        marginRight:10,
        marginBottom:10,
        borderRadius:50,
        backgroundColor:"grey",
        textAlign:"center",
        textAlignVertical:'center'
    },
    inputText:{
        marginBottom:5
    },
    userInput: {
        borderWidth:1,
        borderColor:"black",
        maxWidth: 350,
        height:40,
        marginBottom:20,
        borderRadius: 8
    },
    notification:{
        flexDirection: 'row',
        alignItems: 'center',
        margin:5
    },
    notificationsText:{
        marginLeft:5,
        fontSize:15,
    },
    logOutButton:{
        width:345,
        height:45,
        justifyContent:'center',
        borderRadius:8,
        backgroundColor: "#F4CE14",
        marginTop:30
    },
    logOutButtonText:{
        fontSize:20,
        textAlign:'center'
    },
    bottom:{
        flexDirection: 'row',
        marginTop:20,
        marginBottom:20,
        paddingLeft:15
    },
    discardButton:{
        width:150,
        height:50,
        backgroundColor: "#495E57",
        borderRadius: 8,
        justifyContent:'center',

    },
    discardButtonText:{
        textAlign:'center',
        color:"white",
    },
    saveButton:{
        width:150,
        height:50,
        backgroundColor: "white",
        borderColor: "#495E57",
        borderWidth:1,
        justifyContent:'center',
        borderRadius:8,
        marginLeft:20

    },
    saveButtonText:{
        textAlign:'center'
    }
})
export default Profile;