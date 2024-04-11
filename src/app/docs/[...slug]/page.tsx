'use client';
import React from 'react';
import { allDocs } from 'contentlayer/generated';
import { getHeadings } from '@/lib/docs/utils';
import { notFound } from 'next/navigation';
import MDXContent from '@/components/MDX/MDXContent';
import { Toc } from '@/components/blogLayout';

export default function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;

  const post = allDocs.find(
    (post) => post._raw.flattenedPath === `docs/${slug.join('/')}`
  );

  const tocList = getHeadings(post?.body.raw);

  if (!post) notFound();

  return (
    <main className='relative flex flex-[0_1_1210px] max-w-[1250px]'>
      <article className='relative flex-1 px-10 prose prose-neutral text-default-700 text-[15px]'>
        <MDXContent code={post.body.code} />
      </article>
      <section className='sticky top-0 lg:w-[250px]'>
        <Toc headings={tocList} />
      </section>
    </main>
  );
}
