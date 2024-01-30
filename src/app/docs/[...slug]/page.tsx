'use client';
import React from 'react';

import { allDocs } from 'contentlayer/generated';
import { getHeadings } from '@/lib/docs/utils';
import { notFound } from 'next/navigation';
import MDXContent from '@/components/mdx/MDXContent';
import { Toc } from '@/components/blogLayout';
import { Sidebar } from '@/components/sourceLayout';

export default function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;

  const post = allDocs.find(
    (post) => post._raw.flattenedPath === `docs/${slug.join('/')}`
  );

  const tocList = getHeadings(post?.body.raw);

  if (!post) notFound();

  return (
    // <div className='relative flex  justify-center w-full'>
    //   <aside className='hidden lg:block flex-[0_10000_240px] sticky top-0 h-[calc(100vh-194px)] mr-auto overflow-auto pb-4'>
    //     <Sidebar slug={slug} />
    //   </aside>

    // </div>

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
