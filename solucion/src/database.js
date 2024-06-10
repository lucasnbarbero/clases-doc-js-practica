export const DB_NAME = "GuestDB";
export const STORE_NAME = "guests";
export const DB_VERSION = 1;

class Database {
  static async openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const storeExists = db.objectStoreNames.contains(STORE_NAME);

        if (!storeExists) {
          db.createObjectStore(STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error("Database error: ", event.target.errorCode);
        reject(event.target.errorCode);
      };
    });
  }
}

export default Database;
