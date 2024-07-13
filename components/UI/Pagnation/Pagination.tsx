// 'use client';
import './Pagination.scss';
/*interface PaginationInterface {
  // children: ReactNode;
}*/

export default function Pagination(/*{  }: PaginationInterface*/) {
  return (
    <>
      <div className="pagination">
        <a href="#" className="pagination__link pagination__link--active">1</a>
        <a href="#" className="pagination__link">2</a>
        <a href="#" className="pagination__link">3</a>
        <a href="#" className="pagination__link">4</a>
        <span>...</span>
        <a href="#" className="pagination__link">20</a>
      </div>
      <div className="pagination__results-info">
        <p>Showing results <span className="pagination__results-info-from">1</span>-<span
          className="pagination__results-info-to">20</span>&nbsp;
           of <span className="pagination__results-info-total"></span>1,415</p>
      </div>
    </>
  );
}
