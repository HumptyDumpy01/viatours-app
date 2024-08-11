'use client';

import './Hero.scss';
import shapeImg from '../../../assets/images/homepage/hero/shape.svg';

/*interface HeroHeadingInterface {
  // children: ReactNode;
}*/
export default function HeroHeading(/*{  }: HeadingInterface*/) {

  /*  const { data: session, status } = useSession();

    let userName = '';
    if (session) {
      console.log(`Current session: `, session);
      const name = session.user?.name?.split(' ');
      userName = name![0];
    }*/

  return (
    <>
      <img src={shapeImg.src} alt="bottom of a hero" className="hero__img-bottom" />
      <div className="hero__heading">
        {/*{session && (
          <h1 className="main-heading margin-bottom-small heading-scale-effect">Welcome back, {userName}!</h1>
        )}
        {!session && (
          <h1 className="main-heading margin-bottom-small heading-scale-effect">Your world of joy</h1>
        )}*/}
        <h1 className="main-heading margin-bottom-small heading-scale-effect">Your world of joy</h1>
        <p className="paragraph paragraph-hero">From local escapes to far-flung adventures, find what makes you happy
          anytime,
          anywhere</p>
      </div>
    </>
  );
}
