'use client';

import './TourStats.scss';
import Stars from '@/components/UI/Layout/Stars';
import IconIon from '@/components/UI/IonIcon/IconIon';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';

type TourStatsType = {
  info: {
    rating: number;
    totalReviews: number;
    city: string;
    country: string;
    booked: number;
    views: number;

  }
  // children: ReactNode;
}

export default function TourStats({ info }: TourStatsType) {

  const { data: session, status } = useSession();
  const router = useRouter();

  const pathname = usePathname();
  const pathParts = pathname.split('/');
  const tourId = pathParts[pathParts.length - 1];

  const [isUserAddedTourToWishlist, setIsUserAddedTourToWishlist] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isStatusLoading = status === 'loading';

  useEffect(() => {
    if (session && session.user?.email) {
      setIsLoading(true);
      //  create a function to check if the user has added this tour to the wishlist already,
      const result = fetch(`/api/find-wishlisted-tour`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tourId,
          userEmail: session.user.email
        })

      }).then(res => res.json()).then(data => {

        console.log(`whether user has this tour in wishlist:`, data.result);
        setIsUserAddedTourToWishlist(data.result);
        setIsLoading(false);
      });
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }

  }, [session]);

  function handleAddToWishlist() {
    if (!session) {
      // redirect to sign in page, with the new tab
      router.push('/login');
      // this would open the sign-in page in a new tab
      // window.open('/login', '_blank');
    } else {
      //  create a server function to ex ADD/REMOVE(if already added)
      //  the tour to the wishlist in mongodb.ts.
      //  use API route then. You should check the currently active tourId, and the user's email
      //  from the session. Then push this  objectId(tourId) to wishlist array in the user's document.
      setIsLoading(true);
      const result = fetch(`/api/handle-remove-add-to-wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isWishlisted: isUserAddedTourToWishlist,
          tourId,
          userEmail: session.user!.email
        })

      }).then(res => res.json()).then(data => {
        if (data.error) {
          setIsLoading(false);
          console.error(`Failed to add/remove the tour to/from the wishlist!`);
          return;
        }
        console.log(`Data from the server: `, data);
        setIsUserAddedTourToWishlist(data.status === `ADDED`);
        setIsLoading(false);

      }).catch(e => {
        console.error(`Failed to add/remove the tour to/from the wishlist: ${e}`);
        setIsLoading(false);
      });
    }
  }

  return (
    <>
      <div className="description__stats flex">
        <div className="description__stats-rating flex">
          <Stars rating={info.rating} />
          <div className="description__stats-rating--rate flex">
            <p className="description__stats-rating--rate">{info.rating.toFixed(1)}</p>
            <p className="description__stats-rating--reviews">({info.totalReviews})</p>
          </div>
        </div>
        <div className="description__stats-country flex">
          <p className="paragraph">{info.city}, {info.country}</p>
        </div>
        <div className="description__stats-booked">
          <p
            className="paragraph">{info.views < 1000 ? info.views : `${(info.views / 1000).toFixed()}K+`} Views</p>
        </div>
        <div className="description__stats-booked">
          <p
            className="paragraph">{info.booked < 1000 ? info.booked : `${(info.booked / 1000).toFixed()}K+`} booked</p>
        </div>
      </div>
      <div className="description__stats-share flex flex-align-center">
        <button className="paragraph--share">
          {/*<ion-icon name="arrow-redo" className="icon icon--share"></ion-icon>*/}
          <IconIon type={`arrowRedo`} className="icon icon--share"></IconIon>
          Share
        </button>
        {(!isStatusLoading && !isLoading) && (
          <button className={`paragraph--wishlist ${isUserAddedTourToWishlist ? `highlighted` : ``}`}
                  onClick={handleAddToWishlist}>
            {/*<ion-icon name="bookmark-outline" className="icon icon--bookmark"></ion-icon>*/}
            <IconIon type={`bookmarkOutline`} className="icon icon--bookmark"></IconIon>
            {isUserAddedTourToWishlist ? `Wishlisted` : `Wishlist`}
          </button>
        )}
        {(isStatusLoading || isLoading) && (
          <>
            <Skeleton variant="text" width={70} height={20} />
          </>
        )}
      </div>
    </>
  );
}
