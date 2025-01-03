import AsyncStorage from "@react-native-async-storage/async-storage";

export async function armazenar (chave, valor){
    try {
        await AsyncStorage.setItem(chave, valor);
  } catch (e) {
    console.log("erro ao armazenar", e)
  }
}

export async function buscar (chave) {
    try {
        const value = await AsyncStorage.getItem(chave);
        if (value !== null) {
          return value;
        }
      } catch (e) {
        console.log("Erro ao buscar");
    }
    
}
