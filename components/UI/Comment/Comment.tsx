'use client';

import starFilled from '../../../assets/images/homepage/findPopularTours/one-star.svg';
import starEmpty from '../../../assets/images/homepage/findPopularTours/empty-star.svg';
import Image, { StaticImageData } from 'next/image';
import IconIon from '@/components/UI/IonIcon/IconIon';
import GallerySlider from '@/components/UI/Gallery/GallerySlider';
import { useState } from 'react';

type CommentType = {
  user: string;
  date_added: string;
  rated: number;
  title: string;
  text: string;
  images: string[] | StaticImageData[];
  likes: number;
  dislikes: number;
  abuse_reports: number;
  // children: ReactNode;
}


export default function Comment({
                                  user,
                                  date_added,
                                  rated,
                                  title,
                                  text,
                                  images,
                                  likes,
                                  dislikes,
                                  abuse_reports
                                }: CommentType) {

  if (!images) {
    throw new Error(`Invalid gallery images: ${images}. There should be at least one image!`);
  }
  const [sliderVisibility, setSliderVisibility] = useState<boolean>(false);

  // Split the user name into an array of words
  const nameParts = user.split(' ');
  // Take the first character of the first and last name part, capitalize them, and join with a period
  const userInitials = `${nameParts[0][0].toUpperCase()}${nameParts.length > 1 ? '.' + nameParts[nameParts.length - 1][0].toUpperCase() : ''}`;
  // date is received in the format: 2024-07-01T13:45:04.000Z, and it should be of the format: April 2023, at 13:45
  const date = new Date(date_added);
  const options = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  } as Intl.DateTimeFormatOptions;
  const formattedDate = date.toLocaleDateString('en-US', options);
  const dateParts = formattedDate.split(',');

  function handleCloseSlider() {
    setSliderVisibility(false);
  }

  function handleOpenSlider() {
    setSliderVisibility(true);
  }

  return (
    <>
      <div className="comments-wrapper">
        <div className="comments__username flex flex-space-between flex-align-center">
          <div className="comments__username-logo-and-name flex flex-align-center gap-sm">
            <div className="comments__username-logo">{userInitials}</div>
            <p className="comments__username-name">{user}</p>
          </div>
          <span className="comments__username-date">{dateParts}</span>
        </div>
        <div className="comments__content">
          <div className="comments__content-rating-and-title flex  gap-sm flex-align-center">
            <div className="rating-stars flex flex-align-center">
              {/*make a loop for the rating. We should output five stars, empty or filled
            depending on the rating*/}
              {Array.from({ length: 5 }, (_, i) => {
                if (i < Number(rated.toFixed(0))) {
                  return <Image key={i} width={15} height={15} src={starFilled} alt="star filled" />;
                } else {
                  return <Image key={i} width={15} height={15} src={starEmpty} alt="star empty" />;
                }
              })}
            </div>
            <h3 className="comments__content-title">{title}</h3>
          </div>
          <p className="comments__content-paragraph">{text}</p>
          <div className="comments__content-images">
            {images?.map((image, index) => (
              <div key={index} className="comments__content-images-wrapper">
                <Image onClick={handleOpenSlider}
                       alt="comment image" src={image} />
              </div>
            ))
            }
          </div>
          <GallerySlider
            info={{
              images: images,
              title: `Comment images`
            }}
            sliderVisibility={sliderVisibility}
            handleCloseSlider={handleCloseSlider}
          />
          <div className="comments__content-reaction">
            <button className="comments__content-reaction-btn">
              <span className="comments__content-reaction-btn--helpful">{likes}</span>
              <IconIon type={`thumbsUpOutline`} className="icon icon--thumbs-up" />
              Helpful
            </button>
            <button className="comments__content-reaction-btn">
              <span className="comments__content-reaction-btn--not-helpful">{dislikes}</span>
              <IconIon type={`thumbsDownOutline`} className="icon icon--thumbs-down" />
              Not Helpful
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
