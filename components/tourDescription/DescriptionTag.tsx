// 'use client';
import '@/app/tours/[id]/page.scss';
/*type DescriptionTagType = {
  // children: ReactNode;
}*/

export default function DescriptionTag(/*{  }: DescriptionTagType*/) {

  return (
    <>
      <div className="description__tag flex">
        <span className="description__tag--text description__tag--text-1">Bestseller</span>
        <span className="description__tag--text description__tag--text-2">Free Cancellation</span>
      </div>
    </>
  );
}
