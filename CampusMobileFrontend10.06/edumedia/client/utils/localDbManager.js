import * as SQLite from 'expo-sqlite';

const dbName = 'deneme.db';
let db;

const initDatabase = async () => {
  db = await SQLite.openDatabaseAsync(dbName);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS validation (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT,
      expDate DATETIME,
      accessToken TEXT
    );
  `);
};

export const createValidationTable = async () => {
  await initDatabase();
  console.log('Validation tablosu oluşturuldu.');
};

export const getValidationData = async (query, setVariable, setLoaded) => {
  try {
    const result = await db.getAllAsync(query);
    if (result.length > 0) {
      setVariable(result[result.length - 1]);
    } else {
      console.log("Veri Yok");
    }
    setLoaded(true);
  } catch (error) {
    console.error('Hata: getValidationData', error);
    setLoaded(true);
  }
};

export const insertValidationData = async (query, postData) => {
  try {
    const result = await db.runAsync(query, [postData.userId, postData.expDate, postData.accessToken]);
    console.log('Validation verisi eklendi:', result.lastInsertRowId);
  } catch (error) {
    console.error('Validation verisi eklerken hata oluştu:', error);
  }
};

export const dropTables = async () => {
  const dropTableQuery = `DROP TABLE IF EXISTS validation`;
  try {
    await db.runAsync(dropTableQuery);
    console.log('Tablo başarıyla silindi');
  } catch (error) {
    console.error('Tablo silinirken hata oluştu:', error);
  }
};

export const clearTable = async () => {
  const clearTableQuery = `DELETE FROM validation`;
  try {
    await db.runAsync(clearTableQuery);
    console.log('Tablo içindeki bütün bilgiler başarıyla silindi');
  } catch (error) {
    console.error('Tablo içindeki bilgiler silinirken hata oluştu:', error);
  }
};

// Veritabanını başlat
initDatabase();
