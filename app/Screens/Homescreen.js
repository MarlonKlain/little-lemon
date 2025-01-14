import { useEffect, useState } from 'react';
import {View, Text, Pressable, StyleSheet, FlatList, ScrollView, Image, Button} from 'react-native';
import	AntDesign from '@expo/vector-icons/AntDesign'

const Homescreen = () => {
    const [data, setData] = useState([])
    const [category, setCategory] = useState([])
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
        .then((response) => response.json())
        .then((dataResponse) => {
            setData(dataResponse.menu)
            filterDuplicateCategory(dataResponse.menu);
        })
    }, [])
    function showData(){
        console.log(data);
    }
    function filterDuplicateCategory (object) {
        const element = []
        for (let index = 0; index < object.length; index++) {
            if(element.indexOf(object[index].category) == -1){
                element.push(object[index].category)
            }     
        }
        setCategory(element)
    }

    function menuItemPhotoPath (item) {
        const path = `../assets/${item}`
        return path
    }
    return(
    <View style={body.container}>
        <View style={heroSection.container}>
            <Text style={heroSection.title}>Little Lemon</Text>
            <View style={heroSection.alignImage}>
                <View>
                    <Text style={heroSection.city}>Chicago</Text>
                    <Text style={heroSection.apresentation}>We are a family ownedMediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                </View>
                    <Image style={heroSection.image} source={require('../assets/Hero image.png')}/>
            </View>
            <View style={heroSection.searchIcon}>
                <AntDesign name='search1' 
                backgroundColor="#E4E4E4" 
                size={20}
                margin={10}
                color={"black"}
                />
            </View>
            {/* <Button onPress={filterDuplicateCategory} title={'ShowLog'}/> */}
        </View>
        <View>
            <FlatList
            data={category}
            horizontal={true}
            renderItem={({item}) => (
                <View>
                    <Text style={menuItens.item}>{item}</Text>
                </View>
            )} 
            keyExtractor={(item) => item}/>
        </View>
        <View>
            <FlatList
            data={data}
            ItemSeparatorComponent={<View style={menuItens.separator} />}
            renderItem={({item}) => (
            <View>
                <View>
                    <Text style={menuItens.title}>{item.name}</Text>
                    <Text style={menuItens.description}>{item.description}</Text>
                    <Text style={menuItens.price}>{item.price}</Text>
                </View>
                    <Image source={"../assets/"+item.image} style={menuItens.photoItem} />
            </View>

            )} 
            keyExtractor={(item) => item.name}/>
        </View>
    </View>
    );
}
const body = StyleSheet.create({
    container:{
        flex:1
    }
})
const heroSection = StyleSheet.create ({
    container: {
        backgroundColor:"#495E57",
        paddingLeft:20,
        paddingRight:20,
    },
    title:{
        fontSize: 50,
        color: '#F4CE14',
        fontWeight: "bold",
        // backgroundColor:"grey",
        width:254

    },
    city:{
        fontSize: 56,
        color: 'white',
        // backgroundColor:"grey",
        width:190
    },
    apresentation:{
        fontSize: 18,
        color: 'white',
        // backgroundColor:"grey",
        width:200
    },
    image:{
        width:135,
        height:160,
        borderRadius:16,
        justifyContent:'center',
        alignSelf:"center"
    },
    alignImage:{
        flexDirection:'row',
        // backgroundColor:"grey",

    },
    searchIcon:{
        width:40,
        backgroundColor:"#E4E4E4",
        justifyContent:"center",
        borderRadius:20,
        marginTop:10,
        marginBottom:10
    }
})

const menuItens = StyleSheet.create ({
    item: {
        backgroundColor: '#E4E4E4',
        fontSize:30,
        margin:20,
        textAlign:'center',
        borderRadius:20,
        padding:10,
        paddingBottom:12,
        color:'#465B54'
    },
    separator: {
        height:1, 
        backgroundColor:"black",
        marginTop:20,
        marginBottom:20
    },
    photoItem:{
        width:100,
        height:70,
        borderRadius:16,
        justifyContent:'center',
        alignSelf:"center"
    }
})
export default Homescreen;