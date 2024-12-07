'use client';

import starFilled from '../../../assets/images/homepage/findPopularTours/one-star.svg';
import starEmpty from '../../../assets/images/homepage/findPopularTours/empty-star.svg';
import Image, { StaticImageData } from 'next/image';
import IconIon from '@/components/UI/IonIcon/IconIon';
import GallerySlider from '@/components/UI/Gallery/GallerySlider';
import { useEffect, useState } from 'react';
import { CldImage } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CustomizedSnackbar from '@/components/UI/Toast/Snackbar';

export type SessionType = {
  user: {
    email: string | ``;
    name: string | ``;
    image?: string | `` | null
  }
}

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
  likesArray: string[];
  dislikesArray: string[];
  session: SessionType;
  disabledButtonsLikeAndDislike?: boolean;
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
            dislikes,
            likesArray,
            dislikesArray,
            session,
            disabledButtonsLikeAndDislike = false
            // abuseReports
          }: CommentType) {

  if (!images) {
    throw new Error(`Invalid gallery images: ${images}. There should be at least one image!`);
  }

  const [sliderVisibility, setSliderVisibility] = useState<boolean>(false);

  // test double states that would be replaced as soon as I tackle the data base.
  const [commentLikes, setCommentLikes] = useState(likes);
  const [commentDislikes, setCommentDislikes] = useState(dislikes);

  const [open, setOpen] = useState(false);
  const [toastLabel, setToastLabel] = useState<string>(`Hello there!`);
  const [toastSeverity, setToastSeverity] = useState<string>(`info`);

  const router = useRouter();

  let isUserLikedComment: boolean = false;
  let isUserDislikedComment: boolean = false;

  const [userLikedComment, setUserLikedComment] = useState<boolean>(isUserLikedComment);
  const [userDislikedComment, setUserDislikedComment] = useState<boolean>(isUserDislikedComment);

  useEffect(() => {
    if (session && session.user!.email) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isUserLikedComment = likesArray.includes(session.user!.email.toString());
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isUserDislikedComment = dislikesArray.includes(session.user!.email.toString());

      setUserLikedComment(isUserLikedComment);
      setUserDislikedComment(isUserDislikedComment);
    }
  }, [session]);

  // Check if user liked or disliked some comments or not

  function handleCommentAction(action: `LIKE` | `DISLIKE`, setActive: boolean,
                               setCommentVal: (prevState: number) => number) {

    const result = fetch(`/api/handle-comment-action`, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        commentId: id,
        userEmail: session!.user!.email,
        action: action
      })
    }).then((res) => {
      return res.json();
    }).then((data) => {


      if (!data.acknowledged && action === `LIKE`) {
        setUserLikedComment(setActive);
        setCommentLikes(setCommentVal);
      }

      if (!data.acknowledged && action === `DISLIKE`) {
        setUserDislikedComment(setActive);
        setCommentDislikes(setCommentVal);
      }

    });
  }


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

    if (!session || !session.user?.email) {
      // router.push(`/login`);
      setOpen(true);
      setToastLabel(`Please login to perform this action!`);
      setToastSeverity(`error`);

      return;
    }

    if (userLikedComment) {
      setUserLikedComment(false);
      setCommentLikes(prevState => prevState - 1);
      ///////////////////////////////////////

      handleCommentAction(`LIKE`, true, (prevState: number) => prevState + 1);

    } else {

      if (userDislikedComment) {
        setUserDislikedComment(false);
        setCommentDislikes(prevState => prevState - 1);
      }

      // INFO: OPTIMISTIC UPDATE OF THE STATE
      setUserLikedComment(true);
      setCommentLikes(prevState => prevState + 1);
      ///////////////////////////////////////

      // create a server function that would perform two actions
      // based on the params: push or pull the user id from the likes array
      handleCommentAction(`LIKE`, false, (prevState: number) => prevState - 1);
    }

  }

  function handleDislikeComment() {

    // if the user is not authenticated, redirect to the login page
    if (!session || !session.user?.email) {
      // router.push(`/login`);
      setOpen(true);
      setToastLabel(`Please login to perform this action!`);
      setToastSeverity(`error`);
      return;
    }

    if (userDislikedComment) {
      // INFO: OPTIMISTIC UPDATE OF THE STATE
      setUserDislikedComment(false);
      setCommentDislikes(prevState => prevState - 1);
      ///////////////////////////////////////
      handleCommentAction(`DISLIKE`, false, (prevState: number) => prevState - 1);

    } else {

      if (userLikedComment) {
        setUserLikedComment(false);
        setCommentLikes(prevState => prevState - 1);
      }

      // INFO: OPTIMISTIC UPDATE OF THE STATE
      setUserDislikedComment(true);
      setCommentDislikes(prevState => prevState + 1);

      handleCommentAction(`DISLIKE`, true, (prevState: number) => prevState + 1);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <motion.div
      /* IMPORTANT: I DO NOT KNOW WHY, BUT THESE ANIMATIONS BREAK THE IMAGE FULL SCREEN
      *   SLIDER WHEN USER CLICKS ON A COMMENT IMAGE */
      /* INFO: THAT BEHAVIOUR WAS NOT THE CASE UNTIL I CLONED MY PROJECT FROM REPO */
      // initial={{ opacity: 0, y: 300 }}
      // whileInView={{ opacity: 1, y: 0 }}
      // transition={{ type: `spring`, duration: 1, bounce: 0.25 }}
      // viewport={{ once: true }}
    >
      <CustomizedSnackbar open={open} handleClose={handleClose} label={toastLabel} severity={toastSeverity} />
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
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 15, zIndex: 2 }}
                  whileTap={{ scale: 0.9 }}
                  key={`${imgSrc}`} className="comments__content-images-wrapper">
                  <CldImage
                    width={130}
                    height={130}
                    // className={`comments__content-images-wrapper`}
                    crop="fill"
                    alt="Tour Comment Image"
                    onClick={handleOpenSlider}
                    src={`${imgSrc}`} />
                </motion.div>
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
            <button disabled={disabledButtonsLikeAndDislike}
                    className={`comments__content-reaction-btn ${userLikedComment ? `highlighted` : ``}`}
                    onClick={handleLikeComment}>
              <span
                className={`comments__content-reaction-btn--helpful ${userLikedComment ? `highlighted` : ``}`}>{commentLikes}</span>
              <IconIon type={`thumbsUpOutline`}
                       className={`icon icon--thumbs-up ${userLikedComment ? `highlighted` : ``}`} />
              Helpful
            </button>
            <button
              disabled={disabledButtonsLikeAndDislike}
              className={`comments__content-reaction-btn  ${userDislikedComment ? `highlighted` : ``}`}
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
    </motion.div>
  );
}
