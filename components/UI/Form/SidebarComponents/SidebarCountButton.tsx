// 'use client';

import React from 'react';
import { motion } from 'framer-motion';

type SidebarCountButtonType = {
  name: `adultTickets` | `youthTickets` | `childrenTickets`;
  label: string;
  price: number;
  addTicket: (price: number, name: string) => void;
  removeTicket: (price: number, name: string) => void;
  totalTickets: number;
  // children: ReactNode;
}

export default function
  SidebarCountButton({
                       label,
                       price,
                       name,
                       addTicket,
                       removeTicket,
                       totalTickets
                     }: SidebarCountButtonType) {
  return (
    <div className="flex flex-space-between flex-align-center">
      <p className="description__tour-overview-sidebar__tickets-p">{label}<span
        className="ticket-adult-price">${price}</span>
      </p>
      <div className="description__tour-overview-sidebar__tickets__btn-wrapper flex flex-align-center">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.1 }}
          onClick={() => removeTicket(price, name)}
          className="description__tour-overview-sidebar__tickets__btn btn-minus">-
        </motion.a>
        <input readOnly type="number" className="description__tour-overview-sidebar__tickets__input"
               value={totalTickets}
               name={name} />
        {/*<!--              <p class="description__tour-overview-sidebar__tickets__p" id="ticket-adult-amount">0</p>-->*/}
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.1 }}
          onClick={() => addTicket(price, name)}
          className="description__tour-overview-sidebar__tickets__btn btn-plus">+
        </motion.a>
      </div>
    </div>
  );
}
