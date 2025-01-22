//The SQLite will be responsible for manipulate the menu data
import * as SQLite from 'expo-sqlite';

export async function initializeDatabase() {

    const db = await SQLite.openDatabaseAsync('little-lemon.db');
    //The table menuItens will be create if not exists with the colums: id, itemName, description, price, category, image
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS menuItens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        itemName TEXT NOT NULL,
        description TEXT NOT NULL,
        price FLOAT NOT NULL,
        category TEXT NOT NULL,
        image TEXT NOT NULL
        );
        `);
}