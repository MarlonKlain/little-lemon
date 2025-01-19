import { useEffect, useState } from 'react';
import {View, Text, Pressable, StyleSheet, FlatList, Image, Button, Alert, TextInput} from 'react-native';
import	AntDesign from '@expo/vector-icons/AntDesign'
import { useProductDatabase } from '../Database/useProductDatabase';

const Homescreen = () => {
    const [data, setData] = useState([])
    const [category, setCategory] = useState([])
    const [search, setSearch] =useState(null)
    const productDatabase = useProductDatabase()

    async function deleteData() {
        await productDatabase.deleteAllData()
    }
    async function addNewcolumn() {
        await productDatabase.alterTable()
        const responseDatabase = await productDatabase.getDataDb()
        console.log(responseDatabase);   
    }

    async function getDataFromAPI() {
        const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
        let responseAPI = {}

        await fetch(API_URL)
        .then((response) => response.json())
        .then((responseJson) => responseAPI = responseJson.menu)
        return responseAPI
    }
    
    async function checkDatabase() {
        const responseDatabase = await productDatabase.getDataDb()
        if(responseDatabase == ""){
            try {
                let responseAPI = await getDataFromAPI()
                for (let index = 0; index < responseAPI.length; index++) {
                    create(responseAPI[index].name, responseAPI[index].description, responseAPI[index].price, responseAPI[index].category, responseAPI[index].image)
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setData(responseDatabase)
            filterDuplicateCategory(responseDatabase)
        }
        
    }
    async function create(itemName, description, price, category, image) {
        try {
            const response = await productDatabase.setDataDB(itemName, description, price, category, image)
            Alert.alert("Linha "+response.insertedRowId+" criada")
        } catch (error) {
            console.log("create: ", error);
            
        }
    }

    // async function showDbData() {
    //     try {
    //         const response = await productDatabase.getDataDb()
    //         console.log(response);
    //     } catch (error) {
    //         console.log(error);
            
    //     }
    // }

    async function listSearch(name) {
        try {
            const response = await productDatabase.searchByName(name)
            setData(response)
        } catch (error) {
            console.log("listSearch: ", error);
            
        }
    }

    function capitalizeFirstLetter(word) {
        const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
        return capitalized
    }
    async function filterDishes(category, itemName) {
        try {
            const response = await productDatabase.filter(category, itemName)            
            setData(response)
        } catch (error) {
            console.log("FilterDishes: ", error);
            
        }
    }
    useEffect(() => {
        checkDatabase()

    }, [])

    useEffect(() => {
        listSearch(search)
    }, [search])

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

    const localImages = {
        "greekSalad.jpg": require("../assets/greekSalad.jpg"),
        "bruschetta.jpg": require("../assets/bruschetta.jpg"),
        "grilledFish.jpg": require("../assets/grilledFish.jpg"),
        "pasta.jpg": require("../assets/pasta.jpg"),
        "lemonDessert.jpg": require("../assets/lemonDessert.jpg"),
    };

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
            <View style={heroSection.searchContainer}>
                <View style={heroSection.searchInputContainer}>
                    <AntDesign 
                        name='search1' 
                        style={heroSection.searchIcon} 
                    />
                    <TextInput 
                        style={heroSection.searchInput} 
                        placeholder="Search"
                        placeholderTextColor="#8E8E93"
                        onChangeText={setSearch} 
                    />
                </View>
            </View>
        </View>
        <View style={{backgroundColor:"#FFFFFF"}}>
            <FlatList
            data={category}
            horizontal={true}
            renderItem={({item}) => (
                <Pressable onPress={() => filterDishes(item, search)}>
                    <View>
                        <Text style={menuItens.category}>{capitalizeFirstLetter(item)}</Text>
                    </View>
                </Pressable>
            )} 
            keyExtractor={(item) => item}/>
        </View>
        <View style={{flex:1, backgroundColor: "#FFFFFF"}}>
            <FlatList
                data={data}
                contentContainerStyle={{ paddingBottom: 20 }} // Espaço extra para evitar corte no final
                ItemSeparatorComponent={<View style={menuItens.separator} />}
                renderItem={({ item }) => (
                    <View style={menuItens.cardContainer}>
                        <View style={menuItens.textContainer}>
                            <Text style={menuItens.title}>{item.itemName}</Text>
                            <Text style={menuItens.description}>{item.description}</Text>
                            <Text style={menuItens.price}>{"$" + item.price}</Text>
                        </View>
                        <Image source={localImages[item.image]} style={menuItens.photoItem} />
                    </View>
                )}
                keyExtractor={(item) => item.id}
            /> 
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
        width:254

    },
    city:{
        fontSize: 56,
        color: 'white',
        width:190
    },
    apresentation:{
        fontSize: 18,
        color: 'white',
        width:200
    },
    image:{
        width:135,
        height:160,
        borderRadius:16,
        alignSelf:"center"

    },
    alignImage:{
        flexDirection:'row',

    },
    searchContainer: {
        marginTop:20,
        marginBottom:20,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#E4E4E4",
        borderRadius: 8,
        height: 50,
        paddingHorizontal: 10, // Espaçamento interno
    },
    searchIcon: {
        marginRight: 10, // Espaçamento entre o ícone e o campo de texto
        fontSize: 20,
        color: "#495E57",
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: "#000",
    },
})

const menuItens = StyleSheet.create ({
    category: {
        backgroundColor: '#E4E4E4',
        fontSize:25,
        margin:20,
        textAlign:'center',
        borderRadius:20,
        padding:10,
        paddingBottom:12,
        color:'#465B54'
    },
    cardContainer: {
        flexDirection: 'row', // Layout em linha
        justifyContent: 'space-between', // Imagem à direita
        alignItems: 'center', // Centraliza verticalmente
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
    },
    textContainer: {
        flex: 1, // Garante que o texto ocupe o espaço restante
        marginRight: 10, // Espaçamento entre texto e imagem
    },
    photoItem: {
        width: 70,
        height: 70,
        borderRadius: 8,
    },
    separator: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color:"#495E57"
    },

})


export default Homescreen;