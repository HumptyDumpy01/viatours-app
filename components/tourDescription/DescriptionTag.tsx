// 'use client';
import '@/app/tours/[id]/page.scss';

type DescriptionTagType = {
  type: string[];
  // children: ReactNode;
}

export default function DescriptionTag({ type }: DescriptionTagType) {

  return (
    <div className="description__tag flex">
      {type.map(function(item) {
        return (
          <span key={item} className="description__tag--text description__tag--text-1">{item}</span>
        );
      })}

      <span className="description__tag--text description__tag--text-2">Free Cancellation</span>
    </div>
  );
}
