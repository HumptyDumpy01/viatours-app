import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import React from 'react';
import Header from '@/components/Header/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Welcome to Viatours Travel Agency!',
  description: `Viatours Travel Agency is a travel agency that offers tours to the most beautiful places in the world. We 
    can offer you tours to the most beautiful places in the world, such as the Amazon Rainforest, the Great Barrier Reef
    the Grand Canyon and a lot more!.`
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <Header />
    {children}
    </body>
    </html>
  );
}