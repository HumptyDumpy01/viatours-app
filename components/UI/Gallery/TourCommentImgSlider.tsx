// 'use client';
import './TourCommentImgSlider.scss';
import Image, { StaticImageData } from 'next/image';

type TourCommentImgSliderType = {
  images: string[] | StaticImageData[];
  // children: ReactNode;
}

export default function TourCommentImgSlider({ images }: TourCommentImgSliderType) {
  return (
    <div className="comments__images__slider">
      <div className="comments__images__slider-wrapper flex">
        {images.map((item) => {
          return (
            // @ts-ignore
            <Image key={item.src} src={item} alt={`Comment image`} />
          );
        })}
        <span className="description__gallery-images-slider-span">*Scroll to the right to see more</span>
      </div>
    </div>
  );
}
