import CardsContainer from "../../components/Cards/CardsContainer";
import style from "./Home.module.css";
import { useEffect, useState } from "react"; // Importa useState
import { useDispatch } from "react-redux";
import {
  getCountries,
  setOrderCountry,
  setFilterCounrtryByContinent,
  setOrderByPoblation,
  filterCountriesByActivity
} from "../../redux/action";


const Home = (Props) => {
  const dispatch = useDispatch();
  const [selectedActivity, setSelectedActivity] = useState(''); // Define selectedActivity como estado

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleOrderChange = (e) => {
    dispatch(setOrderCountry(e.target.value));
  };

  const handleFilterChange = (e) => {
    dispatch(setFilterCounrtryByContinent(e.target.value));
  };

  const handleOrderChangePoblation = (e) => {
    dispatch(setOrderByPoblation(e.target.value));
  };

  const handleActivityChange = (e) => {
    setSelectedActivity(e.target.value);
    dispatch(filterCountriesByActivity(e.target.value));
  };

  

  return (
    <div className={style.containerHome}>
      <div className={style.filtersContainer}>

        <select
          name="order"
          onClick={handleOrderChange}
          className={style.selectores}
        >
          <option value="todos">Sin filtros</option>
          <option value="Ascendente">A a la Z</option>
          <option value="Desendente">Z a la A</option>
        </select>

        <select
          name="orderPoblation"
          onClick={handleOrderChangePoblation}
          className={style.selectores}
        >
          <option value="todos">Sin filtros</option>
          <option value="Ascendente">↓ a ↑</option>
          <option value="Desendente">↑ a ↓</option>
        </select>

        <select name="filter" onChange={handleFilterChange}className={style.selectores}>
          <option value="Todos">Todos los continentes</option>
          <option value="Asia">Asia</option>
          <option value="Africa">África</option>
          <option value="North America">América del Norte</option>
          <option value="South America">América del Sur</option>
          <option value="Antarctica">Antártica</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceanía</option>
        </select>

        <select
          name="activity"
          onChange={handleActivityChange}
          value={selectedActivity}
          className={style.selectores}
        >
          <option value="Todo">Todas las actividades</option>
          <option value="Excursión en Montaña">Excursión en Montaña</option>
          <option value="Senderismo">Senderismo</option>
          <option value="Buceo">Buceo</option>
        </select>

      </div>
      <div className={style.boxCountries}>
        <div className={style.boxPaises}>
          <CardsContainer />
        </div>
        </div>
      </div>
    
  );
};

export default Home;

