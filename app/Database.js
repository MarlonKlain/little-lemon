import AsyncStorage from "@react-native-async-storage/async-storage";

export function armazenar (key, value){
    try {
        AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("erro ao armazenar", e)
  }
}
export async function buscar (key) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          return value;
        }
      } catch (e) {
        console.log("Erro ao buscar");
    }
    
}

export async function storeData (value) {
  try {
    const stringifyJsonValue = JSON.stringify(value)
    const stringifyKey = JSON.stringify(value.email)
    await AsyncStorage.setItem(stringifyKey, stringifyJsonValue);
  } catch (e) {
    console.log(e)
  }
};

export async function getData (key) {
  try {
    const stringifyKey = JSON.stringify(key)
    const jsonValue = await AsyncStorage.getItem(stringifyKey);
    return console.log(jsonValue != null ? JSON.parse(jsonValue) : null);
  } catch (e) {
    // error reading value
  }
};