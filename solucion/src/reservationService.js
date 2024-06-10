import Database, { STORE_NAME } from "./database.js";

class ReservationService {
  static async getAll() {
    return Database.openDB().then((db) => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME]);
        const store = transaction.objectStore(STORE_NAME);

        const request = store.getAll();

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = (event) => {
          reject(event.target.error);
        };
      });
    });
  }

  static async addReservation(reservation) {
    return Database.openDB().then((db) => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);

        const request = store.add(reservation);

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = (event) => {
          reject(event.target.error);
        };
      });
    });
  }
}

export default ReservationService;
