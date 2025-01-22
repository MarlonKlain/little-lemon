// All the methods responsible for manipaluting the locally data, using AsyncStorage 
import AsyncStorage from "@react-native-async-storage/async-storage";

//storing the data locally, through the ky "User"
export async function storeData (value) {
  try {
    const stringifyObject = JSON.stringify(value)
    await AsyncStorage.setItem("User", stringifyObject);
  } catch (e) {
    console.log(e)
  }
};

//getting the data
export async function getData () {
  try {
    const jsonValue = await AsyncStorage.getItem("User");
    jsonValue != null ? JSON.parse(jsonValue) : null;
    return jsonValue
    
  } catch (e) {
    // error reading value
  }
};

//updating the data that already exists 
export async function mergeData(value) {
  try{
    await AsyncStorage.mergeItem("User", JSON.stringify(value))
  } catch (e){

  }
}


//clearing all the data
export async function clearAll (){
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }

  console.log('Local storage cleared.')
}