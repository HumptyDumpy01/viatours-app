// 'use client';
import './UserTourPurchases.scss';
import React, { useEffect, useState } from 'react';
import SortBy from '@/components/UI/SortBy/SortBy';
import { UserOrdersType } from '@/components/account-settings/AccountSettingsContainer';
import UserOrder from '@/components/account-settings/contents/user-tour-purchases/UserOrder';
import { AnimatePresence, motion } from 'framer-motion';
import Pagination from '@/components/UI/Pagnation/Pagination';

type UserTourPurchasesType = {
  userOrders: UserOrdersType[] | [];
  // children: ReactNode;
}


export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5
    }
  }
};

export const item = {
  transition: { type: 'spring', stiffness: 100, damping: 10 },
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1 }
};

export default function UserTourPurchases({ userOrders }: UserTourPurchasesType) {

  const [filteredOrderItems, setFilteredOrderItems] = useState<UserOrdersType[]>(userOrders);
  const [originalOrderItems, setOriginalOrderItems] = useState<UserOrdersType[]>([...userOrders]);
  const [userOrderItems, setUserOrderItems] = useState<UserOrdersType[]>(userOrders);
  const orderItemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastWishlistItem = currentPage * orderItemsPerPage;
  const indexOfFirstNotification = indexOfLastWishlistItem - orderItemsPerPage;


  useEffect(() => {
    setUserOrderItems(filteredOrderItems.slice(indexOfFirstNotification, indexOfLastWishlistItem));
  }, [currentPage, filteredOrderItems]);

  function handleSortUserOrders(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value as 'newest' | 'oldest' | 'price:descending' |
      'price:ascending' | `pending` | `scheduled` | `cancelled` | `refunded` | `booked` | `ongoing` | `completed`;
    let sortedUserOrders = [...originalOrderItems];

    if (value === `newest`) {
      sortedUserOrders = sortedUserOrders.sort((a, b) => {

        return new Date(b.extraDetails.createdAt).getTime() - new Date(a.extraDetails.createdAt).getTime();
      });
    }
    if (value === `oldest`) {
      sortedUserOrders = sortedUserOrders.sort((a, b) => {
        return new Date(a.extraDetails.createdAt).getTime() - new Date(b.extraDetails.createdAt).getTime();
      });
    }
    if (value === `price:descending`) {
      sortedUserOrders = sortedUserOrders.sort((a, b) => {
        return b.totalPrice - a.totalPrice;
      });
    }
    if (value === `price:ascending`) {
      sortedUserOrders = sortedUserOrders.sort((a, b) => {
        return a.totalPrice - b.totalPrice;
      });
    }

    switch (value) {
      case 'scheduled':
      case 'refunded':
      case 'ongoing':
      case 'booked':
      case 'cancelled':
      case 'completed':
      case 'pending':
        sortedUserOrders = sortedUserOrders.filter((order) => order.extraDetails.state.status === value);
        break;
      // other cases for sorting by date or price can be added here
    }
    setFilteredOrderItems(sortedUserOrders);
    setCurrentPage(1);

  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      exit={{ opacity: 0, y: 200 }}
      viewport={{ once: false }}
      className="tour-purchases">
      <div className="tour-purchases__heading-wrapper flex flex-space-between">
        <motion.h2
          whileHover={{ scale: 1.1, backfaceVisibility: `hidden` }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: `spring`, stiffness: 260, damping: 20 }}
          className="account-settings__content__title">Tour Purchases
        </motion.h2>
        <SortBy options={
          [{ value: `newest`, label: `Newest` },
            { value: `oldest`, label: `Oldest` },
            { value: `price:descending`, label: `Price: High to Low` },
            { value: `price:ascending`, label: `Price: Low to High` },
            { value: `booked`, label: `Booked` },
            { value: `cancelled`, label: `Cancelled` },
            { value: `completed`, label: `Completed` },
            { value: `pending`, label: `Pending` },
            { value: `scheduled`, label: `Scheduled` },
            { value: `ongoing`, label: `Ongoing` },
            { value: `refunded`, label: `Refunded` }
          ]} handleOnChange={handleSortUserOrders} disabled={userOrders.length === 0} />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="tour-purchases__cards-wrapper">
        {filteredOrderItems.length > 0 && filteredOrderItems.map(function(order, index) {
          const startingIndex = (currentPage - 1) * orderItemsPerPage;
          return (
            <AnimatePresence>
              <UserOrder counter={startingIndex + index + 1} key={order._id} order={order} />
            </AnimatePresence>
          );
        })} {userOrderItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="tour-purchases__no-orders">
          <p>No tour purchases yet! Feel free to explore our tours and book your next adventure.</p>
        </motion.div>
      )}
      </motion.div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={filteredOrderItems.length}
                  itemsPerPage={orderItemsPerPage} />
    </motion.div>
  );
}
