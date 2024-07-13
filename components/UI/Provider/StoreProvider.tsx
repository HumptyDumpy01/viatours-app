'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '@/store/store';

interface StoreProviderInterface {
  children: ReactNode;
}

export default function StoreProvider({ children }: StoreProviderInterface) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
