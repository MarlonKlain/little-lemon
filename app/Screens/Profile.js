import {View, Text, Pressable, StyleSheet} from 'react-native';
import { armazenar } from '../Database';

const Profile = () =>{
    return(
        <View>
            <Text>Profile page</Text>
            <Pressable style={styles.logOutButton} onPress={() => armazenar('login', 'false')}>
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