// 'use client';

/*interface WishlistInterface {
  // children: ReactNode;
}*/
import { UserType } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';

export default async function Wishlist(/*{  }: WishlistInterface*/) {
  return (
    <>
      <h1>Wishlist Page</h1>
    </>
  );
}
