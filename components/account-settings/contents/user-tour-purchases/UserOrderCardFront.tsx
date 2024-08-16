// 'use client';

import { UserOrdersType } from '@/components/account-settings/AccountSettingsContainer';
import { CldImage } from 'next-cloudinary';
import Stars from '@/components/UI/Layout/Stars';
import { motion } from 'framer-motion';

type UserOrderCardFrontType = {
  openCard: boolean;
  order: UserOrdersType;
  viewportIsLessThan593px: boolean;
  handleOpenCard: (openCard: boolean) => void;
  // children: ReactNode;
}

export default function
  UserOrderCardFront({
                       openCard,
                       order,
                       handleOpenCard,
                       viewportIsLessThan593px
                     }: UserOrderCardFrontType) {

  window.addEventListener(`resize`, () => {
    if (window.innerWidth > 593) {
      handleOpenCard(false
      );
    }
  });

  return (
    <motion.div
      // initial={{ transform: `${openCard ? `rotateY(180deg)` : `rotateY(0deg)`}`, opacity: 0 }}
      initial={{ y: 200, scale: 0.8 }}
      // animate={{ transform: `rotateY(${openCard ? `180deg` : `0deg`})`, opacity: 1 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ y: -200 }}
      transition={{ type: `spring`, stiffness: 260, damping: 20 }}
      className={`tour-purchases__card-details-1--front ${openCard ? `pointer-events-none` : ``}`}>
      <div className="tour-purchases__card-tour-img">
        <CldImage
          width={200}
          height={160}
          className="tour-purchases__card-tour-img"
          crop="fill"
          alt={order.tour.title}
          src={`${order.tour.image}`}
        />
        <svg className="tour-purchases__card-tour-img__map" xmlns="http://www.w3.org/2000/svg" width="31"
             height="31"
             viewBox="0 0 31 31" fill="none">
          <circle cx="15.0098" cy="15.0098" r="15.0098" fill="#4A43C4" />
          <path
            d="M16.7357 13.6526L18.069 14.9026M18.069 14.9026L19.4023 16.1526M18.069 14.9026L19.4023 13.6526M18.069 14.9026L16.7357 16.1526M13.4023 9.90137L9.40234 12.4014V19.9014L13.4023 18.0264L17.4023 19.9014L21.4023 17.4014V9.90137L17.4023 11.7764L13.4023 9.90137Z"
            stroke="#EFF7F1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="padding-7px">

        <div className="tour-purchases__card-tour-location flex gap-sm flex-align-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 12 15" fill="none">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M6.53664 11.9608C9.08303 11.5297 11.0253 9.31087 11.0253 6.64212C11.0253 3.66494 8.60825 1.24787 5.63107 1.24787C2.65389 1.24787 0.236832 3.66494 0.236832 6.64212C0.236832 9.31087 2.17912 11.5297 4.72551 11.9608L5.63107 13.9981L6.53664 11.9608ZM5.63107 4.68071C4.54852 4.68071 3.66937 5.55957 3.66937 6.64212C3.66937 7.72466 4.54852 8.60384 5.63107 8.60384C6.71362 8.60384 7.59277 7.72466 7.59277 6.64212C7.59277 5.55957 6.71362 4.68071 5.63107 4.68071Z"
                  fill="#FDF0EA" />
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M4.28314 5.64018C4.08724 5.91244 3.97163 6.2466 3.97163 6.60753C3.97163 7.52297 4.71509 8.26644 5.63051 8.26644C6.54596 8.26644 7.28942 7.52297 7.28942 6.60753C7.28942 5.69211 6.54596 4.94864 5.63051 4.94864C5.36182 4.94864 5.10794 5.0127 4.8835 5.12635C4.734 5.20199 4.55095 5.14206 4.47529 4.99236C4.39965 4.84286 4.45958 4.65998 4.60928 4.58434C4.91615 4.42894 5.26317 4.34133 5.63051 4.34133C6.88138 4.34133 7.89673 5.35669 7.89673 6.60753C7.89673 7.85839 6.88138 8.87375 5.63051 8.87375C4.37967 8.87375 3.36432 7.85839 3.36432 6.60753C3.36432 6.11423 3.52219 5.65749 3.79018 5.28532C3.88812 5.14917 4.07814 5.11832 4.2141 5.21626C4.35023 5.31421 4.38108 5.50406 4.28314 5.64018Z"
                  fill="#EB662B" />
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M9.99117 9.28121C10.4931 8.4925 10.7838 7.55674 10.7838 6.55383C10.7838 3.74557 8.50346 1.46523 5.6952 1.46523C2.88694 1.46523 0.606597 3.74557 0.606597 6.55383C0.606597 9.07141 2.43841 11.1645 4.84081 11.5709C4.94079 11.588 5.02609 11.6537 5.06726 11.7468L5.6952 13.1595L6.32312 11.7468C6.36429 11.6537 6.44959 11.588 6.5496 11.5709C7.36183 11.4336 8.10835 11.1032 8.74118 10.6292C8.875 10.5287 9.0657 10.5562 9.16617 10.69C9.26617 10.8243 9.23921 11.0145 9.1049 11.115C8.43875 11.614 7.65936 11.9708 6.81232 12.1394C6.8128 12.1394 5.97263 14.0296 5.97263 14.0296C5.92362 14.1394 5.81529 14.21 5.6952 14.21C5.5751 14.21 5.46676 14.1394 5.41775 14.0296L4.57758 12.1394C1.96883 11.6199 -0.000228882 9.31502 -0.000228882 6.55383C-0.000228882 3.41028 2.55165 0.858398 5.6952 0.858398C8.83873 0.858398 11.3906 3.41028 11.3906 6.55383C11.3906 7.67684 11.0647 8.72437 10.5029 9.60719C10.4127 9.74836 10.225 9.79002 10.0838 9.70033C9.94264 9.61012 9.90096 9.42239 9.99117 9.28121Z"
                  fill="#EB662B" />
            <path
              d="M9.65349 10.5181C9.48583 10.5181 9.3499 10.3822 9.3499 10.2145C9.3499 10.0469 9.48583 9.91095 9.65349 9.91095C9.82115 9.91095 9.95706 10.0469 9.95706 10.2145C9.95706 10.3822 9.82115 10.5181 9.65349 10.5181Z"
              fill="#EB662B" />
          </svg>
          <p className="tour-purchases__card-tour-location-name">{order.tour.location}</p>
        </div>
        <h2 className="tour-purchases__card-tour--title">{order.tour.title}</h2>
        <div className="tour-purchases__card-tour-rating-wrapper flex gap-sm flex-align-center">
          <div className={`tour-purchases__card-tour-rating-stars`}>
            <Stars rating={order.tour.rating} />
          </div>
          <div className="tour-purchases__card-tour-rating-count-wrapper">
                    <span className="tour-purchases__card-tour-rating-count inline-block">{order.tour.rating.toFixed(1)}
                      <span
                        className="inline-block font-weight-reg">({order.tour.reviews})</span></span>
          </div>
        </div>
        <div
          className="tour-purchases__card-tour-price-see-more-and-duration flex flex-space-between flex-align-center">
          <p className="tour-purchases__card-tour-duration">{order.tour.duration}</p>
          {viewportIsLessThan593px && (
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={viewportIsLessThan593px ? () => handleOpenCard(true) : undefined}
              className="tour-purchases__card-tour-see-more text-decoration-none">See
              more
            </motion.button>
          )}
          {!viewportIsLessThan593px && (
            <motion.a
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              href={`/tours/${order.tour._id}`}
              target={`_blank`}
              onClick={viewportIsLessThan593px ? () => handleOpenCard(true) : undefined}
              className="tour-purchases__card-tour-see-more text-decoration-none">See
              more
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
