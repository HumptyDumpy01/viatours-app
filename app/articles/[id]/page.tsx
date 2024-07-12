// 'use client';

interface ArticleDescriptionInterface {
  params: {
    id: string;
  };
  // children: ReactNode;
}

export default function ArticleDescription({ params }: ArticleDescriptionInterface) {
  const id = params.id;
  return (
    <>
      <h1>This is Article Description with the id: {id}</h1>
    </>
  );
}
