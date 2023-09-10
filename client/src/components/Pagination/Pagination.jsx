import PropTypes from 'prop-types';
import style from './Pagination.module.css';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const nextPagina = currentPage < totalPages ? currentPage + 1 : null;
  const prevPagina = currentPage > 1 ? currentPage - 1 : null;

  return (
    <div className={style.pagination}>
      {currentPage !== 1 && (
        <button onClick={() => onPageChange(1)}>First</button>
      )}

      {prevPagina !== null && (
        <button onClick={() => onPageChange(prevPagina)}>Previous</button>
      )}

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

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;



