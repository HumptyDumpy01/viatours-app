'use client';

import './Gallery.scss';
import { useCartDispatch } from '@/store/hooks';
import { tourSliceActions } from '@/store/tourSlice';

export type GalleryType = {
  info: {
    images: {}[];
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

  return (
    <>
      <div className="description__gallery">
        <div className="description__gallery-images grid">
          <div className="description__gallery-img-1">
            {/*// @ts-ignore*/}
            <img src={mainImage.src}
                 alt={info.title} />
          </div>

          <div className="description__gallery-images-container-1 grid grid-two-cols">
            {restOfImages.map((image, index) => {
              return (
                <div key={index} className={`description__gallery-img-${index + 2}`}>
                  {/*// @ts-ignore*/}
                  <img src={image.src}
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
