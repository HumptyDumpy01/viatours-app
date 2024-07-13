// 'use client';
import './FiguresHeader.scss';

/*interface FiguresHeaderInterface {
  // children: ReactNode;
}*/
import IconIon from '@/components/UI/IonIcon/IconIon';

export default function FiguresHeader(/*{  }: FiguresHeaderInterface*/) {
  return (
    <>
      <div className="all-tours__content__figures__header flex flex-align-center flex-space-between">
        <p><span className="all-tours__content__figures__header-number-of-results">1362</span> results</p>
        <div className="all-tours__content__figures__header-sort">
          <IconIon type="filterOutline" className="icon icon--filter" />
          <span>Sort by:</span>
          <select name="sort" id="sort" className="all-tours__content__figures__header-sort-select">
            <option value="all-tours">All Tours</option>
            <option value="rating">Rating</option>
            <option value="featured">Featured</option>
            <option value="low-price">Low Price</option>
            <option value="specials">Specials</option>
          </select>
        </div>
      </div>
    </>
  );
}
