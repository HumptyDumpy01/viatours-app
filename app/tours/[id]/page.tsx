// 'use client';

import TourDescriptionSection from '@/components/tourDescription/TourDescription';

interface TourDescriptionInterface {
  params: {
    id: string;
  };
  // children: ReactNode;
}

export default function TourDescription({ params }: TourDescriptionInterface) {
  return (
    <>
      <TourDescriptionSection params={params} />
    </>
  );
}
