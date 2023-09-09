

import CardsContainer from "../../components/Cards/CardsContainer";
import style from "./Home.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getCountries,
  setOrderCountry,
  setFilterCounrtryByContinent,
  setOrderByPoblation
} from "../../redux/action";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = (Props) => {
  const dispatch = useDispatch();

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

  const { onSearch } = Props;

  return (
    <div className={style.containerHome}>
      <div className={style.filtersContainer}>
        <div className={style.tituloFiltros}>
          <h1>Filtros</h1>
        </div>
        <SearchBar onSearch={onSearch} className={style.SearchBar} />

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

        <select name="filter" onChange={handleFilterChange}>
          <option value="Todos">Todos</option>
          <option value="Asia">Asia</option>
          <option value="Africa">África</option>
          <option value="North America">América del Norte</option>
          <option value="South America">América del Sur</option>
          <option value="Antarctica">Antártica</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceanía</option>
        </select>
      </div>
      <div className={style.boxCoutries}>
        <div className={style.tituloPaises}>
          <h1>Countries</h1>
        </div>
        <div className={style.boxPaises}>
          <CardsContainer />
        </div>
      </div>
    </div>
  );
};

export default Home;
