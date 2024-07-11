'use client';

/*interface HeroWrapperInterface {
  // children: ReactNode;
}*/
import Hero from '@/components/homepage/hero/Hero';
import { Provider } from 'react-redux';
import store from '@/store/store';

export default function HeroWrapper(/*{  }: HeroWrapperInterface*/) {
  return (
    <Provider store={store}>
      <Hero />
    </Provider>
  );
}
