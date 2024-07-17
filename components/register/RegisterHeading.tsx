// 'use client';
import '@/app/register/page.scss';
/*type RegisterHeadingType = {
  // children: ReactNode;
}*/

export default function RegisterHeading(/*{  }: RegisterHeadingType*/) {
  return (
    <>
      <h1 className="register__heading secondary-heading heading-scale-effect">Register new account!</h1>
      <p className="register__paragraph">Our subscribers receive first dibs on limited-time discounts and flash sales.
        Imagine saving on that dream beachfront resort or that thrilling mountain expedition!</p>
    </>
  );
}
