'use client';

import './Gallery.scss';
import { useCartDispatch } from '@/store/hooks';
import { tourSliceActions } from '@/store/tourSlice';
import { StaticImageData } from 'next/image';
import watermarkImage from '@/assets/images/viatours-watermark-logo.svg';

export type GalleryType = {
  info: {
    images: StaticImageData[] | string[];
    title: string;
  };
  // children: ReactNode;
}

export default function Gallery({ info }: GalleryType) {
  const dispatch = useCartDispatch();

  if (!info.images || info.images.length === 0) {
    throw new Error(`The images array should contain at least 1 image!`);
  }

  // Create a new array from the images prop to avoid direct mutation
  const imagesToShow = Array.isArray(info.images) ? [...info.images] : [info.images];
  while (imagesToShow.length < 4) {
    imagesToShow.push(watermarkImage); // Fill with watermarkImage if less than 5 images
  }

  // Use the first image as the main image and the rest as secondary images
  const mainImage = imagesToShow[0];
  const restOfImages = imagesToShow.slice(1, 4);

  return (
    <>
      <div className="description__gallery">
        <div className="description__gallery-images grid">
          <div className="description__gallery-img-1">
            <img onClick={() => dispatch(tourSliceActions.setGallerySliderVisibility(true))}
              // @ts-ignore
                 src={mainImage.src} alt={info.title} />
          </div>
          <div className="description__gallery-images-container-1 grid grid-two-cols">
            {restOfImages.map((image, index) => (
              <div key={index} className={`description__gallery-img-${index + 2}`}>
                <img onClick={() => dispatch(tourSliceActions.setGallerySliderVisibility(true))}
                  // @ts-ignore
                     src={image.src || image} alt={info.title} className="description__gallery-img-2" />
              </div>
            ))}
          </div>
        </div>
        <span onClick={() => dispatch(tourSliceActions.setGallerySliderVisibility(true))}
              className="description__gallery--see-all">See all photos</span>
      </div>
    </>
  );
}