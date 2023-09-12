// Función de validación para el nombre
export const validateName = (name) => {
    if (name.trim() === '') {
      return 'El nombre es obligatorio.';
    }
    if (/\d/.test(name)) {
      return 'El nombre no puede contener números.';
    }
    return '';
  };
  
  // Función de validación para la dificultad
  export const validateDifficulty = (difficulty) => {
  if (isNaN(difficulty))
    return 'La dificultad debe ser un numero';
  
    const difficultyNumber = parseInt(difficulty, 10);

    if (difficultyNumber < 1 || difficultyNumber > 5) {
      return 'La dificultad debe estar entre 1 y 5.';
    }
  
    return '';
  };
  
  // Función de validación para la duración
  export const validateDuration = (duration) => {
    // Convierte la duración a un número
    const durationNumber = parseFloat(duration);
  
    // Verifica si la duración es un número válido y mayor que 0
    if (isNaN(durationNumber) || durationNumber <= 0) {
      return 'La duración debe ser mayor que 0.';
    }
  
    // Verifica si la duración no excede las 12 horas
    if (durationNumber > 12) {
      return 'La duración no puede exceder las 12 horas.';
    }
  
    return ''; // Retorna una cadena vacía si no hay errores.
  };
  
  
  // Validación para los países seleccionados
  export const validateSelectedCountries = (selectedCountries) => {
    if (selectedCountries.length === 0) {
      return 'Seleccione al menos un país.';
    }
  
    return ''; // Retorna una cadena vacía si no hay errores.
  };
  
  // Llama a todas las funciones de validación
  export const validateActivityForm = (formData) => {
    const errors = {
      name: validateName(formData.name),
      difficulty: validateDifficulty(formData.difficulty),
      duration: validateDuration(formData.duration),
      selectedCountries: validateSelectedCountries(formData.selectedCountries),
    };
  
    return errors;
  };
  