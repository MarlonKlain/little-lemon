import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeData (value) {
  try {
    const stringifyObject = JSON.stringify(value)
    await AsyncStorage.setItem("User", stringifyObject);
  } catch (e) {
    console.log(e)
  }
};

export async function getData () {
  try {
    const jsonValue = await AsyncStorage.getItem("User");
    jsonValue != null ? JSON.parse(jsonValue) : null;
    return jsonValue
    
  } catch (e) {
    // error reading value
  }
};

export async function mergeData(value) {
  try{
    await AsyncStorage.mergeItem("User", JSON.stringify(value))
  } catch (e){

  }
}

export async function clearAll (){
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }

  console.log('Local storage cleared.')
}