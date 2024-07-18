// 'use client';

/*type LoginHeadingType = {
  // children: ReactNode;
}*/

export default function LoginHeading(/*{  }: LoginHeadingType*/) {
  return (
    <>
      <h1 className="sign-in__second-col-title secondary-heading heading-scale-effect">Sign in to Viatours!</h1>
      <p className="sign-in__second-col-text">Be the first to know about <u>new tour packages</u>, upcoming events,
        and
        exciting &nbsp;
        <u>destinations</u>. It’s like having a backstage pass to the world of travel.</p>
    </>
  );
}