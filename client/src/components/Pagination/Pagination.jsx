// import PropTypes from 'prop-types';
// import style from './Pagination.module.css';

// const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const pageNumbers = [];

//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   const nextPagina = currentPage < totalPages ? currentPage + 1 : null;
//   const prevPagina = currentPage > 1 ? currentPage - 1 : null;

//   return (
//     <div className={style.pagination}>
//       {prevPagina !== null && (
//         <button onClick={() => onPageChange(prevPagina)}>Anterior</button>
//       )}

//       {pageNumbers.map((pageNumber) => (
//         <button
//           key={pageNumber}
//           onClick={() => onPageChange(pageNumber)}
//           className={pageNumber === currentPage ? style.active : style.noActive}
//         >
//           {pageNumber}
//         </button>
//       ))}

//       {nextPagina !== null && (
//         <button onClick={() => onPageChange(nextPagina)}>Siguiente</button>
//       )}
//     </div>
//   );
// };

// Pagination.propTypes = {
//   totalItems: PropTypes.number.isRequired,
//   itemsPerPage: PropTypes.number.isRequired,
//   currentPage: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
// };

// export default Pagination;


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

  const renderPageNumbers = () => {
    const currentPageIndex = currentPage - 1;
    const pageRange = [];

    if (totalPages <= 8) {
      return pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={pageNumber === currentPage ? style.active : style.noActive}
        >
          {pageNumber}
        </button>
      ));
    } else {
      if (currentPageIndex <= 4) {
        pageRange.push(...pageNumbers.slice(0, 5));
        pageRange.push('...');
        pageRange.push(...pageNumbers.slice(totalPages - 3, totalPages));
      } else if (currentPageIndex >= totalPages - 5) {
        pageRange.push(...pageNumbers.slice(0, 3));
        pageRange.push('...');
        pageRange.push(...pageNumbers.slice(totalPages - 6, totalPages));
      } else {
        pageRange.push(...pageNumbers.slice(0, 3));
        pageRange.push('...');
        pageRange.push(...pageNumbers.slice(currentPageIndex - 1, currentPageIndex + 2));
        pageRange.push('...');
        pageRange.push(...pageNumbers.slice(totalPages - 3, totalPages));
      }

      return pageRange.map((pageNumber, index) => (
        <button
          key={index}
          onClick={() => (typeof pageNumber === 'number' ? onPageChange(pageNumber) : null)}
          className={style.pageNumber}
        >
          {pageNumber}
        </button>
      ));
    }
  };

  return (
    <div className={style.pagination}>
      {prevPagina !== null && (
        <button onClick={() => onPageChange(prevPagina)}>Anterior</button>
      )}

      {renderPageNumbers()}

      {nextPagina !== null && (
        <button onClick={() => onPageChange(nextPagina)}>Siguiente</button>
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
