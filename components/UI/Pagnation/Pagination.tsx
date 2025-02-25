import React from 'react';
import './Pagination.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PaginationInterface {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  scrollToTop?: boolean;
  scrollToElem?: {
    className: string;
    offset: number;
  };
  // handleSetLoading: () => void;
}

const Pagination = ({
                      currentPage,
                      setCurrentPage,
                      totalItems,
                      itemsPerPage,
                      scrollToTop,
                      scrollToElem
                      // handleSetLoading
                    }: PaginationInterface) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (scrollToTop && scrollToElem) {
    throw new Error('You can only scroll to top or to an element, not both');
  }

  const handleClick = (number: number, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, activeLink: boolean) => {
    event.preventDefault(); // Prevent the default anchor action
    if (activeLink) return;
    setCurrentPage(number);

    // handleSetLoading();
    scrollToTop && (
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Smooth scroll
        });
      }, 0)
    );
    scrollToElem && (
      setTimeout(() => {
        const elem = document.querySelector(scrollToElem.className);
        if (elem) {
          window.scrollTo({
            top: elem.getBoundingClientRect().top + window.scrollY - scrollToElem.offset,
            behavior: 'smooth'
          });
        }
      }, 0)
    );

  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.3, backfaceVisibility: `hidden` }}
        className="pagination">
        {pageNumbers.map(number => (
          <motion.div
            key={number}
            whileHover={{ scale: 1.3, backfaceVisibility: `hidden` }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              key={number}
              href="#"
              onClick={(event) => handleClick(number, event, currentPage === number)}
              className={`pagination__link ${currentPage === number ? 'pagination__link--active' : ''}`}
            >
              {number}
            </Link>
          </motion.div>
        ))}
      </motion.div>
      <div className="pagination__results-info">
        <p>Showing results <span className="pagination__results-info-from">{(currentPage - 1) * itemsPerPage + 1}</span>-<span
          className="pagination__results-info-to">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span
          className="pagination__results-info-total">{totalItems}</span></p>
      </div>
    </>
  );
};

export default Pagination;