// 'use client';

/*interface CTASecondaryInterface {
  // children: ReactNode;
}*/
import CTA2FirstCol from '@/components/homepage/cta-2/CTA2FirstCol';
import CTA2SecondCol from '@/components/homepage/cta-2/CTA2SecondCol';

export default function CTASecondary(/*{  }: CTASecondaryInterface*/) {
  return (
    <div className="cta-secondary-wrapper grid">
      <CTA2FirstCol />
      <CTA2SecondCol />
    </div>
  );
}
