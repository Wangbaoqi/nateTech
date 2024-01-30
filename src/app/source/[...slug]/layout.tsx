import React from 'react';
import { Sidebar } from '@/components/sourceLayout';

interface LayoutProp {
  children: React.ReactNode;
  params: {
    slug: string[];
  };
}
export default function BlogLayout({ children, params }: LayoutProp) {
  const { slug } = params;
  return (
    <div className='relative flex  justify-center w-full'>
      <aside className='hidden lg:block flex-[0_10000_240px] sticky top-0 h-[calc(100vh-194px)] mr-auto overflow-auto pb-4'>
        <Sidebar slug={slug} />
      </aside>
      {children}
    </div>
  );
}
