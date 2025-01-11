import {View, Text, Pressable, StyleSheet, TextInput, Image, ScrollView} from 'react-native';
import { storeData, clearAll, getData, mergeData} from '../Database';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import Checkbox from 'expo-checkbox';
import { MaskedTextInput } from 'react-native-mask-text';
import * as ImagePicker from 'expo-image-picker';

const Profile = () =>{
    const {oldState, changeLogin, changeFirstName, changeLastName, changePhone, changeEmail} = useContext(UserContext)
    const [cbOrderStatus, setOrderStatus] = useState(false)
    const [cbPasswordChanges, setPasswordChanges] = useState(false)
    const [cbSpecialOffers, setSpecialOffers] = useState(false)
    const [cbNewsletter, setNewsletter] = useState(false)
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState(null)
    const [lastName, setLastName] = useState('')
    const [profilePicLetter , setProfilePicLetter] = useState()
    const [userObject, setUserObject] = useState({})

    function teste () {
        if(oldState.firstName == null){
            console.log("Vazio");
        } else {
            console.log("Não vazio")
        }
    }
    
    async function handleImagePicker() {
        const result = await ImagePicker.launchImageLibraryAsync ({
            aspect:[4,4],
            allowsEditing: true,
            base64:true,
            quality:1
        })

        if(!result.canceled){
            console.log(setImage(result.assets[0].uri))
        }
    }

    function verifyLastName () {
        if (lastName != null) {
            return lastName.charAt(0)
        } else {
            return ""
        }
    }

    const verifyImage = () => {
        if(image == null){
            return false
        } else {
            return true
        }
    }

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

    useEffect(() => {
            getData()
                .then(function (res) {
                    setUserObject(JSON.parse(res))
                    const objectTest = JSON.parse(res)
                    changeFirstName(objectTest.firstName)
                    setLastName(objectTest.lastName)
                    changeEmail(objectTest.email)
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
        // Biggest container
        <ScrollView style={styles.container}>
            {/* Header content */}
                <Text style={styles.screenTitle}>Personal Information</Text>
                <Text style={styles.avatarText}>Avatar</Text>
            <View style={styles.header}>
                {verifyImage() ? (
                    <Image style={styles.userPhoto} source={{uri:image}} />
                ) : (
                    <Text style={styles.noPhoto}>{oldState.firstName != null ? oldState.firstName.charAt(0).concat(verifyLastName()) : console.log("vazia")}</Text>
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
                <TextInput style={styles.userInput} value={oldState.firstName} editable={false}></TextInput>
                <Text style={styles.inputText}>Last name</Text>
                <TextInput style={styles.userInput} value={lastName} onChangeText={setLastName}></TextInput>
                <Text style={styles.inputText}>Email</Text>
                <TextInput style={styles.userInput} value={oldState.email} editable={false}></TextInput>
                <Text style={styles.inputText}>Phone</Text>
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
                    <Text style={styles.saveButtonText} onPress={() => validateInfo(image, oldState.firstName, oldState.email, oldState.login, lastName, phone, cbOrderStatus, cbPasswordChanges, cbSpecialOffers, cbNewsletter)}>Save changes</Text>
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
        // marginLeft:5
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