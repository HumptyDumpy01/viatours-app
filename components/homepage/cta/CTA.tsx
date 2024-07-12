// 'use client';

/*interface CTAInterface {
  // children: ReactNode;
}*/
import CTASecondPart from '@/components/homepage/cta/CTASecondPart';
import CTAFirstPart from '@/components/homepage/cta/CTAFirstPart';

export default function CTA(/*{  }: CTAInterface*/) {
  return (
    <>
      <CTASecondPart />
      <CTAFirstPart />
    </>
  );
}
