import React from 'react';

export default function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;

  return (
    <div className='relative flex  justify-center w-full'>
      <aside className='hidden lg:block flex-[0_10000_280px] sticky top-0 h-[calc(100vh-194px)] mr-auto overflow-auto pb-4'>
        sidebar
      </aside>
      <main className='relative flex-[0_1_710px] max-w-[710px]'>
        <article className=' relative  px-2 prose prose-neutral text-default-700 text-[15px]'>
          <div>body</div>
          {/* <h1 className='text-3xl font-bold'>{post.title}</h1> */}
          {/* <MDXContent code={post.body.code} /> */}
        </article>

        <section className='absolute -right-[260px] top-0 lg:w-[250px]'>
          toc
        </section>
      </main>
    </div>
  );
}
