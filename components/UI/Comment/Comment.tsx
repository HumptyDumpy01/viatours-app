'use client';

import starFilled from '../../../assets/images/homepage/findPopularTours/one-star.svg';
import starEmpty from '../../../assets/images/homepage/findPopularTours/empty-star.svg';
import Image, { StaticImageData } from 'next/image';
import IconIon from '@/components/UI/IonIcon/IconIon';
import GallerySlider from '@/components/UI/Gallery/GallerySlider';
import { useState } from 'react';
import { DUMMY_TOUR_COMMENTS } from '@/data/DUMMY_COMMENTS';
import { CldImage } from 'next-cloudinary';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type CommentType = {
  user: string;
  id: string;
  date_added: string;
  rated: number;
  title: string;
  text: string;
  images: string[] | StaticImageData[];
  likes: number;
  dislikes: number;
  // abuseReports: number;
  // children: ReactNode;
}

export default function
  Comment({
            id,
            user,
            date_added,
            rated,
            title,
            text,
            images,
            likes,
            dislikes
            // abuseReports
          }: CommentType) {

  if (!images) {
    throw new Error(`Invalid gallery images: ${images}. There should be at least one image!`);
  }

  const [sliderVisibility, setSliderVisibility] = useState<boolean>(false);

  // test double states that would be replaced as soon as I tackle the data base.
  const [commentLikes, setCommentLikes] = useState(likes);
  const [commentDislikes, setCommentDislikes] = useState(dislikes);

  const [userLikedComment, setUserLikedComment] = useState<boolean>(false);
  const [userDislikedComment, setUserDislikedComment] = useState<boolean>(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  let nameParts;
  // if a user has a just one word in their name, we should take the first two letters of the name
  if (user.split(' ').length === 1) {
    nameParts = user.slice(0, 2);
  } else {
    nameParts = user.split(' ');
  }
  // Take the first character of the first and last name part, capitalize them, and join with a period
  const userInitials = `${nameParts[0][0].toUpperCase()}${nameParts.length > 1 ? '.' + nameParts[nameParts.length - 1][0].toUpperCase() : ''}`;
  // the date is received in the format: 2024-07-01T13:45:04.000Z, and it should be of the format: April 2023, at 13:45
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

  function handleLikeComment() {

    // if user is not authenticated, redirect to the login page
    if (!session) {
      router.push(`/login`);
      return;
    }

    if (userDislikedComment) {
      setUserDislikedComment(false);
      setCommentDislikes(prevState => prevState - 1);

      // TODO: find the comment in the dummy data and decrease the dislikes
      DUMMY_TOUR_COMMENTS.map((item) => {
        if (item.id === id) {
          item.dislikes = item.dislikes - 1;
        }
      });

    }

    if (userLikedComment) {
      setUserLikedComment(false);
      setCommentLikes(prevState => prevState - 1);

      // TODO: find the comment in the dummy data and decrease the likes
      DUMMY_TOUR_COMMENTS.map((item) => {
        if (item.id === id) {
          item.likes = item.likes - 1;
        }
      });
    } else {
      setUserLikedComment(true);
      setCommentLikes(prevState => prevState + 1);

      // TODO: find the comment in the dummy data and increase the likes
      DUMMY_TOUR_COMMENTS.map((item) => {
        if (item.id === id) {
          item.likes = item.likes + 1;
        }
      });
    }
  }

  function handleDislikeComment() {

    // if user is not authenticated, redirect to the login page
    if (!session) {
      router.push(`/login`);
      return;
    }

    if (userLikedComment) {
      setUserLikedComment(false);
      setCommentLikes(prevState => prevState - 1);
    }
    if (userDislikedComment) {
      setUserDislikedComment(false);
      setCommentDislikes(prevState => prevState - 1);

      DUMMY_TOUR_COMMENTS.map((item) => {
        if (item.id === id) {
          item.dislikes = item.dislikes - 1;
        }
      });

    } else {
      setUserDislikedComment(true);
      setCommentDislikes(prevState => prevState + 1);

      // TODO: find the comment in the dummy data and increase the dislikes
      DUMMY_TOUR_COMMENTS.map((item) => {
        if (item.id === id) {
          item.dislikes = item.dislikes + 1;
        }
      });
    }
  }

  return (
    <>
      <div className={`comments-wrapper`}>
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
                  return <Image key={i + 1} width={15} height={15} src={starEmpty} alt="star empty" />;
                }
              })}
            </div>
            <h3 className="comments__content-title">{title}</h3>
          </div>
          <p className="comments__content-paragraph">{text}</p>
          <div className="comments__content-images">
            {images.map(function(imgSrc) {
              return (
                <div key={`${imgSrc}`} className="comments__content-images-wrapper">
                  <CldImage
                    width={130}
                    height={130}
                    // className={`comments__content-images-wrapper`}
                    crop="fill"
                    alt="Tour Comment Image"
                    onClick={handleOpenSlider}
                    src={`${imgSrc}`} />
                </div>
              );
            })}

          </div>
          {images.length > 0 &&
            <GallerySlider
              info={{
                images: images,
                title: `Comment images`
              }}
              sliderVisibility={sliderVisibility}
              handleCloseSlider={handleCloseSlider}
            />
          }
          <div className="comments__content-reaction">
            <button className={`comments__content-reaction-btn ${userLikedComment ? `highlighted` : ``}`}
                    onClick={handleLikeComment}>
              <span
                className={`comments__content-reaction-btn--helpful ${userLikedComment ? `highlighted` : ``}`}>{commentLikes}</span>
              <IconIon type={`thumbsUpOutline`}
                       className={`icon icon--thumbs-up ${userLikedComment ? `highlighted` : ``}`} />
              Helpful
            </button>
            <button className={`comments__content-reaction-btn  ${userDislikedComment ? `highlighted` : ``}`}
                    onClick={handleDislikeComment}>
              <span
                className={`comments__content-reaction-btn--not-helpful  ${userDislikedComment ? `highlighted` : ``}`}>{commentDislikes}</span>
              <IconIon type={`thumbsDownOutline`}
                       className={`icon icon--thumbs-down  ${userDislikedComment ? `highlighted` : ``}`} />
              Not Helpful
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
