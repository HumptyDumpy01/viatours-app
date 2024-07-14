import React from 'react';
import './Pagination.scss';

interface PaginationInterface {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalTours: number;
  toursPerPage: number;
}

const Pagination = ({ currentPage, setCurrentPage, totalTours, toursPerPage }: PaginationInterface) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalTours / toursPerPage); i++) {
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
        <p>Showing results <span className="pagination__results-info-from">{(currentPage - 1) * toursPerPage + 1}</span>-<span
          className="pagination__results-info-to">{Math.min(currentPage * toursPerPage, totalTours)}</span> of <span
          className="pagination__results-info-total">{totalTours}</span></p>
      </div>
    </>
  );
};

export default Pagination;