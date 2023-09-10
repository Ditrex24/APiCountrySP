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
    // Agrega tus propias validaciones aquí...
    return '';
  };
  
  // Función de validación para la temporada
  export const validateSeason = (season) => {
    // Agrega tus propias validaciones aquí...
    return '';
  };
  
  // Validación para los países seleccionados
  export const validateSelectedCountries = (selectedCountries) => {
    // Agrega tus propias validaciones aquí...
    return '';
  };
  
  // Llama a todas las funciones de validación
  export const validateActivityForm = (formData) => {
    const errors = {
      name: validateName(formData.name),
      difficulty: validateDifficulty(formData.difficulty),
      duration: validateDuration(formData.duration),
      season: validateSeason(formData.season),
      selectedCountries: validateSelectedCountries(formData.selectedCountries),
    };
  
    return errors;
  };
  