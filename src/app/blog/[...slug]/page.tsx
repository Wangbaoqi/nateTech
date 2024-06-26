import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import MDXContent from '@/components/MDX/MDXContent';
import { getHeadings } from '@/lib/docs/utils';
import { Toc } from '@/components/blogLayout';

export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath.split('/')
  }));
}

export default function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;

  const post = allPosts.find(
    (post) => post._raw.flattenedPath === `blog/${slug.join('/')}`
  );
  const tocList = getHeadings(post?.body.raw);

  if (!post) notFound();

  return (
    <div className='relative flex flex-row-reverse justify-center mt-20 w-full px-7'>
      <aside className='hidden lg:block flex-[0_10000_250px] sticky top-32 h-[calc(100vh-121px)] ml-auto overflow-auto pb-4'>
        <Toc headings={tocList} />
      </aside>
      <article className='flex-[0_1_748px] relative mb-32 max-w-[748px] px-2 prose prose-neutral text-default-700 text-[15px]'>
        <div></div>
        <h1 className='text-3xl font-bold'>{post.title}</h1>
        <MDXContent code={post.body.code} />
      </article>
    </div>
  );
}
