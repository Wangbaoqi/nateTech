'use client';
import React from 'react';
export default function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;

  return (
    <main className='relative flex-[0_1_780px] max-w-[780px]'>
      <article className=' relative  px-2 prose prose-neutral text-default-700 text-[15px]'>
        <div>body</div>
        {/* <h1 className='text-3xl font-bold'>{post.title}</h1> */}
        {/* <MDXContent code={post.body.code} /> */}
      </article>

      <section className='absolute -right-[260px] top-0 lg:w-[250px]'>
        toc
      </section>
    </main>
  );
}
