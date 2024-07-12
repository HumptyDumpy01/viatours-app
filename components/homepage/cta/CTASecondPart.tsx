// 'use client';

/*interface CTASecondPartInterface {
  // children: ReactNode;
}*/
import Link from 'next/link';

export default function CTASecondPart(/*{  }: CTASecondPartInterface*/) {
  return (
    <>
      <div className="cta__left-side">
        <h2 className="secondary-heading cta__heading heading-scale-effect">Grab up to <span>35% off</span>
          on your favorite
          Destination</h2>
        <p className="paragraph paragraph-cta">Limited time offer, don't miss the opportunity</p>
        <Link href={`/tours/e1`} className="btn btn--cta">Book Now <span className="icon-arr">&rarr;</span></Link>
      </div>
    </>
  );
}
