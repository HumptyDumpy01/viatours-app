// 'use client';
import './UserTourPurchases.scss';
import React from 'react';
import SortBy from '@/components/UI/SortBy/SortBy';
import { UserOrdersType } from '@/components/account-settings/AccountSettingsContainer';
import UserOrder from '@/components/account-settings/contents/user-tour-purchases/UserOrder';
import { motion } from 'framer-motion';

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
        {userOrders.map(function(order) {
          return (
            <UserOrder counter={userOrders.length} key={order._id} order={order} />
          );
        })}

      </motion.div>
    </motion.div>
  );
}
