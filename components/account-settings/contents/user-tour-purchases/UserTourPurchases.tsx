// 'use client';
import './UserTourPurchases.scss';
import React, { useEffect, useState } from 'react';
import SortBy from '@/components/UI/SortBy/SortBy';
import { UserOrdersType } from '@/components/account-settings/AccountSettingsContainer';
import UserOrder from '@/components/account-settings/contents/user-tour-purchases/UserOrder';
import { motion } from 'framer-motion';
import Pagination from '@/components/UI/Pagnation/Pagination';

type UserTourPurchasesType = {
  userOrders: UserOrdersType[] | [];
  // children: ReactNode;
}


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5
    }
  }
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

  function handleSortUserOrders() {
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      viewport={{ once: false }}
      className="tour-purchases">
      <div className="tour-purchases__heading-wrapper flex flex-space-between">
        <motion.h2
          whileHover={{ scale: 1.1, backfaceVisibility: `hidden` }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: `spring`, stiffness: 260, damping: 20 }}
          className="secondary-heading account-settings__heading">Tour Purchases
        </motion.h2>
        <SortBy options={
          [{ value: `newest`, label: `Newest` },
            { value: `oldest`, label: `Oldest` },
            { value: `price:descending`, label: `Price: High to Low` },
            { value: `price:ascending`, label: `Price: Low to High` }
          ]} handleOnChange={handleSortUserOrders} disabled={userOrders.length === 0} />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="tour-purchases__cards-wrapper">
        {userOrderItems.length > 0 && userOrderItems.map(function(order) {
          return (
            <UserOrder counter={userOrderItems.length} key={order._id} order={order} />
          );
        })}
        {userOrderItems.length === 0 && (
          <div className="tour-purchases__no-orders">
            <p>No tour purchases yet! Feel free to explore our tours and book your next adventure.</p>
          </div>
        )}

      </motion.div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={filteredOrderItems.length}
                  itemsPerPage={orderItemsPerPage} />
    </motion.div>
  );
}
