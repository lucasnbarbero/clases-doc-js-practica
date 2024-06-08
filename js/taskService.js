import { Database, STORE_NAME } from "./db.js";

/**
 * Servicio para manejar las operaciones CRUD de las tareas en la base de datos
 */
export class TaskService {
  /**
   * Agrega una nueva tarea a la base de datos.
   * @param {Object} task - La tarea que se va a agregar.
   * @returns {Promise<void>} Una promesa que se resuelve cuando la tarea se ha agregado con éxito.
   */
  static async addTask(task) {
    // Abre la base de datos
    return Database.openDB().then((db) => {
      // Retorna una nueva promesa para manejar la asincronía de la operación
      return new Promise((resolve, reject) => {
        // Inicia una transacción de lectura y escritura en el almacén de objetos STORE_NAME
        const transaction = db.transaction([STORE_NAME], "readwrite");
        // Obtiene el almacén de objetos en el que se agregarán las tareas
        const store = transaction.objectStore(STORE_NAME);
        // Agrega la tarea al almacén de objetos
        const request = store.add(task);

        // Maneja el evento cuando la operación de agregar una tarea tiene éxito
        request.onsuccess = () => {
          // Resuelve la promesa indicando que la tarea se agregó con éxito
          resolve();
        };

        // Maneja el evento si hay un error al agregar la tarea
        request.onerror = (event) => {
          // Rechaza la promesa con el error ocurrido
          reject(event.target.error);
        };
      });
    });
  }

  /**
   * Obtiene todas las tareas de la base de datos.
   * @returns {Promise<Object[]>} Una promesa que se resuelve con un array de objetos que representan todas las tareas en la base de datos.
   */
  static async getAllTasks() {
    // Abre la base de datos
    return Database.openDB().then((db) => {
      // Retorna una nueva promesa para manejar la asincronía de la operación
      return new Promise((resolve, reject) => {
        // Inicia una transacción de solo lectura en el almacén de objetos STORE_NAME
        const transaction = db.transaction([STORE_NAME], "readonly");
        // Obtiene el almacén de objetos que contiene las tareas
        const store = transaction.objectStore(STORE_NAME);
        // Realiza una solicitud para obtener todas las tareas del almacén
        const request = store.getAll();

        // Maneja el evento cuando la operación de obtener todas las tareas tiene éxito
        request.onsuccess = (event) => {
          // Resuelve la promesa con el array de objetos que representan todas las tareas en la base de datos
          resolve(event.target.result);
        };

        // Maneja el evento si hay un error al obtener las tareas
        request.onerror = (event) => {
          // Rechaza la promesa con el error ocurrido
          reject(event.target.error);
        };
      });
    });
  }

  /**
   * Actualiza una tarea existente en la base de datos.
   * @param {Object} task - La tarea actualizada.
   * @returns {Promise<void>} Una promesa que se resuelve cuando la tarea se ha actualizado con éxito.
   */
  static async updateTask(task) {
    // Abre la base de datos
    return Database.openDB().then((db) => {
      // Retorna una nueva promesa para manejar la asincronía de la operación
      return new Promise((resolve, reject) => {
        // Inicia una transacción de lectura y escritura en el almacén de objetos STORE_NAME
        const transaction = db.transaction([STORE_NAME], "readwrite");
        // Obtiene el almacén de objetos en el que se actualizará la tarea
        const store = transaction.objectStore(STORE_NAME);
        // Actualiza la tarea en el almacén de objetos utilizando el método put
        const request = store.put(task);

        // Maneja el evento cuando la operación de actualización de tarea tiene éxito
        request.onsuccess = () => {
          // Resuelve la promesa indicando que la tarea se ha actualizado con éxito
          resolve();
        };

        // Maneja el evento si hay un error al actualizar la tarea
        request.onerror = (event) => {
          // Rechaza la promesa con el error ocurrido
          reject(event.target.error);
        };
      });
    });
  }

  /**
   * Elimina una tarea de la base de datos.
   * @param {number} id - El ID de la tarea que se va a eliminar.
   * @returns {Promise<void>} Una promesa que se resuelve cuando la tarea se ha eliminado con éxito.
   */
  static async deleteTask(id) {
    // Abre la base de datos
    return Database.openDB().then((db) => {
      // Retorna una nueva promesa para manejar la asincronía de la operación
      return new Promise((resolve, reject) => {
        // Inicia una transacción de lectura y escritura en el almacén de objetos STORE_NAME
        const transaction = db.transaction([STORE_NAME], "readwrite");
        // Obtiene el almacén de objetos en el que se eliminará la tarea
        const store = transaction.objectStore(STORE_NAME);
        // Elimina la tarea del almacén de objetos utilizando el método delete
        const request = store.delete(id);

        // Maneja el evento cuando la operación de eliminación de tarea tiene éxito
        request.onsuccess = () => {
          // Resuelve la promesa indicando que la tarea se ha eliminado con éxito
          resolve();
        };

        // Maneja el evento si hay un error al eliminar la tarea
        request.onerror = (event) => {
          // Rechaza la promesa con el error ocurrido
          reject(event.target.error);
        };
      });
    });
  }
}
