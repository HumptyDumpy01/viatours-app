'use client';

import './ArticleDescrComment.scss';
import './ArticleDescrCommentsRate.scss';
import Stars from '@/components/UI/Layout/Stars';
import { ArticleComment } from '@/app/articles/[id]/page';
import { SessionType } from '@/components/UI/Comment/Comment';
import { useRef, useState } from 'react';
import CustomizedSnackbar from '@/components/UI/Toast/Snackbar';
import { motion } from 'framer-motion';

type ArticleDescrCommentType = {
  comment: ArticleComment;
  session: SessionType;
  // children: ReactNode;
}

export default function ArticleDescrComment({ comment, session }: ArticleDescrCommentType) {

  const [open, setOpen] = useState(false);
  const [toastLabel, setToastLabel] = useState<string>(`Hello there!`);
  const [toastSeverity, setToastSeverity] = useState<string>(`info`);

  const [userLikedComment, setUserLikedComment] = useState<boolean>(comment.likes.includes(session.user.email));
  const [userDislikedComment, setUserDislikedComment] = useState<boolean>(comment.dislikes.includes(session.user.email));
  const [commentLikes, setCommentLikes] = useState<string[] | []>(comment.likes);
  const [commentDislikes, setCommentDislikes] = useState<string[] | []>(comment.dislikes);
  const [userReportedAbuse, setUserReportedAbuse] = useState<boolean>(comment.abuseReports.includes(session.user.email));

  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const timer = useRef<NodeJS.Timeout | null>(null);


  const handleClose = () => {
    setOpen(false);
  };

  let nameParts;
  // if a user has just one word in their name, we should take the first two letters of the name
  if (comment.user.split(' ').length === 1) {
    nameParts = comment.user.slice(0, 2);
  } else {
    nameParts = comment.user.split(' ');
  }
  // Take the first character of the first and last name part, capitalize them, and join with a period
  const userInitials = `${nameParts[0][0].toUpperCase()}${nameParts.length > 1 ? '.' + nameParts[nameParts.length - 1][0].toUpperCase() : ''}`;

  // if the date in 2020-12-12T12:00:00Z format,
  // I do want it to be as 12 December 2020, 12:00
  const date = new Date(comment.addedAt);
  const formattedDate = date.toLocaleString(`en-UA`, {
    day: `numeric`,
    month: `long`,
    year: `numeric`,
    hour: `numeric`,
    minute: `numeric`
  });

  async function handleLikeComment(id: string) {
    if (disableBtn) {
      return;
    }
    setDisableBtn(true);
    timer.current = setTimeout(function() {
      setDisableBtn(false);
    }, 2000);

    if (session.user.email === ``) {
      setOpen(true);
      setToastLabel(`Please login to perform this action!`);
      setToastSeverity(`error`);
      return;
    }

    /* if user already liked comment, I should remove like. */
    if (userLikedComment && !userDislikedComment) {
      // remove like
      /* INFO: OPTIMISTICALLY UPDATE THE UI */
      setUserLikedComment(false);
      setCommentLikes(commentLikes.filter((like) => like !== session.user.email));
    }

    /* if user did not like comment but disliked it before, remove the dislike and like it. */
    if (userDislikedComment && !userLikedComment) {
      // remove dislike and like
      /* INFO: OPTIMISTICALLY UPDATE THE UI */
      setUserDislikedComment(false);
      setCommentDislikes(commentDislikes.filter((dislike) => dislike !== session.user.email));

      setUserLikedComment(true);
      setCommentLikes([...commentLikes, session.user.email]);
    }

    /*  if user did not like comment yet and did not dislike it, then just like it. */
    if (!userLikedComment && !userDislikedComment) {
      // like
      /* INFO: OPTIMISTICALLY UPDATE THE UI */
      setUserLikedComment(true);
      setCommentLikes([...commentLikes, session.user.email]);
    }

    /* create a flexible, one api route + server function, which would
    *  rather like, remove like, remove dislike and like actions. */
    const response = await fetch(`/api/handle-article-comment-action`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({ type: `like`, session, commentId: id })
    }).then((response) => response.json()).catch((error) => {
      console.error(`Failed to perform article comment action`, error);
    });

    if (response.error) {
      setOpen(true);
      setToastLabel(`Failed to perform action over the article comment: ${response.message}`);
      setToastSeverity(`error`);
      console.error(`Failed to perform action over the article comment: ${response.message}`);
    }
  }

  async function handleDislikeComment(id: string) {
    if (disableBtn) {
      return;
    }
    setDisableBtn(true);
    timer.current = setTimeout(function() {
      setDisableBtn(false);
    }, 2000);

    if (session.user.email === ``) {
      setOpen(true);
      setToastLabel(`Please login to perform this action!`);
      setToastSeverity(`error`);
      return;
    }

    /* if user did dislike comment before, remove dislike */
    if (userDislikedComment && !userLikedComment) {
      // remove dislike
      /* INFO: OPTIMISTICALLY UPDATE THE UI */
      setUserDislikedComment(false);
      setCommentDislikes(commentDislikes.filter((dislike) => dislike !== session.user.email));
    }

    /* if the user did not dislike comment but he already liked it before, remove like and add dislike */
    if (userLikedComment && !userDislikedComment) {
      // remove like and add dislike
      /* INFO: OPTIMISTICALLY UPDATE THE UI */
      setUserLikedComment(false);
      setCommentLikes(commentLikes.filter((like) => like !== session.user.email));

      setUserDislikedComment(true);
      setCommentDislikes([...commentDislikes, session.user.email]);
    }

    /* if user did not dislike nor liked comment, just dislike it. */
    if (!userDislikedComment && !userLikedComment) {
      // dislike
      /* INFO: OPTIMISTICALLY UPDATE THE UI */
      setUserDislikedComment(true);
      setCommentDislikes([...commentDislikes, session.user.email]);
    }

    const response = await fetch(`/api/handle-article-comment-action`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({ type: `dislike`, session, commentId: id })

    }).then((response) => response.json()).catch((error) => {
      console.error(`Failed to perform article comment action`, error);
    });

    if (response.error) {
      setOpen(true);
      setToastLabel(`Failed to perform action over the article comment: ${response.message}`);
      setToastSeverity(`error`);
      console.error(`Failed to perform action over the article comment: ${response.message}`);
    }

  }

  async function handleReportAbuse() {
    /* INFO: OPTIMISTICALLY BLOCK THE BUTTON */
    setUserReportedAbuse(true);
    /* create a versatile api route to report the abuse. Also, use addToSet to prevent the same user adding his email multiple times */
    const response = await fetch(`/api/report-article-comment-abuse`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({ commentId: comment._id, session })
    }).then((response) => response.json()).catch((error) => {
      console.error(`Failed to report the article comment abuse`, error);
    });

    if (response.error) {
      setOpen(true);
      setToastLabel(`Failed to report the article comment abuse: ${response.message}`);
      setToastSeverity(`error`);
      console.error(`Failed to report the article comment abuse: ${response.message}`);
    }

  }

  return (
    <>
      <CustomizedSnackbar open={open} handleClose={handleClose} label={toastLabel} severity={toastSeverity} />
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: `spring`, duration: 1, bounce: 0.25 }}
        viewport={{ once: true }}
        className="comments__comment">
        <div className="comments__comment__user flex flex-align-center gap-14px">
          <div className="comments__comment__user__logo">{userInitials}</div>
          <div className="comments__comment__user__credentials">
            <p className="comments__comment__user__name">{
              comment.user
            }</p>
          </div>
        </div>
        <div className="comments__comment__title">
          <div className="comments__comment__title-stars flex gap-4px">
            <Stars rating={comment.rating} />
          </div>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className="comments__comment__title__text">{comment.title}</p>
        </div>
        <div className="comments__comment__text-container">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className="comments__comment__text">{comment.text}</p>
        </div>
        <div className="comments__comment__rate-container">
          <div className="flex flex-align-center gap-18px">

            <button onClick={() => handleLikeComment(comment._id.toString())}
                    className={`btn comments__comment__rate helpful text-decoration-none ${disableBtn ? `cursor-not-allowed` : ``} ${userLikedComment ? `highlighted` : ``}`}>
              <div className="comments__comment__rate-helpful flex flex-align-center ">
                <span className="comments__comment__rate-helpful__count inline-block">{commentLikes.length}</span>
                <svg className="comments__comment__rate-icon-like" xmlns="http://www.w3.org/2000/svg" width="16"
                     height="16"
                     viewBox="0 0 14 14" fill="none">
                  <path className="comments__comment__rate-icon-like-path"
                        d="M9.02501 12.6263C9.25198 12.5434 9.36883 12.2923 9.28598 12.0653C9.20313 11.8383 8.95197 11.7215 8.72499 11.8043L9.02501 12.6263ZM4.5 11.5L4.75733 11.1462C4.68255 11.0918 4.59246 11.0625 4.5 11.0625V11.5ZM1 9.75H0.5625H1ZM2.75 6.6875V7.125V6.6875ZM3.57031 6.6875V7.12501L3.57273 7.12499L3.57031 6.6875ZM4.31871 6.26641L4.69139 6.49557C4.70062 6.48056 4.70893 6.46501 4.71628 6.44901L4.31871 6.26641ZM7.5625 1V0.5625C7.39679 0.5625 7.2453 0.656126 7.17119 0.804344L7.5625 1ZM8.49219 2.30457L8.07926 2.16002L8.07922 2.16012L8.49219 2.30457ZM7.74133 4.68594L7.30667 4.63611L7.30659 4.63683L7.74133 4.68594ZM7.95871 5.01406L7.99306 4.57791C7.98163 4.57701 7.97017 4.57656 7.95871 4.57656V5.01406ZM11.5 7.09766L11.4891 7.53516H11.5L11.5 7.09766ZM9.3125 7.04297L9.27242 7.47863L9.28696 7.47997L9.30157 7.48033L9.3125 7.04297ZM9.3125 5.40234L9.29065 4.96534L9.28436 4.96575L9.3125 5.40234ZM12.375 6.2273L12.8125 6.22963V6.2273H12.375ZM12.375 8.875L12.3672 9.31253L12.3764 9.3125L12.375 8.875ZM9.3125 8.82031L9.2921 9.25752L9.30469 9.25774L9.3125 8.82031ZM9.3125 7.17969L9.30469 6.74226L9.29476 6.74243L9.28485 6.74306L9.3125 7.17969ZM12.375 7.125L12.3764 6.68741L12.3672 6.68757L12.375 7.125ZM13.25 8L13.6875 8.00136L13.6875 7.99864L13.25 8ZM11.0625 12.375L11.042 12.812L11.0529 12.8125L11.0637 12.8125L11.0625 12.375ZM9.3125 12.293L9.27431 12.7288L9.28315 12.7296L9.29202 12.73L9.3125 12.293ZM9.3125 10.6797V11.1174L9.32617 11.117L9.3125 10.6797ZM11.0625 10.625L11.0637 10.1875L11.0563 10.1875L11.0488 10.1877L11.0625 10.625ZM11.9375 11.5L12.375 11.5012L12.375 11.4988L11.9375 11.5ZM11.9375 10.625L11.9284 11.0625L11.9387 11.0625L11.9375 10.625ZM9.3125 10.5703L9.29317 11.0075L9.30339 11.0077L9.3125 10.5703ZM9.3125 8.92969L9.30339 8.49228L9.29461 8.49247L9.28584 8.493L9.3125 8.92969ZM11.9375 8.875L11.9387 8.43738L11.9284 8.43759L11.9375 8.875ZM12.8125 9.75L13.25 9.75123L13.25 9.74877L12.8125 9.75ZM8.875 12.2153C8.72499 11.8043 8.72518 11.8043 8.72538 11.8042C8.72544 11.8042 8.72563 11.8041 8.72575 11.8041C8.72599 11.804 8.72623 11.8039 8.72646 11.8038C8.72692 11.8036 8.72736 11.8035 8.72776 11.8033C8.72857 11.803 8.72927 11.8028 8.72986 11.8026C8.73103 11.8022 8.73174 11.8019 8.73198 11.8019C8.73247 11.8017 8.73108 11.8022 8.7277 11.8032C8.72093 11.8052 8.70623 11.8094 8.68269 11.8152C8.63559 11.8266 8.55338 11.8441 8.42898 11.8622C8.17992 11.8986 7.76389 11.9375 7.125 11.9375V12.8125C7.79861 12.8125 8.25758 12.7715 8.55539 12.7281C8.70443 12.7063 8.81363 12.6838 8.88957 12.6654C8.92756 12.6561 8.95729 12.6479 8.97958 12.6412C8.99072 12.6378 9.00001 12.6348 9.00755 12.6323C9.01132 12.6311 9.01465 12.63 9.01755 12.6289C9.01901 12.6284 9.02035 12.628 9.02159 12.6275C9.02221 12.6273 9.02281 12.6271 9.02338 12.6269C9.02366 12.6268 9.02394 12.6267 9.02421 12.6266C9.02435 12.6265 9.02455 12.6265 9.02461 12.6264C9.02481 12.6264 9.02501 12.6263 8.875 12.2153ZM7.125 11.9375C5.93857 11.9375 5.31686 11.5531 4.75733 11.1462L4.24267 11.8538C4.88626 12.3219 5.68643 12.8125 7.125 12.8125V11.9375ZM4.5 11.0625H2.75V11.9375H4.5V11.0625ZM2.75 11.0625C2.4019 11.0625 2.06806 10.9242 1.82192 10.6781L1.2032 11.2968C1.61344 11.707 2.16984 11.9375 2.75 11.9375V11.0625ZM1.82192 10.6781C1.57578 10.4319 1.4375 10.0981 1.4375 9.75H0.5625C0.5625 10.3302 0.792968 10.8866 1.2032 11.2968L1.82192 10.6781ZM1.4375 9.75V8.4375H0.5625V9.75H1.4375ZM1.4375 8.4375C1.4375 8.0894 1.57578 7.75556 1.82192 7.50942L1.2032 6.8907C0.792968 7.30094 0.5625 7.85734 0.5625 8.4375H1.4375ZM1.82192 7.50942C2.06806 7.26328 2.4019 7.125 2.75 7.125V6.25C2.16984 6.25 1.61344 6.48047 1.2032 6.8907L1.82192 7.50942ZM2.75 7.125H3.57031V6.25H2.75V7.125ZM3.57273 7.12499C3.79731 7.12375 4.01787 7.06531 4.21359 6.95518L3.78452 6.19261C3.71836 6.22983 3.64381 6.24959 3.5679 6.25001L3.57273 7.12499ZM4.21359 6.95518C4.40932 6.84506 4.57376 6.68688 4.69139 6.49557L3.94603 6.03725C3.90627 6.10191 3.85068 6.15538 3.78452 6.19261L4.21359 6.95518ZM4.31871 6.26641C4.71628 6.44901 4.71626 6.44905 4.71624 6.44909C4.71624 6.4491 4.71622 6.44914 4.71621 6.44916C4.71619 6.44921 4.71617 6.44925 4.71616 6.44927C4.71613 6.44933 4.71612 6.44936 4.71612 6.44935C4.71613 6.44934 4.71619 6.4492 4.71632 6.44893C4.71656 6.4484 4.71705 6.44735 4.71778 6.44579C4.71925 6.44266 4.7217 6.43746 4.72519 6.43014C4.73217 6.41549 4.74331 6.39236 4.7591 6.36034C4.79066 6.29631 4.84076 6.19678 4.91314 6.05856C5.05792 5.78209 5.29171 5.35111 5.6445 4.74009L4.88675 4.30257C4.52861 4.92283 4.28894 5.36439 4.13799 5.65264C4.06251 5.79678 4.00918 5.90266 3.97429 5.97343C3.95684 6.00883 3.94399 6.03545 3.93529 6.05371C3.93094 6.06284 3.92763 6.06988 3.92529 6.07488C3.92412 6.07738 3.92319 6.07937 3.9225 6.08086C3.92216 6.0816 3.92187 6.08222 3.92165 6.08271C3.92153 6.08295 3.92143 6.08317 3.92135 6.08335C3.92131 6.08344 3.92127 6.08353 3.92123 6.0836C3.92122 6.08364 3.92119 6.08369 3.92118 6.08371C3.92116 6.08376 3.92114 6.08381 4.31871 6.26641ZM5.6445 4.74009C5.99043 4.14098 6.50056 3.38344 6.96011 2.70946C7.18772 2.37563 7.4035 2.06141 7.57505 1.80472C7.74071 1.55684 7.88433 1.33461 7.95381 1.19566L7.17119 0.804344C7.13129 0.884136 7.02199 1.05754 6.84756 1.31853C6.67902 1.57072 6.46755 1.87863 6.23716 2.21653C5.78069 2.88601 5.25176 3.67039 4.88675 4.30257L5.6445 4.74009ZM7.5625 1.4375C7.84597 1.4375 7.99034 1.54047 8.05665 1.63677C8.12548 1.73673 8.1664 1.91108 8.07926 2.16002L8.90512 2.44912C9.06407 1.99505 9.03663 1.51712 8.77733 1.14054C8.51552 0.760315 8.07199 0.5625 7.5625 0.5625V1.4375ZM8.07922 2.16012C8.01211 2.35199 7.93932 2.53822 7.86386 2.72901C7.7893 2.91754 7.71118 3.11285 7.6388 3.31127C7.49287 3.71127 7.36337 4.14156 7.30668 4.63611L8.17598 4.73577C8.22182 4.3359 8.32721 3.97732 8.4608 3.61116C8.52818 3.42648 8.60098 3.24438 8.67754 3.05082C8.7532 2.85951 8.83172 2.65897 8.90515 2.44902L8.07922 2.16012ZM7.30659 4.63683C7.28613 4.81797 7.34246 4.99595 7.42085 5.12551C7.49184 5.24282 7.66563 5.45156 7.95871 5.45156V4.57656C8.03985 4.57656 8.09811 4.60774 8.12787 4.62982C8.15592 4.65063 8.16726 4.66886 8.16947 4.67252C8.17241 4.67738 8.17354 4.68045 8.17449 4.68418C8.17505 4.6864 8.17959 4.70384 8.17606 4.73505L7.30659 4.63683ZM7.92436 5.45021L11.4656 5.72912L11.5344 4.85682L7.99306 4.57791L7.92436 5.45021ZM11.5109 6.66029L9.32343 6.60561L9.30157 7.48033L11.4891 7.53502L11.5109 6.66029ZM9.35258 6.60731C9.14261 6.58799 9.02562 6.52728 8.96645 6.47274C8.91627 6.42647 8.875 6.3559 8.875 6.22266H8C8 6.57067 8.1228 6.88509 8.37339 7.11609C8.61501 7.33882 8.93552 7.44763 9.27242 7.47863L9.35258 6.60731ZM8.875 6.22266C8.875 6.03814 9.00639 5.86048 9.34064 5.83894L9.28436 4.96575C8.63424 5.00765 8 5.44468 8 6.22266H8.875ZM9.33435 5.8393L11.5218 5.72992L11.4782 4.85601L9.29065 4.96539L9.33435 5.8393ZM11.5 5.73047C11.7063 5.73047 11.9375 5.94827 11.9375 6.22266H12.8125C12.8125 5.53454 12.2562 4.85547 11.5 4.85547V5.73047ZM11.9375 6.22266V6.2273H12.8125V6.22266H11.9375ZM11.9375 6.22498C11.9369 6.34061 11.8905 6.45129 11.8085 6.53284L12.4256 7.1532C12.6716 6.90857 12.8107 6.57652 12.8125 6.22963L11.9375 6.22498ZM11.8085 6.53284C11.7266 6.61438 11.6156 6.66016 11.5 6.66016L11.5 7.53516C11.8469 7.53516 12.1797 7.39784 12.4256 7.1532L11.8085 6.53284ZM12.3828 8.43757L9.32031 8.38288L9.30469 9.25774L12.3672 9.31243L12.3828 8.43757ZM9.33289 8.38329C9.01241 8.36833 8.875 8.19008 8.875 8H8C8 8.77187 8.62822 9.22636 9.29211 9.25734L9.33289 8.38329ZM8.875 8C8.875 7.81494 9.00665 7.63743 9.34015 7.61631L9.28485 6.74306C8.63397 6.78428 8 7.22201 8 8H8.875ZM9.32031 7.61712L12.3828 7.56243L12.3672 6.68757L9.30469 6.74226L9.32031 7.61712ZM12.3736 7.5625C12.4899 7.56286 12.6013 7.60921 12.6836 7.69144L13.3023 7.07272C13.0566 6.82707 12.7238 6.68858 12.3764 6.6875L12.3736 7.5625ZM12.6836 7.69144C12.7658 7.77366 12.8121 7.88508 12.8125 8.00136L13.6875 7.99864C13.6864 7.65124 13.5479 7.31837 13.3023 7.07272L12.6836 7.69144ZM12.8125 7.99864C12.8121 8.11492 12.7658 8.22634 12.6836 8.30856L13.3023 8.92728C13.5479 8.68163 13.6864 8.34876 13.6875 8.00136L12.8125 7.99864ZM12.6836 8.30856C12.6013 8.39079 12.4899 8.43714 12.3736 8.4375L12.3764 9.3125C12.7238 9.31142 13.0566 9.17293 13.3023 8.92728L12.6836 8.30856ZM11.083 11.938L9.33298 11.8559L9.29202 12.73L11.042 12.812L11.083 11.938ZM9.35069 11.8571C9.1145 11.8364 9.00154 11.777 8.95175 11.7324C8.91529 11.6997 8.875 11.6427 8.875 11.5H8C8 11.8386 8.1101 12.1529 8.36758 12.3838C8.61174 12.6028 8.93628 12.6992 9.27431 12.7288L9.35069 11.8571ZM8.875 11.5C8.875 11.2967 9.03492 11.1172 9.3125 11.1172V10.2422C8.62758 10.2422 8 10.7408 8 11.5H8.875ZM9.32617 11.117L11.0762 11.0623L11.0488 10.1877L9.29883 10.2424L9.32617 11.117ZM11.0613 11.0625C11.1775 11.0628 11.2889 11.1092 11.3711 11.1914L11.9899 10.5726C11.7442 10.3269 11.4112 10.1885 11.0637 10.1875L11.0613 11.0625ZM11.3711 11.1914C11.4533 11.2736 11.4997 11.385 11.5 11.5012L12.375 11.4988C12.374 11.1513 12.2356 10.8183 11.9899 10.5726L11.3711 11.1914ZM11.5 11.4988C11.4997 11.615 11.4533 11.7264 11.3711 11.8086L11.9899 12.4274C12.2356 12.1817 12.374 11.8487 12.375 11.5012L11.5 11.4988ZM11.3711 11.8086C11.2889 11.8908 11.1775 11.9372 11.0613 11.9375L11.0637 12.8125C11.4112 12.8115 11.7442 12.6731 11.9899 12.4274L11.3711 11.8086ZM11.9466 10.1876L9.32161 10.1329L9.30339 11.0077L11.9284 11.0624L11.9466 10.1876ZM9.33182 10.1332C9.15451 10.1254 9.04086 10.0696 8.97701 10.0106C8.91807 9.95618 8.875 9.87582 8.875 9.75H8C8 10.1054 8.13466 10.4237 8.38335 10.6534C8.6271 10.8785 8.95096 10.9923 9.29318 11.0074L9.33182 10.1332ZM8.875 9.75C8.875 9.62515 8.91733 9.54737 8.97577 9.49381C9.04038 9.43459 9.15662 9.37752 9.33916 9.36637L9.28584 8.493C8.94884 8.51358 8.62758 8.62603 8.38459 8.84873C8.13541 9.07709 8 9.3936 8 9.75H8.875ZM9.32161 9.36709L11.9466 9.3124L11.9284 8.43759L9.30339 8.49228L9.32161 9.36709ZM11.9363 9.3125C12.0525 9.31282 12.1639 9.35915 12.2461 9.44136L12.8649 8.82264C12.6192 8.57694 12.2862 8.43847 11.9387 8.4375L11.9363 9.3125ZM12.2461 9.44136C12.3283 9.52356 12.3747 9.63497 12.375 9.75123L13.25 9.74877C13.249 9.4013 13.1106 9.06834 12.8649 8.82264L12.2461 9.44136ZM12.375 9.74877C12.3747 9.86503 12.3283 9.97644 12.2461 10.0586L12.8649 10.6774C13.1106 10.4317 13.249 10.0987 13.25 9.75123L12.375 9.74877ZM12.2461 10.0586C12.1639 10.1408 12.0525 10.1872 11.9363 10.1875L11.9387 11.0625C12.2862 11.0615 12.6192 10.9231 12.8649 10.6774L12.2461 10.0586Z"
                        fill={`${userLikedComment ? `#EB662B` : `#05073C`}`} />
                </svg>
                <p className="comments__comment__rate-helpful__text">Helpful</p>
              </div>
            </button>

            <button onClick={() => handleDislikeComment(comment._id.toString())}
                    className={`${disableBtn ? `cursor-not-allowed` : ``} btn comments__comment__rate not-helpful text-decoration-none ${userDislikedComment ? `highlighted` : ``}`}>
              <div className="comments__comment__rate-helpful flex flex-align-center">
                <span className="comments__comment__rate-helpful__count inline-block">{commentDislikes.length}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 14 13" fill="none">
                  <path className="comments__comment__rate-icon-like-path"
                        d="M5.10478 0.788604C4.87953 0.876044 4.76781 1.12953 4.85525 1.35478C4.94269 1.58002 5.19617 1.69174 5.42142 1.6043L5.10478 0.788604ZM9.65173 1.82276L9.40164 2.18174C9.47751 2.23459 9.56817 2.26205 9.66061 2.26017L9.65173 1.82276ZM13.1865 3.50132L13.624 3.49243L13.1865 3.50132ZM11.4991 6.59873L11.4902 6.16132L11.4991 6.59873ZM10.679 6.61539L10.6701 6.17797L10.6677 6.17803L10.679 6.61539ZM9.93927 7.05159L9.56201 6.83005C9.55309 6.84524 9.5451 6.86095 9.53807 6.87711L9.93927 7.05159ZM6.80311 12.3828L6.812 12.8202C6.97768 12.8168 7.12723 12.7202 7.19832 12.5705L6.80311 12.3828ZM5.84712 11.0974L6.2629 11.2335L6.26294 11.2334L5.84712 11.0974ZM6.54946 8.70125L6.98504 8.74224L6.9851 8.74152L6.54946 8.70125ZM6.32546 8.37761L6.29997 8.81436C6.31142 8.81503 6.32288 8.81525 6.33434 8.81502L6.32546 8.37761ZM2.74258 6.36637L2.74463 5.92873L2.7337 5.92896L2.74258 6.36637ZM4.93074 6.37662L4.96196 5.94023L4.9474 5.93919L4.93279 5.93912L4.93074 6.37662ZM4.96406 8.0169L4.99478 8.45337L5.00106 8.45283L4.96406 8.0169ZM1.88544 7.25431L1.44798 7.26087L1.44803 7.2632L1.88544 7.25431ZM1.83166 4.60716L1.83059 4.16957L1.82142 4.16978L1.83166 4.60716ZM4.89464 4.59964L4.90616 4.16211L4.89357 4.16214L4.89464 4.59964ZM4.92796 6.23992L4.94466 6.67711L4.95458 6.67673L4.96448 6.6759L4.92796 6.23992ZM1.86721 6.3568L1.87473 6.79433L1.8839 6.79398L1.86721 6.3568ZM0.974615 5.49975L0.537171 5.50728L0.537235 5.51L0.974615 5.49975ZM3.07281 1.08123L3.08441 0.64388L3.07356 0.643592L3.0627 0.643843L3.07281 1.08123ZM4.82411 1.1277L4.85344 0.691182L4.84459 0.690587L4.83572 0.690352L4.82411 1.1277ZM4.85688 2.74065L4.84799 2.30302L4.83434 2.30373L4.85688 2.74065ZM3.10835 2.83086L3.11601 3.2683L3.12346 3.26817L3.13089 3.26778L3.10835 2.83086ZM2.21576 1.97382L1.77832 1.98148L1.77838 1.98393L2.21576 1.97382ZM2.23353 2.84864L2.23376 2.41101L2.22342 2.41125L2.23353 2.84864ZM4.8591 2.85L4.86954 2.4125L4.85933 2.4125L4.8591 2.85ZM4.89242 4.49029L4.91042 4.92742L4.91919 4.92705L4.92795 4.92634L4.89242 4.49029ZM2.26907 4.59828L2.27674 5.03583L2.28707 5.03541L2.26907 4.59828ZM1.37648 3.74123L0.939043 3.74889L0.939099 3.75134L1.37648 3.74123ZM5.2631 1.19645C5.42142 1.6043 5.42123 1.60437 5.42104 1.60445C5.42098 1.60447 5.4208 1.60454 5.42067 1.60459C5.42043 1.60468 5.4202 1.60478 5.41997 1.60486C5.41951 1.60504 5.41908 1.6052 5.41868 1.60536C5.41787 1.60566 5.41718 1.60592 5.4166 1.60614C5.41543 1.60657 5.41473 1.60682 5.41448 1.60691C5.414 1.60708 5.41538 1.60658 5.41874 1.6055C5.42547 1.60332 5.44008 1.59881 5.46349 1.59261C5.51036 1.58019 5.59219 1.56107 5.7162 1.54039C5.96447 1.49897 6.37962 1.45164 7.01838 1.43867L7.00061 0.563846C6.32714 0.577527 5.8691 0.627793 5.57223 0.677313C5.42366 0.702095 5.31494 0.726777 5.23939 0.746794C5.2016 0.756808 5.17204 0.765671 5.14989 0.772822C5.13882 0.776397 5.12959 0.779546 5.12211 0.7822C5.11837 0.783526 5.11506 0.784729 5.11218 0.785799C5.11073 0.786334 5.1094 0.786836 5.10816 0.787304C5.10755 0.787538 5.10696 0.787763 5.10639 0.78798C5.10611 0.788089 5.10583 0.788194 5.10557 0.788298C5.10543 0.788351 5.10523 0.788427 5.10517 0.788453C5.10497 0.788529 5.10478 0.788604 5.2631 1.19645ZM7.01838 1.43867C8.20457 1.41457 8.83395 1.78625 9.40164 2.18174L9.90181 1.46379C9.24885 1.00889 8.43888 0.534629 7.00061 0.563846L7.01838 1.43867ZM9.66061 2.26017L11.4103 2.22463L11.3925 1.34981L9.64284 1.38535L9.66061 2.26017ZM11.4103 2.22463C11.7583 2.21756 12.0949 2.34903 12.3459 2.59012L12.952 1.95897C12.5335 1.55715 11.9725 1.33803 11.3925 1.34981L11.4103 2.22463ZM12.3459 2.59012C12.597 2.83122 12.7421 3.16218 12.7491 3.5102L13.624 3.49243C13.6122 2.91239 13.3705 2.36079 12.952 1.95897L12.3459 2.59012ZM12.7491 3.5102L12.7758 4.82243L13.6506 4.80466L13.624 3.49243L12.7491 3.5102ZM12.7758 4.82243C12.7829 5.17046 12.6514 5.50703 12.4103 5.75812L13.0415 6.36415C13.4433 5.94567 13.6624 5.3847 13.6506 4.80466L12.7758 4.82243ZM12.4103 5.75812C12.1692 6.00921 11.8382 6.15425 11.4902 6.16132L11.508 7.03614C12.088 7.02435 12.6396 6.78263 13.0415 6.36415L12.4103 5.75812ZM11.4902 6.16132L10.6701 6.17798L10.6878 7.0528L11.508 7.03614L11.4902 6.16132ZM10.6677 6.17803C10.4432 6.18384 10.2238 6.24674 10.0304 6.36082L10.4748 7.11453C10.5402 7.07597 10.6144 7.0547 10.6903 7.05274L10.6677 6.17803ZM10.0304 6.36082C9.83693 6.4749 9.67574 6.63639 9.56201 6.83005L10.3165 7.27314C10.355 7.20768 10.4095 7.15309 10.4748 7.11453L10.0304 6.36082ZM9.93927 7.05159C9.53807 6.87711 9.53809 6.87706 9.53811 6.87702C9.53811 6.87701 9.53813 6.87697 9.53814 6.87695C9.53816 6.8769 9.53818 6.87687 9.53819 6.87684C9.53822 6.87678 9.53823 6.87675 9.53822 6.87676C9.53822 6.87677 9.53816 6.87691 9.53804 6.87718C9.5378 6.87772 9.53734 6.87877 9.53664 6.88035C9.53524 6.88351 9.5329 6.88876 9.52956 6.89615C9.52287 6.91094 9.5122 6.93429 9.49707 6.96662C9.46681 7.03128 9.41874 7.13181 9.34919 7.27147C9.21005 7.55082 8.98507 7.98646 8.64475 8.60452L9.41124 9.02657C9.75671 8.39915 9.98736 7.95282 10.1324 7.66156C10.205 7.51592 10.2561 7.40898 10.2896 7.33751C10.3063 7.30177 10.3186 7.27489 10.3269 7.25646C10.3311 7.24724 10.3343 7.24013 10.3365 7.23509C10.3376 7.23257 10.3385 7.23056 10.3392 7.22906C10.3395 7.22831 10.3398 7.22769 10.34 7.22719C10.3401 7.22694 10.3402 7.22673 10.3403 7.22654C10.3403 7.22645 10.3403 7.22636 10.3404 7.22629C10.3404 7.22625 10.3404 7.2262 10.3404 7.22618C10.3404 7.22613 10.3405 7.22608 9.93927 7.05159ZM8.64475 8.60452C8.31107 9.21053 7.81642 9.97828 7.37066 10.6615C7.14987 10.9998 6.94052 11.3184 6.77422 11.5785C6.61363 11.8297 6.47455 12.0548 6.40791 12.1951L7.19832 12.5705C7.23658 12.4899 7.34235 12.3143 7.51144 12.0498C7.67482 11.7942 7.87999 11.4821 8.10347 11.1396C8.54625 10.461 9.05914 9.66603 9.41124 9.02657L8.64475 8.60452ZM6.79423 11.9454C6.51081 11.9511 6.36438 11.8511 6.29613 11.7562C6.22529 11.6577 6.18083 11.4842 6.2629 11.2335L5.43134 10.9612C5.28164 11.4184 5.31878 11.8957 5.58568 12.267C5.85516 12.6418 6.30261 12.8306 6.812 12.8202L6.79423 11.9454ZM6.26294 11.2334C6.32613 11.0402 6.39513 10.8525 6.4667 10.6603C6.53741 10.4703 6.61155 10.2734 6.67989 10.0736C6.81767 9.67067 6.93839 9.23784 6.98503 8.74224L6.11388 8.66026C6.07617 9.06097 5.97809 9.42162 5.85196 9.79042C5.78835 9.97643 5.71926 10.16 5.64665 10.355C5.57489 10.5478 5.50046 10.7499 5.4313 10.9613L6.26294 11.2334ZM6.9851 8.74152C7.00188 8.56 6.94195 8.3832 6.86094 8.25526C6.78759 8.13941 6.60959 7.93425 6.31657 7.9402L6.33434 8.81502C6.25322 8.81667 6.19433 8.78667 6.16414 8.76521C6.13567 8.74497 6.12397 8.72697 6.12168 8.72336C6.11864 8.71856 6.11745 8.71551 6.11642 8.7118C6.11581 8.7096 6.11093 8.69225 6.11382 8.66098L6.9851 8.74152ZM6.35094 7.94085L2.80472 7.73392L2.75375 8.60744L6.29997 8.81436L6.35094 7.94085ZM2.74053 6.80386L4.92869 6.81411L4.93279 5.93912L2.74463 5.92887L2.74053 6.80386ZM4.89952 6.813C5.10984 6.82805 5.22804 6.88637 5.2883 6.9397C5.33941 6.98493 5.3821 7.05466 5.38481 7.18787L6.25963 7.1701C6.25256 6.82216 6.1234 6.5103 5.86817 6.28443C5.62208 6.06666 5.29943 5.96438 4.96196 5.94023L4.89952 6.813ZM5.38481 7.18787C5.38856 7.37236 5.2608 7.55264 4.92706 7.58097L5.00106 8.45283C5.6502 8.39774 6.27543 7.94792 6.25963 7.1701L5.38481 7.18787ZM4.93334 7.58048L2.74852 7.73426L2.80995 8.6071L4.99478 8.45332L4.93334 7.58048ZM2.77035 7.73327C2.56412 7.73746 2.32851 7.5244 2.32294 7.25007L1.44812 7.26784C1.4621 7.95581 2.03204 8.62345 2.78812 8.60809L2.77035 7.73327ZM2.32294 7.25007L2.32285 7.24542L1.44803 7.2632L1.44812 7.26784L2.32294 7.25007ZM2.32289 7.24775C2.32115 7.13213 2.36526 7.02053 2.44557 6.93734L1.81603 6.32963C1.57511 6.57921 1.44278 6.91402 1.44799 7.26087L2.32289 7.24775ZM2.44557 6.93734C2.52588 6.85414 2.63585 6.80612 2.75146 6.80378L2.7337 5.92896C2.38688 5.936 2.05695 6.08005 1.81603 6.32963L2.44557 6.93734ZM1.83274 5.04466L4.89572 5.03714L4.89357 4.16214L1.83059 4.16966L1.83274 5.04466ZM4.88313 5.03699C5.20385 5.04543 5.34485 5.22086 5.34871 5.4109L6.22353 5.39312C6.20786 4.62141 5.57054 4.17978 4.90616 4.16229L4.88313 5.03699ZM5.34871 5.4109C5.35247 5.59591 5.22445 5.77606 4.89145 5.80395L4.96448 6.6759C5.61438 6.62147 6.23933 6.17095 6.22353 5.39312L5.34871 5.4109ZM4.91127 5.80274L1.85051 5.91962L1.8839 6.79398L4.94466 6.67711L4.91127 5.80274ZM1.85968 5.91936C1.74341 5.92136 1.63108 5.87728 1.5472 5.79675L0.941177 6.4279C1.19177 6.66852 1.52738 6.80021 1.87473 6.79424L1.85968 5.91936ZM1.5472 5.79675C1.46332 5.71621 1.41472 5.60576 1.412 5.48951L0.537235 5.51C0.545371 5.85731 0.690587 6.18729 0.941177 6.4279L1.5472 5.79675ZM1.41205 5.49223C1.41005 5.37596 1.45413 5.26362 1.53467 5.17975L0.903511 4.57372C0.662899 4.82431 0.531204 5.15992 0.537179 5.50728L1.41205 5.49223ZM1.53467 5.17975C1.61521 5.09587 1.72566 5.04726 1.84191 5.04454L1.82142 4.16978C1.47411 4.17792 1.14412 4.32313 0.903511 4.57372L1.53467 5.17975ZM3.0612 1.51857L4.81251 1.56504L4.83572 0.690352L3.08441 0.64388L3.0612 1.51857ZM4.79479 1.56421C5.03134 1.58011 5.14549 1.63723 5.19617 1.68086C5.23329 1.71281 5.27473 1.76895 5.27763 1.91162L6.15245 1.89385C6.14557 1.55536 6.02911 1.24331 5.76699 1.01769C5.51844 0.803747 5.19201 0.713929 4.85344 0.691182L4.79479 1.56421ZM5.27763 1.91162C5.28176 2.11491 5.12552 2.2976 4.84799 2.30324L4.86576 3.17806C5.55054 3.16415 6.16787 2.65285 6.15245 1.89385L5.27763 1.91162ZM4.83434 2.30373L3.08581 2.39395L3.13089 3.26778L4.87942 3.17757L4.83434 2.30373ZM3.10069 2.39343C2.98445 2.39547 2.87213 2.35141 2.78827 2.27089L2.18224 2.90205C2.43288 3.14271 2.76859 3.27438 3.11601 3.2683L3.10069 2.39343ZM2.78827 2.27089C2.70441 2.19037 2.65583 2.07993 2.65314 1.96371L1.77838 1.98393C1.78641 2.33131 1.9316 2.66139 2.18224 2.90205L2.78827 2.27089ZM2.65319 1.96616C2.65116 1.84991 2.69521 1.73759 2.77573 1.65374L2.14457 1.04771C1.90391 1.29835 1.77224 1.63406 1.77833 1.98148L2.65319 1.96616ZM2.77573 1.65374C2.85625 1.56988 2.96669 1.5213 3.08292 1.51861L3.0627 0.643843C2.71532 0.651873 2.38524 0.797068 2.14457 1.04771L2.77573 1.65374ZM2.2333 3.28614L4.85887 3.2875L4.85933 2.4125L2.23376 2.41114L2.2333 3.28614ZM4.84866 3.28737C5.0261 3.29161 5.14085 3.3451 5.20589 3.40277C5.26592 3.45599 5.31061 3.53546 5.31317 3.66126L6.18799 3.64349C6.18077 3.28813 6.03967 2.97262 5.78638 2.74805C5.53809 2.52792 5.21199 2.4208 4.86954 2.41262L4.84866 3.28737ZM5.31317 3.66126C5.31571 3.78608 5.27497 3.86471 5.21763 3.91944C5.15423 3.97996 5.03917 4.03938 4.8569 4.05423L4.92795 4.92634C5.26445 4.89893 5.58336 4.77997 5.82179 4.55238C6.06628 4.31901 6.19523 3.99982 6.18799 3.64349L5.31317 3.66126ZM4.87443 4.05316L2.25108 4.16115L2.28707 5.03541L4.91042 4.92742L4.87443 4.05316ZM2.26141 4.16084C2.14517 4.16288 2.03285 4.11882 1.94899 4.0383L1.34297 4.66946C1.59361 4.91012 1.92932 5.04179 2.27673 5.03571L2.26141 4.16084ZM1.94899 4.0383C1.86513 3.95778 1.81655 3.84735 1.81387 3.73112L0.939099 3.75134C0.947129 4.09872 1.09233 4.4288 1.34297 4.66946L1.94899 4.0383ZM1.81392 3.73357C1.81188 3.61732 1.85594 3.505 1.93645 3.42115L1.3053 2.81512C1.06464 3.06576 0.932965 3.40147 0.93905 3.74889L1.81392 3.73357ZM1.93645 3.42115C2.01697 3.33729 2.12741 3.28871 2.24364 3.28602L2.22342 2.41125C1.87604 2.41928 1.54596 2.56448 1.3053 2.81512L1.93645 3.42115Z"
                        fill={`${userDislikedComment ? `#EB662B` : `#05073C`}`} />
                </svg>
                <p className="comments__comment__rate-helpful__text">Not Helpful</p>
              </div>
            </button>
          </div>
          <>
            <div className="comments__comment__date-container">
              {session.user.email.trim() !== `` && (
                <div
                  className={`comments__comment__report-abuse flex flex-align-center gap-sm ${userReportedAbuse ? `cursor-not-allowed` : ``}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 11 11" fill="none">
                    <path className="comments__comment__report-abuse__path"
                          d="M5.50024 8.25036C5.65608 8.25036 5.78681 8.19756 5.89241 8.09196C5.99801 7.98635 6.05063 7.85581 6.05027 7.70034C6.0499 7.54487 5.9971 7.41433 5.89186 7.30872C5.78662 7.20312 5.65608 7.15032 5.50024 7.15032C5.3444 7.15032 5.21386 7.20312 5.10863 7.30872C5.00339 7.41433 4.95059 7.54487 4.95022 7.70034C4.94985 7.85581 5.00265 7.98654 5.10863 8.09251C5.2146 8.19848 5.34514 8.2511 5.50024 8.25036ZM4.95022 6.05027H6.05027V2.75012H4.95022V6.05027ZM5.50024 11.0005C4.73938 11.0005 4.02434 10.856 3.35515 10.5671C2.68595 10.2781 2.10384 9.88632 1.60882 9.39166C1.1138 8.89701 0.721999 8.3149 0.43342 7.64534C0.14484 6.97577 0.000367379 6.26074 6.96233e-07 5.50024C-0.000365987 4.73974 0.144107 4.02471 0.43342 3.35515C0.722733 2.68559 1.11453 2.10348 1.60882 1.60882C2.10311 1.11417 2.68522 0.722365 3.35515 0.433419C4.02508 0.144473 4.74011 0 5.50024 0C6.26038 0 6.97541 0.144473 7.64534 0.433419C8.31527 0.722365 8.89738 1.11417 9.39166 1.60882C9.88595 2.10348 10.2779 2.68559 10.5676 3.35515C10.8573 4.02471 11.0016 4.73974 11.0005 5.50024C10.9994 6.26074 10.8549 6.97577 10.5671 7.64534C10.2792 8.3149 9.88742 8.89701 9.39166 9.39166C8.89591 9.88632 8.3138 10.2783 7.64534 10.5676C6.97687 10.8569 6.26184 11.0012 5.50024 11.0005Z"
                          fill={`${!userReportedAbuse ? `#EB2B2B` : `#989898`}`} />
                  </svg>
                  <button disabled={userReportedAbuse} onClick={handleReportAbuse}
                          className={`btn comments__comment__report-abuse__text 
                          ${userReportedAbuse ? `comments__comment__report-abuse__text-reported font-weight-bold cursor-not-allowed` : ``}`}>
                    {userReportedAbuse ? `Reported` : `Report Abuse`}
                  </button>
                </div>
              )}
              <div className="comments__comment__date">{formattedDate}</div>
            </div>
          </>
        </div>
      </motion.div>
    </>
  );
}
