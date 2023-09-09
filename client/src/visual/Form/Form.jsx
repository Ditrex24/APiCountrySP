import { useState } from "react";
import style from "./Form.module.css";
import { useSelector } from "react-redux";

const Form = () => {
  const [difficulty, setDifficulty] = useState(3);
  const [hours, setHours] = useState(1);
  const [season, setSeason] = useState("spring");
  const countries = useSelector((state) => state.countries);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountriesList, setSelectedCountriesList] = useState([]);

  

  const handledifficultyChange = (event) => {
    const newdifficulty = parseInt(event.target.value, 10);
    setDifficulty(newdifficulty);
  };

  const handleHoursChange = (event) => {
    const newHours = parseInt(event.target.value, 10);
    setHours(newHours);
  };

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleAddCountry = () => {
    if (selectedCountry) {
      setSelectedCountriesList([...selectedCountriesList, selectedCountry]);
      setSelectedCountry("");
    }
  };

  return (
    <div className={style.containerForm}>
      <h1 className={style.title}>Formulario para agregar actividad</h1>

      <label className={style.label} htmlFor="difficulty">Dificultad </label>
      <input type="range" name="difficulty" id="difficulty"
        min="1"
        max="5"
        step="1"
        value={difficulty}
        onChange={handledifficultyChange}
      />
      <output className={style["price-output"]} htmlFor="difficulty">
        {difficulty}
      </output>

      <label className={style.label} htmlFor="hours">Duración en horas</label>
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

      <label className={style.label}>Selecciona una estación del año:</label>
      <div className={style.radioContainer}>
        <label   className={style.radioLabel}>
          <input
            type="radio"
            name="season"
            value="spring"
            checked={season === "spring"}
            onChange={handleSeasonChange}
          />
          Primavera
        </label>
     <div className={style.radioContainer}>
        <label  className={style.radioLabel}>
          <input
            type="radio"
            name="season"
            value="summer"
            checked={season === "summer"}
            onChange={handleSeasonChange}
          />
          Verano
        </label>
      </div>
      <div className={style.radioContainer}>
        <label  className={style.radioLabel}>
          <input
            type="radio"
            name="season"
            value="autumn"
            checked={season === "autumn"}
            onChange={handleSeasonChange}
          />
          Otoño
        </label>
      </div>
      <div className={style.radioContainer}>
        <label  className={style.radioLabel} >
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

      <label className={style.label} htmlFor="selectedCountry">Selecciona un país:</label>
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
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))
        )}
      </select>

      <button  className={style.button} onClick={handleAddCountry}>Agregar país</button>

      <div>
        <h2 className={style.subtitle}>Países seleccionados:</h2>
        <ul className={style.list}>
          {selectedCountriesList.map((country, index) => (
            <li key={index} className={style.listItem}>{country}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form;
