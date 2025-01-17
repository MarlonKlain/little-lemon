import { useSQLiteContext } from "expo-sqlite"

export function useProductDatabase (){

    const database = useSQLiteContext()

    async function setDataDB(itemName, description, price) {
        const statement = await database.prepareAsync(
          "INSERT INTO menuItens (itemName, description, price) VALUES ($itemName, $description, $price)"
        )
    
        try {
            const result = await statement.executeAsync({
                $itemName: itemName,
                $description: description,
                $price: price,
            })
    
          const insertedRowId = result.lastInsertRowId.toLocaleString()
    
          return { insertedRowId }
        } catch (error) {
          throw error
        } finally {
          await statement.finalizeAsync()
        }
    }

    async function getDataDb() {
        try {
            const query = "SELECT * FROM menuItens"
            const response = await database.getAllAsync(query)
            return response
        } catch (error) {
            throw error
        }
    }
    return {setDataDB, getDataDb}
}

