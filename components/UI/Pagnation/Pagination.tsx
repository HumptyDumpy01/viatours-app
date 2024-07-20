import React from 'react';
import './Pagination.scss';
import Link from 'next/link';

interface PaginationInterface {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  handleSetLoading: () => void;
}

const Pagination = ({ currentPage, setCurrentPage, totalItems, itemsPerPage, handleSetLoading }: PaginationInterface) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number: number, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault(); // Prevent the default anchor action
    setCurrentPage(number);
    handleSetLoading();

    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll
    });
  };

  return (
    <>
      <div className="pagination">
        {pageNumbers.map(number => (
          <Link
            key={number}
            href="#"
            onClick={(event) => handleClick(number, event)}
            className={`pagination__link ${currentPage === number ? 'pagination__link--active' : ''}`}
          >
            {number}
          </Link>
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