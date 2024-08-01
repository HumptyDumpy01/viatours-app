'use client';
import './FiguresHeader.scss';

/*interface FiguresHeaderInterface {
  // children: ReactNode;
}*/
import IconIon from '@/components/UI/IonIcon/IconIon';

type FiguresHeaderInterface = {
  summarizedResults: number;
  // children: ReactNode;
};

export default function FiguresHeader({ summarizedResults }: FiguresHeaderInterface) {

  function handleOpenFilter() {
    const filter = document.querySelector('.all-tours__content__filter');
    filter?.classList.toggle('filter--open');
  }

  return (
    <>
      <div className="all-tours__content__figures__header flex flex-align-center flex-space-between">
        <p><span className="all-tours__content__figures__header-number-of-results">{summarizedResults}</span> results
        </p>
        <div className="all-tours__content__figures__header-sort">
          <div onClick={handleOpenFilter}>
            <IconIon type="filterOutline" className="icon icon--filter" />
          </div>
          <span>Sort by:</span>
          <select name="sort" id="sort" className="all-tours__content__figures__header-sort-select">
            <option value="">Choose</option>
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
