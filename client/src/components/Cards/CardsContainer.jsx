import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";

const CardsContainer = () => {
  // Obtener la lista de países del estado de Redux
  const countries = useSelector((state) => state.countries);

  // Definir la cantidad de países por página y el estado para la página actual
  const [paisesPorPagina] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Estado para almacenar los países a mostrar en la página actual
  const [currentPais, setCurrentPais] = useState([]);

  // Actualizar la lista de países a mostrar en función de la página actual
  useEffect(() => {
    if (Array.isArray(countries)) {
      // Calcular los países a mostrar en la página actual en función de la paginación
      setCurrentPais(countries.slice((currentPage - 1) * paisesPorPagina, currentPage * paisesPorPagina));
    }
  }, [countries, currentPage, paisesPorPagina]);

  // Función para cambiar la página actual cuando se hace clic en la paginación
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Si no se encuentran países, mostrar un mensaje
  if (!Array.isArray(countries)) {
    return <p>No se han encontrado países.</p>;
  }

  return (
    <div className={style.caja}>
      {/* Mapear y mostrar las tarjetas de los países en la página actual */}
      {currentPais.map((country) => (
        <Card
          key={country.countryid}
          id={country.countryid}
          image={country.image}
          name={country.name}
          continent={country.continent}
          
        />
      ))}
      {/* Mostrar la paginación para navegar entre las páginas */}
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
