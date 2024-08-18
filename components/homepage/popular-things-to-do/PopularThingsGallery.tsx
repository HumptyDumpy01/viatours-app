'use client';

import './PopularThingsGallery.scss';
import adventureImg from '@/assets/images/homepage/popularThingsToDo/adventure.png';
import cultural1 from '@/assets/images/homepage/popularThingsToDo/cultural-1.png';
import cultural2 from '@/assets/images/homepage/popularThingsToDo/cultural-2.png';
import cityToursImg from '@/assets/images/homepage/popularThingsToDo/city.png';
import foodImg from '@/assets/images/homepage/popularThingsToDo/food.png';
import natureImg from '@/assets/images/homepage/popularThingsToDo/nature.png';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5
    }
  }
};

const item = {
  transition: { type: 'spring', stiffness: 100, damping: 10 },
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1 }
};

export default function PopularThingsGallery() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
      className="popular-things-to-do__tours grid grid-five-cols"
    >
      <motion.div
        variants={item}
        className="popular-things-to-do__tour popular-things-to-do__tours-1">
        <Link href={`/tours?filter-type=Adventure Tours`} className="popular-things-to-do__tour-link">
          <Image src={adventureImg} alt="Adventure image" />
          <p className="popular-things-to-do__tour-title">Adventure</p>
        </Link>
      </motion.div>

      <motion.div
        variants={item}
        className="popular-things-to-do__tour popular-things-to-do__tours-2">
        <Link href={`/tours?filter-type=Cultural Tours`} className="popular-things-to-do__tour-link">
          <Image src={cultural1} alt="Culture image" />
          <p className="popular-things-to-do__tour-title">Cultural</p>
        </Link>
      </motion.div>

      <motion.div
        variants={item}
        className="popular-things-to-do__tour popular-things-to-do__tours-3">
        <Link href={`/tours/?filter-type=Cultural Tours`} className="popular-things-to-do__tour-link">
          <Image src={cultural2} alt="Culture Image" />
          <p className="popular-things-to-do__tour-title">Cultural</p>
        </Link>
      </motion.div>

      <motion.div
        variants={item}
        className="popular-things-to-do__tour popular-things-to-do__tours-4">
        <Link href={`/tours/?filter-type=City Tours`} className="popular-things-to-do__tour-link">
          <Image src={cityToursImg} alt="city tours image" />
          <p className="popular-things-to-do__tour-title">City</p>
        </Link>
      </motion.div>

      <motion.div variants={item} className="popular-things-to-do__tour popular-things-to-do__tours-5">
        <Link href={`/tours/?filter-type=Food Tours`} className="popular-things-to-do__tour-link">
          <Image src={foodImg} alt="restaurant image" />
          <p className="popular-things-to-do__tour-title">Food</p>
        </Link>
      </motion.div>

      <motion.div variants={item} className="popular-things-to-do__tour popular-things-to-do__tours-6">
        <Link href={`/tours/?filter-type=Nature Tours`} className="popular-things-to-do__tour-link">
          <Image src={natureImg} alt="two people on a hike image" />
          <p className="popular-things-to-do__tour-title">Nature</p>
        </Link>
      </motion.div>
    </motion.div>
  );
}