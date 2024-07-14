import React from 'react';
import './Pagination.scss';

interface PaginationInterface {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const Pagination = ({ currentPage, setCurrentPage, totalItems, itemsPerPage }: PaginationInterface) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="pagination">
        {pageNumbers.map(number => (
          <a
            key={number}
            href="#"
            onClick={() => setCurrentPage(number)}
            className={`pagination__link ${currentPage === number ? 'pagination__link--active' : ''}`}
          >
            {number}
          </a>
        ))}
      </div>
      <div className="pagination__results-info">
        <p>Showing results <span className="pagination__results-info-from">{(currentPage - 1) * itemsPerPage + 1}</span>-<span
          className="pagination__results-info-to">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span
          className="pagination__results-info-total">{totalItems}</span></p>
      </div>
    </>
  );
};

export default Pagination;