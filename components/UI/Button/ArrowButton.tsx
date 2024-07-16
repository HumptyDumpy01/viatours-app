// 'use client';

import IconIon from '@/components/UI/IonIcon/IconIon';

type BtnLeftType = {
  handleScrollToLeft: () => void;
  type: `left`;
  sliderVisibility: boolean;
}

type BtnRightType = {
  handleScrollToRight: () => void;
  type: `right`;
  sliderVisibility: boolean;
}
export default function ArrowButton(props: BtnLeftType | BtnRightType) {

  if (!props.type) {
    throw new Error(`Invalid arrow button type! It should be either 'left' or 'right'!`);
  }

  if (props.type === `left`) {
    return (
      <div onClick={props.handleScrollToLeft}
           className={`icon-container icon-left ${props.sliderVisibility ? `open` : ``}`}>
        <IconIon type={`arrowBackOutline`}
                 className={`icon`} />
      </div>
    );

  }
  if (props.type === `right`) {
    return (
      <div onClick={props.handleScrollToRight}
           className={`icon-container icon-right ${props.sliderVisibility ? `open` : ``}`}>
        <IconIon type={`arrowForwardOutline`}
                 className={`icon`} />
      </div>
    );
  }
}

