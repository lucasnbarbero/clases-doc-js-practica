class Database {
  constructor() {
    this.dbName = "Guest";
    this.dbVersion = 1;
  }

  open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("guests")) {
          db.createObjectStore("guests", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }
}
