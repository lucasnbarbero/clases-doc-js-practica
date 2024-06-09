import Validation from "./js/validation.js";

function calculateFinalPrice(roomType, days) {
  const prices = {
    individual: 50,
    doble: 90,
    suite: 150,
  };
  const pricePerNight = prices[roomType.toLowerCase()];
  return pricePerNight * days;
}

// Event listener para el botón "Registrar huésped"
document.getElementById("registerButton").addEventListener("click", () => {
  const formData = new FormData(document.getElementById("registerForm"));
  const validationErrors = Validation.validateFormData(formData);

  if (validationErrors.length === 0) {
    const guestInfo = {
      nombre: formData.get("nombre"),
      apellido: formData.get("apellido"),
      teléfono: formData.get("telefono"),
      email: formData.get("email"),
      días: parseInt(formData.get("cantidad de días")),
      tipoHabitación: formData.get("tipo de habitación"),
    };
    const finalPrice = calculateFinalPrice(
      guestInfo.tipoHabitación,
      guestInfo.días
    );
    displayGuestInfo(guestInfo, finalPrice);
  } else {
    displayValidationErrors(validationErrors);
  }
});

// Definir la función para mostrar la información del huésped y el precio final
function displayGuestInfo(guestInfo, finalPrice) {
  const guestInfoElement = document.getElementById("guestInfo");
  const infoList = document.createElement("ul");

  // Crear elementos de lista para cada información del huésped
  const nameItem = document.createElement("li");
  nameItem.textContent = `Nombre: ${guestInfo.nombre} ${guestInfo.apellido}`;
  infoList.appendChild(nameItem);

  const phoneItem = document.createElement("li");
  phoneItem.textContent = `Teléfono: ${guestInfo.teléfono}`;
  infoList.appendChild(phoneItem);

  const emailItem = document.createElement("li");
  emailItem.textContent = `Email: ${guestInfo.email}`;
  infoList.appendChild(emailItem);

  const daysItem = document.createElement("li");
  daysItem.textContent = `Cantidad de días: ${guestInfo.días}`;
  infoList.appendChild(daysItem);

  const roomItem = document.createElement("li");
  roomItem.textContent = `Tipo de habitación: ${guestInfo.tipoHabitación}`;
  infoList.appendChild(roomItem);

  const priceItem = document.createElement("li");
  priceItem.textContent = `Precio final: $${finalPrice}`;
  infoList.appendChild(priceItem);

  // Agregar la lista de información del huésped al elemento existente
  guestInfoElement.appendChild(infoList);
}

// Definir la función para mostrar mensajes de error de validación
function displayValidationErrors(errors) {
  const errorListElement = document.getElementById("errorList");
  errorListElement.innerHTML = "";
  errors.forEach((error) => {
    const errorItem = document.createElement("li");
    errorItem.textContent = error;
    errorListElement.appendChild(errorItem);
  });
}
