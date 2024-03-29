import React, { memo } from 'react';
import { type Algo } from 'contentlayer/generated';
import MDXContent from '@/components/MDX/MDXContent';
import { format } from 'date-fns';
import { DifficultyBadge } from '@/components/homeLayout/CategoryBadge';
import { Link } from '@nextui-org/react';

interface DescriptionProps {
  post: Algo | undefined;
}
export const Description = memo(function Description({
  post
}: DescriptionProps) {
  if (!post) return null;

  return (
    <article className='custom-scrollbar algo-description prose prose-neutral h-full text-[15px] bg-zinc-100 dark:bg-zinc-900 px-2 lg:px-6 pb-32 pt-4 overflow-y-auto overflow-x-hidden'>
      <h1 className='text-2xl font-bold m-0'>
        {post.id}.{post.title}
      </h1>
      <div className='mt-2 flex items-center gap-4'>
        <span className='-ml-[0.33rem] flex h-auto w-fit items-center whitespace-nowrap rounded-full bg-transparent py-1 pl-[0.33rem] pr-2 text-xs font-bold cursor-pointer duration-300 hover:bg-black/10  dark:hover:bg-white/20'>
          {post.status}
        </span>
        <p className='text-sm text-default-500'>
          {format(new Date(post.date), 'yyyy-MM-dd')}
        </p>
      </div>
      <div className='mt-2 mb-5 flex items-center gap-3'>
        <DifficultyBadge category={post.category} />
        <DifficultyBadge category={post.tags} />
        <Link size='sm' isExternal href={post.leetCode} showAnchorIcon>
          leetCode
        </Link>
      </div>
      <MDXContent code={post.body.code} />
    </article>
  );
});
