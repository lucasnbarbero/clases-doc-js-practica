# Proyecto Final: Registro de Reservas para el Alojamiento Phoenix

En este proyecto final, vamos a realizar el registro de reservas para el alojamiento Phoenix. Deberán crear una aplicación web que permita a los usuarios registrar a los huéspedes, validar los datos ingresados y mostrar la información de la reserva con el precio final correspondiente.

## Requisitos

### 1. Formulario de Registro

Crear un formulario con los siguientes campos:

- **Nombre** (texto)
- **Apellido** (texto)
- **Teléfono** (número)
- **Email** (texto)
- **Cantidad de días de estadía** (número)
- **Tipo de habitación** (selección: Individual, Doble, Suite)

### 2. Validaciones

- **Campos Requeridos**: Todos los campos deben estar completados.
- **Campos Numéricos**: Los campos Teléfono y Cantidad de días deben contener solo números.
- **Cantidad de Días**: La cantidad de días debe ser mayor o igual a 1.
- **Rango de Precios**: Validar que la cantidad de días esté dentro del rango permitido por la tabla de precios.

### 3. Interacción

- Al hacer clic en “Registrar huésped”, validar los datos ingresados.
- Si los datos son inválidos, mostrar los mensajes de error correspondientes cerca del campo que tiene el error (sin usar `alert`).
- Si los datos son válidos, agregar debajo del formulario la información del huésped junto con el precio final calculado según la tabla de precios.

### 4. Tabla de Precios

| Tipo de Habitación | Precio por Noche |
| ------------------ | ---------------- |
| Individual         | $50              |
| Doble              | $90              |
| Suite              | $150             |

## Consideraciones

- **Interacción del Usuario**: No usar `prompt` para pedir los datos al usuario, deben ingresarse en los inputs del formulario. El resultado se mostrará solo cuando el usuario presione el botón “Registrar huésped” (Ayuda: van a tener que usar un evento de JavaScript y manejarlo).
- **Visualización**: La parte visual es importante, aunque no es necesario dejarlo hermoso (con que esté estructurado es suficiente). Usar el tiempo en resolver a nivel HTML y JavaScript, y luego agregar CSS básico.
- **Organización del Código**: Separar el código en módulos para mantenerlo limpio y organizado, similar a cómo se hizo en el proyecto de ejemplo.

## Proyecto de Ejemplo

Pueden basarse en el siguiente proyecto de ejemplo que cubre conceptos similares y está bien estructurado:

[Repositorio del Proyecto de Ejemplo](https://github.com/lucasnbarbero/clases-doc-js-practica)
