class Validation {
  static validateFormData(formData) {
    const errors = [];

    for (let pair of formData.entries()) {
      const [fieldName, fieldValue] = pair;
      if (!fieldValue) errors.push(`El campo ${fieldName} es requerido`);
    }

    const numerics = ["phone", "days"];

    for (let field of numerics) {
      const fieldValue = formData.get(field);
      if (fieldValue && isNaN(fieldValue)) {
        errors.push(`El campo ${field} debe contener solo números.`);
      }
    }

    const days = formData.get("days");
    if (days && parseInt(days) < 1) {
      errors.push("La cantidad de días debe ser mayor o igual a 1.");
    }

    return errors;
  }
}

export default Validation;
