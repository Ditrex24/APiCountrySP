import React, { useState } from "react";
import style from "./Form.module.css";
import { useSelector } from "react-redux";
import { validateActivityForm } from "./validations";
import axios from "axios"; // Importa axios para realizar solicitudes HTTP

const Form = () => {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [hours, setHours] = useState(1);
  const [season, setSeason] = useState("spring");
  const countries = useSelector((state) => state.countries);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountriesList, setSelectedCountriesList] = useState([]);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true); // Estado para deshabilitar el botón de envío

  const handleNameChange = (event) => {
    setName(event.target.value);
    validateForm();
  };

  const handleDifficultyChange = (event) => {
    const newDifficulty = parseInt(event.target.value, 10);
    setDifficulty(newDifficulty);
  };

  const handleHoursChange = (event) => {
    const newHours = parseInt(event.target.value, 10);
    setHours(newHours);
    validateForm();
  };

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    validateForm();
  };

  const handleAddCountry = () => {
    if (selectedCountry) {
      if (!selectedCountriesList.includes(selectedCountry)) {
        setSelectedCountriesList([...selectedCountriesList, selectedCountry]);
        setSelectedCountry("");
        setErrors({ ...errors, selectedCountry: "" });
        validateForm();
      } else {
        setErrors({
          ...errors,
          selectedCountry: "El país ya ha sido seleccionado.",
        });
      }
    } else {
      setErrors({
        ...errors,
        selectedCountry: "Por favor, selecciona un país.",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateActivityForm({
      name,
      difficulty,
      duration: hours,
      selectedCountries: selectedCountriesList,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowAlert(false);
      return;
    }

    const newActivity = {
      name,
      difficulty,
      duration: hours,
      season,
      countries: selectedCountriesList,
    };

    axios.post("/activities", newActivity).then((response) => {
        console.log(response.data);
        setShowAlert(true);
        resetForm();
      })
      .catch((error) => {
        console.error("Error al guardar la actividad:", error);
      });
  };

  const resetForm = () => {
    setName("");
    setDifficulty(1);
    setHours(1);
    setSeason("spring");
    setSelectedCountry("");
    setSelectedCountriesList([]);
    setErrors({});
    setShowAlert(false);
    setSubmitButtonDisabled(true); // Deshabilita el botón de envío después de la creación exitosa
  };

  // Función para validar el formulario y habilitar/deshabilitar el botón de envío
  const validateForm = () => {
    const validationErrors = validateActivityForm({
      name,
      difficulty,
      duration: hours,
      selectedCountries: selectedCountriesList,
    });
    const isFormValid = Object.keys(validationErrors).length === 0 && name && hours && selectedCountriesList.length > 0;
    setErrors(validationErrors);
    setSubmitButtonDisabled(!isFormValid);
  };


  return (
    <div className={style.containerForm}>
      <h1 className={style.title}>Formulario para crear actividad</h1>

      <form onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label className={style.label} htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleNameChange}
            className={style.input}
          />
          {errors.name && (
            <p className={style.errorText}>{errors.name}</p>
          )}
        </div>

        <div className={style.formGroup}>
          <label className={style.label} htmlFor="difficulty">
            Dificultad
          </label>
          <input
            type="range"
            name="difficulty"
            id="difficulty"
            min="1"
            max="5"
            step="1"
            value={difficulty}
            onChange={handleDifficultyChange}
          />
          <output
            className={style["price-output"]}
            htmlFor="difficulty"
          >
            {difficulty}
          </output>
          {errors.difficulty && (
            <p className={style.errorText}>{errors.difficulty}</p>
          )}
        </div>

        <div className={style.formGroup}>
          <label className={style.label} htmlFor="hours">
            Duración en horas
          </label>
          <input
            type="number"
            name="hours"
            id="hours"
            min="1"
            max="24"
            value={hours}
            onChange={handleHoursChange}
            className={style.input}
          />
          {errors.hours && (
            <p className={style.errorText}>{errors.hours}</p>
          )}
        </div>

        <div className={style.formGroup}>
          <label className={style.label}>
            Selecciona una estación del año:
          </label>
          <div className={style.radioContainer}>
            <label className={style.radioLabel}>
              <input
                type="radio"
                name="season"
                value="spring"
                checked={season === "spring"}
                onChange={handleSeasonChange}
              />
              Primavera
            </label>
            <label className={style.radioLabel}>
              <input
                type="radio"
                name="season"
                value="summer"
                checked={season === "summer"}
                onChange={handleSeasonChange}
              />
              Verano
            </label>
            <label className={style.radioLabel}>
              <input
                type="radio"
                name="season"
                value="autumn"
                checked={season === "autumn"}
                onChange={handleSeasonChange}
              />
              Otoño
            </label>
            <label className={style.radioLabel}>
              <input
                type="radio"
                name="season"
                value="winter"
                checked={season === "winter"}
                onChange={handleSeasonChange}
              />
              Invierno
            </label>
          </div>
        </div>

        <div className={style.formGroup}>
          <label className={style.label} htmlFor="selectedCountry">
            Selecciona un país:
          </label>
          <select
            name="selectedCountry"
            id="selectedCountry"
            value={selectedCountry}
            onChange={handleCountryChange}
            className={style.select}
          >
            <option value="">Selecciona un país</option>
            {countries.length === 0 ? (
              <option value="">Cargando...</option>
            ) : (
              countries.map((country) => (
                <option
                  key={country.id}
                  value={country.name}>
                  {country.name}
                </option>
              ))
            )}
          </select>
          <button
            className={style.button}
            onClick={handleAddCountry}
          >
            Agregar país
          </button>
          {errors.selectedCountry && (
            <p className={style.errorText}>
              {errors.selectedCountry}
            </p>
          )}
        </div>

        <div>
          <h2 className={style.subtitle}>
            Países seleccionados:
          </h2>
          <ul className={style.list}>
            {selectedCountriesList.map((country, index) => (
              <li
                key={index}
                className={style.listItem}
              >
                {country}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className={style.submitButton}
          disabled={submitButtonDisabled} // Habilita/deshabilita el botón de envío
        >
          Crear Actividad Turística
        </button>
      </form>

      {showAlert && (
        <div className={style.alert}>
          <p>Actividad creada con éxito.</p>
        </div>
      )}
    </div>
  );
};

export default Form;