class Validation {
  static validateFormData(formData) {
    const errors = [];

    // Validar que todos los campos estén completados
    for (let pair of formData.entries()) {
      const [fieldName, fieldValue] = pair;
      if (!fieldValue) {
        errors.push(`El campo ${fieldName} es requerido.`);
      }
    }

    // Validar que los campos numéricos contengan solo números
    const numericFields = ["teléfono", "cantidad de días"];
    for (let field of numericFields) {
      const fieldValue = formData.get(field);
      if (fieldValue && isNaN(fieldValue)) {
        errors.push(`El campo ${field} debe contener solo números.`);
      }
    }

    // Validar que la cantidad de días sea mayor o igual a 1
    const days = formData.get("cantidad de días");
    if (days && parseInt(days) < 1) {
      errors.push("La cantidad de días debe ser mayor o igual a 1.");
    }

    return errors;
  }
}

export default Validation;
