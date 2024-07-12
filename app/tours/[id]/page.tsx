// 'use client';

interface TourDescriptionInterface {
  params: {
    id: string;
  };
  // children: ReactNode;
}

export default function TourDescription({ params }: TourDescriptionInterface) {
  const id = params.id;
  return (
    <>
      <h1>This is a tour description of {id}</h1>
    </>
  );
}
