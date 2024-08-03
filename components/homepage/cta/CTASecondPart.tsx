// 'use client';

/*interface CTASecondPartInterface {
  // children: ReactNode;
}*/
import Link from 'next/link';

export default function CTASecondPart(/*{  }: CTASecondPartInterface*/) {
  return (
    <>
      <div className="cta__left-side">
        <h2 className="secondary-heading cta__heading heading-scale-effect">Grab up to <span>90% off</span>
          on your favorite
          Destinations</h2>
        <p className="paragraph paragraph-cta">Limited time offers, don&apos;t miss the opportunity</p>
        <Link href={`/tours?filter=`} className="btn btn--cta">Search Now <span
          className="icon-arr">&rarr;</span></Link>
      </div>
    </>
  );
}
