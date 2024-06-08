import { TaskService } from "./taskService.js";

// Se agrega un event listener que se ejecutará cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", loadTasks);

// Se agrega un event listener al formulario de tareas que se ejecutará cuando se envíe el formulario
document.getElementById("taskForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Previene el comportamiento por defecto de enviar el formulario
  const taskTitle = document.getElementById("taskTitle").value; // Obtiene el valor del título de la tarea del formulario
  if (taskTitle) {
    // Verifica si el título de la tarea no está vacío
    // Llama al método addTask del servicio TaskService para agregar una nueva tarea
    TaskService.addTask({ title: taskTitle, completed: false }).then(() => {
      document.getElementById("taskTitle").value = ""; // Limpia el campo de entrada del título de la tarea en el formulario
      loadTasks(); // Recarga la lista de tareas después de agregar una nueva tarea
    });
  }
});

// Función que carga y muestra todas las tareas
function loadTasks() {
  // Llama al método getAllTasks del servicio TaskService para obtener todas las tareas
  TaskService.getAllTasks().then((tasks) => {
    const taskList = document.getElementById("taskList"); // Obtiene la lista de tareas del DOM
    taskList.innerHTML = ""; // Limpia la lista de tareas para actualizarla

    // Itera sobre todas las tareas obtenidas
    tasks.forEach((task) => {
      const listItem = document.createElement("li"); // Crea un elemento de lista para cada tarea
      listItem.textContent = task.title; // Establece el texto del elemento de lista con el título de la tarea
      listItem.className = task.completed ? "completed" : ""; // Aplica una clase CSS si la tarea está completada
      listItem.dataset.id = task.id; // Establece el atributo de datos con el ID de la tarea

      const toggleButton = document.createElement("button"); // Crea un botón para cambiar el estado de la tarea
      toggleButton.textContent = task.completed ? "Undo" : "Complete"; // Establece el texto del botón según el estado de la tarea
      toggleButton.addEventListener("click", () => {
        task.completed = !task.completed; // Cambia el estado de completitud de la tarea
        // Llama al método updateTask del servicio TaskService para actualizar la tarea en la base de datos
        TaskService.updateTask(task).then(loadTasks); // Después de actualizar la tarea, recarga la lista de tareas
      });

      const deleteButton = document.createElement("button"); // Crea un botón para eliminar la tarea
      deleteButton.textContent = "Delete"; // Establece el texto del botón para eliminar la tarea
      deleteButton.addEventListener("click", () => {
        // Llama al método deleteTask del servicio TaskService para eliminar la tarea de la base de datos
        TaskService.deleteTask(task.id).then(loadTasks); // Después de eliminar la tarea, recarga la lista de tareas
      });

      // Agrega los botones al elemento de lista
      listItem.appendChild(toggleButton);
      listItem.appendChild(deleteButton);
      // Agrega el elemento de lista a la lista de tareas en el DOM
      taskList.appendChild(listItem);
    });
  });
}
