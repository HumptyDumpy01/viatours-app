// 'use client';

import { type ReactNode } from 'react';

type UserSavedArticlesCardsType = {
  children: ReactNode;
}

export default function UserSavedArticlesCards({ children }: UserSavedArticlesCardsType) {
  return (
    <div className="account-settings__content__card-container">
      {children}
    </div>
  );
}
