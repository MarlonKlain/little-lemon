//Using the useSQLiteContext hook
import { useSQLiteContext } from "expo-sqlite"

export function useProductDatabase (){

    const database = useSQLiteContext()
    //storing data
    async function setDataDB(itemName, description, price, category, image) {
        //Using prepareAsync as "template" to store data
        const statement = await database.prepareAsync(
          "INSERT INTO menuItens (itemName, description, price, category, image) VALUES ($itemName, $description, $price, $category, $image)"
        )
    
        try {
          //passing to "executeAsync" the SQL line from "prepareAsync above" and executing it 
            const result = await statement.executeAsync({
                $itemName: itemName,
                $description: description,
                $price: price,
                $category: category,
                $image: image
            })
          
          //Getting the id's last rows.
          const insertedRowId = result.lastInsertRowId.toLocaleString()
          return { insertedRowId }

        } catch (error) {
          throw error
        } finally {
          await statement.finalizeAsync()
        }
    }
    //getting data from database
    async function getDataDb() {
        try {
            const query = "SELECT * FROM menuItens"
            const response = await database.getAllAsync(query)
            return response
        } catch (error) {
            console.log("getDataDb: ", error)
        }
    }
    
    //searching in the database by names like the value(name) that is beeing looking for
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
      //Validanting if the data from filter is not null
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
      // if only itemName is fullfilled, then the search will be acomplished only using the itemName value
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
        // if only category is fullfilled, then the search will be acomplished only using the category value
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
    //deleting all the rows from the table menuItens
    async function deleteAllData (){
      try {
        await database.execAsync(`
          DELETE FROM menuItens
          `)
      } catch (error) {
        console.log("deleteAllData: ", error);
        
      }
    }

    return {setDataDB, getDataDb, deleteAllData, searchByName, filter}
}

