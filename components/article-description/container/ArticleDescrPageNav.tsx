// 'use client';

import Link from 'next/link';
import { TagsType } from '@/lib/mongodb';

type ArticleDescrPageNavType = {
  title: string;
  tags: TagsType[];
  _id: string;
  // children: ReactNode;
}

export default function ArticleDescrPageNav({ title, tags, _id }: ArticleDescrPageNavType) {

  // if the tags are e.g. hot and new, I do want them to be formatted like "The Newest & Hot Articles"
  const formattedTags = tags.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1)).join(` & `);

  return (
    <>
      <div className="tour-article-descr__nav">
        <div className="flex flex-align-center">
          <Link href={`/`} className="inline-block">Home &gt;</Link>
          <Link href={`/articles`} className="inline-block">Tour Articles &gt;</Link>
          <Link href={`/articles/${_id}`} className="inline-block highlighted">{title}</Link>
        </div>
        <div className="flex flex-align-center">
          <p className="tour-article-descr__nav-tag">
            {formattedTags}
          </p>
        </div>
      </div>
    </>
  );
}
