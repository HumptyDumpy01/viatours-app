'use client';

import './Gallery.scss';
import { useCartDispatch } from '@/store/hooks';
import { tourSliceActions } from '@/store/tourSlice';
import { StaticImageData } from 'next/image';

export type GalleryType = {
  info: {
    images: StaticImageData[] | string;
    title: string;
  };
  // children: ReactNode;
}

export default function Gallery({ info }: GalleryType) {
  const dispatch = useCartDispatch();

  if (!info.images) {
    throw new Error(`Invalid gallery images: ${info.images}`);
  }

  const mainImage = info.images[0];
  const restOfImages = info.images.slice(1, 4);
  /*
    // when clicking on Esc, close the gallery slider
    window.addEventListener(`keydown`, (e) => {
      if (e.key === `Escape`) {
        dispatch(tourSliceActions.setGallerySliderVisibility(false));
      }
    });*/

  return (
    <>
      <div className="description__gallery">
        <div className="description__gallery-images grid">
          <div className="description__gallery-img-1">
            {/*// @ts-ignore*/}
            <img onClick={() => dispatch(tourSliceActions.setGallerySliderVisibility(true))} src={mainImage.src}
                 alt={info.title} />
          </div>

          <div className="description__gallery-images-container-1 grid grid-two-cols">
            {/*// @ts-ignore*/}
            {restOfImages.map((image, index) => {
              return (
                <div key={index} className={`description__gallery-img-${index + 2}`}>
                  {/*// @ts-ignore*/}
                  <img onClick={() => dispatch(tourSliceActions.setGallerySliderVisibility(true))} src={image.src}
                       alt={info.title}
                       className="description__gallery-img-2" />
                </div>
              );
            })}
          </div>
        </div>
        {/*<!--    <span class="description__gallery&#45;&#45;see-all">See all photos</span>-->*/}
        <span onClick={() => dispatch(tourSliceActions.setGallerySliderVisibility(true))}
              className="description__gallery--see-all">See all photos</span>
      </div>
    </>
  );
}
