'use client';
import React from 'react';

import { allDocs, allAlgos } from 'contentlayer/generated';
import { getHeadings } from '@/lib/docs/utils';
import { notFound } from 'next/navigation';
import MDXContent from '@/components/MDX/MDXContent';
import { Toc } from '@/components/blogLayout';

export default function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;

  const post = allDocs.find(
    (post) => post._raw.flattenedPath === `source/${slug.join('/')}`
  );
  const tocList = getHeadings(post?.body.raw);

  if (!post) notFound();

  return (
    <main className='relative flex-[0_1_780px] max-w-[780px]'>
      <article className=' relative  px-2 prose prose-neutral text-default-700 text-[15px]'>
        <MDXContent code={post.body.code} />
      </article>
      <section className='absolute -right-[260px] top-0 lg:w-[250px]'>
        <Toc headings={tocList} />
      </section>
    </main>
  );
}
