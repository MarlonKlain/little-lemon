import { useSQLiteContext } from "expo-sqlite"

export function useProductDatabase (){

    const database = useSQLiteContext()

    async function setDataDB(itemName, description, price, category, image) {
        const statement = await database.prepareAsync(
          "INSERT INTO menuItens (itemName, description, price, category, image) VALUES ($itemName, $description, $price, $category, $image)"
        )
    
        try {
            const result = await statement.executeAsync({
                $itemName: itemName,
                $description: description,
                $price: price,
                $category: category,
                $image: image
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
            console.log("getDataDb: ", error)
        }
    }
    
    async function searchByName(name) {
      try {
        const query = "SELECT * FROM menuItens WHERE itemName LIKE ?"
        const response = await database.getAllAsync(query, `%${name}%`)
        return response
    } catch (error) {
        console.log("search: ", error)
      }
    }

    async function filter(category, itemName) {      
      if(itemName != null && category != null){
        const query = "SELECT * FROM menuItens WHERE category LIKE $category AND itemName LIKE $itemName"
          try {
            const response = await database.getAllAsync(query, {
              $itemName: `%${itemName}%`,
              $category: `%${category}%`
            })
            return response
          } catch (error) {
            console.log("Filter: both ", error);
          }
      } else if (itemName != null){
        const query = "SELECT * FROM menuItens WHERE itemName LIKE $itemName"
          try {
            const response = await database.getAllAsync(query, {
              $itemName: `%${itemName}%`,
            })
            return response
          } catch (error) {
            console.log("Filter: itemName ", error);
          }
      } else {
        const query = "SELECT * FROM menuItens WHERE category LIKE $category"
          try {
            const response = await database.getAllAsync(query, {
              $category: `%${category}%`
            })
            return response
          } catch (error) {
            console.log("Filter: category ", error);
            
          }
      }
    }
    async function deleteAllData (){
      try {
        await database.execAsync(`
          DELETE FROM menuItens
          `)
      } catch (error) {
        console.log("deleteAllData: ", error);
        
      }
    }

    async function alterTable() {
      try {
        await database.execAsync(`
          ALTER TABLE menuItens ADD COLUMN image TEXT NOT NULL;
          `)
      } catch (error) {
        console.log("alterTable: " , error);
        
      }
    }
    return {setDataDB, getDataDb, deleteAllData, alterTable, searchByName, filter}
}

