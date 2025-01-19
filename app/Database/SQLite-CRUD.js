import * as SQLite from 'expo-sqlite';

export async function initializeDatabase() {
    const db = await SQLite.openDatabaseAsync('little-lemon.db');
    
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