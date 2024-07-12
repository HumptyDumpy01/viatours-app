// 'use client';

import whereToImg1 from '@/assets/images/homepage/where-to-popup/where-to-image-1.svg';
import whereToImg2 from '../../../assets/images/homepage/where-to-popup/where-to-image-2.svg';
import whereToImg3 from '../../../assets/images/homepage/where-to-popup/where-to-image-3.svg';
import whereToImg4 from '../../../assets/images/homepage/where-to-popup/where-to-image-4.svg';
import whereToImg5 from '../../../assets/images/homepage/where-to-popup/where-to-image-5.svg';
import whereToImg6 from '../../../assets/images/homepage/where-to-popup/where-to-image-6.svg';

import './WhereToPopup.scss';
import WhereToElement from '@/components/homepage/choose-location-popup/WhereToElement';

/*interface WhereToPopupInterface {
  // children: ReactNode;
}*/
export default function WhereToPopup(/*{  }: WhereToPopupInterface*/) {
  return (
    <>
      <div className="where-to-popup">
        <div className="where-to-popup-wrapper">
          <WhereToElement type={`location`} country={`France`} title={`Eiffel Tower`} />
          <WhereToElement type={`location`} country={`France`} title={`Louvre Museum`} />
          <WhereToElement
            type={`tour`}
            title={`Eiffel Tower Guided Climb with Optional Summit Access`}
            country={`France`}
            price={`32.98$`}
            image={whereToImg1.src}
          />
          <WhereToElement
            type={`tour`}
            title={`Skip-the-Line Eiffel Tower Tour and Seine River Cruise`}
            country={`France`}
            price={`32.98$`}
            image={whereToImg2.src}
          />
          <WhereToElement
            type={`tour`}
            title={`Eiffel Tower Dinner Experience with Summit Option`}
            country={`France`}
            price={`32.98$`}
            image={whereToImg3.src}
          />
          <WhereToElement
            type={`tour`}
            title={`Eiffel Tower Night Tour with Optional Champagne Toast`}
            country={`France`}
            price={`32.98$`}
            image={whereToImg4.src}
          />
          <WhereToElement
            type={`tour`}
            title={`Exclusive Eiffel Tower History Walk with Summit Access`}
            country={`France`}
            price={`32.98$`}
            image={whereToImg5}
          />
          <WhereToElement
            type={`tour`}
            title={`Eiffel Tower Access to 2nd Floor and Summit Option with Host`}
            country={`France`}
            price={`32.98$`}
            image={whereToImg6}
          />
          <WhereToElement type={`search-all`} title={`Eiffel`} />
        </div>
      </div>
    </>
  );
}
