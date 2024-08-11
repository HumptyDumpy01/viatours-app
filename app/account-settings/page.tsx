'use client';

import './page.scss';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import SessionProviderContainer from '@/components/UI/Provider/SessionProviderContainer';
import AccountSettingsContainer from '@/components/account-settings/AccountSettingsContainer';

interface AccountSettingsPageInterface {
  searchParams: {
    page: 'profile' | `notifications` | `wishlist` | `tour-purchases` | `delete-account`;
  };
  // children: ReactNode;
}

export default function AccountSettingsPage({ searchParams }: AccountSettingsPageInterface) {
  // extract the page param value
  const { page } = searchParams;

  const [activePage, setActivePage] = useState<string>(`profile`);

  useEffect(() => {
    setActivePage(page);
  }, [page]);

  if (page !== 'profile' && page !== 'notifications' && page !== 'wishlist' && page !== 'tour-purchases' && page !== 'delete-account') {
    notFound();
  }

  console.log(`Currently Active Page: `, activePage);

  return (
    <SessionProviderContainer>
      <AccountSettingsContainer page={page} />
    </SessionProviderContainer>
  );
}
