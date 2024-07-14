'use client';

import './GallerySlider.scss';
/*type GallerySliderType = {
  // children: ReactNode;
}*/
import IconIon from '@/components/UI/IonIcon/IconIon';
import { GalleryType } from '@/components/UI/Gallery/Gallery';
import { useCartDispatch, useCartSelector } from '@/store/hooks';
import { tourSliceActions } from '@/store/tourSlice';

export default function GallerySlider({ info }: GalleryType) {
  const galleryVisibility = useCartSelector((state) => state.tour.gallerySliderVisibility);

  const dispatch = useCartDispatch();

  if (!info.images) {
    throw new Error(`Invalid gallery images: ${info.images}`);
  }

  const mainImage = info.images[0];
  const restOfImages = info.images.slice(1);


  return (
    <>
      <div onClick={() => dispatch(tourSliceActions.setGallerySliderVisibility(false))}>
        <IconIon type={`closeOutline`} className={`icon icon--close-gallery ${galleryVisibility ? `open` : ``}`} />
      </div>
      <div className={`description__gallery-images-slider ${galleryVisibility ? `open` : ``}`}>
        <div className={`description__gallery-images-slider-wrapper  ${galleryVisibility ? `open` : ``}`}>
          <div className="description__gallery-images-slider-img-container">
            {/*// @ts-ignore*/}
            <img src={mainImage.src}
                 alt={info.title}
                 className="description__gallery-images-slider-img" />
            <span className="description__gallery-images-slider-span">*Scroll to the right to see more</span>
          </div>
          {restOfImages.map((image, index) => {
            return (
              <div key={index} className="description__gallery-images-slider-img-container">
                {/*// @ts-ignore*/}
                <img src={image.src}
                     alt={info.title}
                     className="description__gallery-images-slider-img" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
