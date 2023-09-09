import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";

const CardsContainer = () => {
  const countries = useSelector((state) => state.countries);

  const [paisesPorPagina] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPais, setCurrentPais] = useState([]);

  useEffect(() => {
    if (Array.isArray(countries)) {
      setCurrentPais(countries.slice((currentPage - 1) * paisesPorPagina, currentPage * paisesPorPagina));
    }
  }, [countries, currentPage ,paisesPorPagina]);

  // Función para cambiar la página actual
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!Array.isArray(countries)) {
    return <p>No se han encontrado países.</p>;
  }

  return (
    <div className={style.caja}>
      {currentPais.map((country) => (
        <Card
          key={country.countryid}
          id={country.countryid}
          image={country.image}
          name={country.name}
          continent={country.continent}
        />
      ))}
      <Pagination
        totalItems={countries.length}
        itemsPerPage={paisesPorPagina}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CardsContainer;
