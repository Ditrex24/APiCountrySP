import PropTypes from 'prop-types'; // Importa PropTypes para definir las propiedades esperadas
import style from './Pagination.module.css'; // Importa estilos CSS

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  // Calcula el número total de páginas en función de los ítems totales y por página
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Crea un array de números de página
  const pageNumbers = [];

  // Llena el array de números de página del 1 al total de páginas
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Calcula la página siguiente y anterior, si existen
  const nextPagina = currentPage < totalPages ? currentPage + 1 : null;
  const prevPagina = currentPage > 1 ? currentPage - 1 : null;

  return (
    <div className={style.pagination}> {/* Define una div con la clase CSS 'pagination' */}
      {currentPage !== 1 && (
        <button onClick={() => onPageChange(1)}>First</button>
      )}

      {prevPagina !== null && (
        <button onClick={() => onPageChange(prevPagina)}>Previous</button>
      )}

      {/* Muestra los botones de página dentro de un rango específico */}
      {pageNumbers.slice(currentPage - 1, currentPage + 4).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={pageNumber === currentPage ? style.active : style.noActive}
        >
          {pageNumber}
        </button>
      ))}

      {nextPagina !== null && (
        <button onClick={() => onPageChange(nextPagina)}>Next</button>
      )}

      {currentPage !== totalPages && (
        <button onClick={() => onPageChange(totalPages)}>Last</button>
      )}
    </div>
  );
};

// Definición de propiedades esperadas y sus tipos
Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination; // Exporta el componente Pagination

