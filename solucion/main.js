import ReservationService from "./src/reservationService.js";
import Validation from "./src/validation.js";

document.addEventListener("DOMContentLoaded", loadGuest());

document
  .getElementById("registerButton")
  .addEventListener("click", async () => {
    const formData = new FormData(document.getElementById("registerForm"));
    const validationErrors = Validation.validateFormData(formData);

    if (validationErrors.length === 0) {
      const guestInfo = {
        name: formData.get("name"),
        lastname: formData.get("lastname"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        days: parseInt(formData.get("days")),
        room: formData.get("room"),
      };
      await ReservationService.addReservation(guestInfo);
      await loadGuest();
    } else {
      displayErrors(validationErrors);
    }
  });

function displayErrors(errors) {
  const errorListElement = document.getElementById("errorList");
  errorListElement.innerHTML = "";

  errors.forEach((error) => {
    const errorItem = document.createElement("li");
    errorItem.textContent = error;
    errorListElement.appendChild(errorItem);
  });
}

async function loadGuest() {
  const list = document.getElementById("guestList");
  list.innerHTML = "";
  const response = await ReservationService.getAll();
  response.forEach((r) => {
    const item = document.createElement("li");
    const { name, lastname, phone, email, days, room } = r;

    item.innerHTML = `
      <p>Cliente: ${name} ${lastname}</p>
      <p>Teléfono: ${phone}</p>
      <p>Email: ${email}</p>
      <p>Cantidad de días: ${days}</p>
      <p>Tipo de habitación: ${room}</p>
      <p>A pagar: ${calculateFinalPrice(room, days)}</p>
    `;

    list.appendChild(item);
  });
}

function calculateFinalPrice(roomType, days) {
  const prices = {
    single: 50,
    double: 90,
    suite: 150,
  };
  const pricePerNight = prices[roomType.toLowerCase()];
  return pricePerNight * days;
}
