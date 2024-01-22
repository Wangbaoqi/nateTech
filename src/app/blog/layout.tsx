import { NavBar, PostWrapper } from '@/components/blogLayout';
import React from 'react';

interface LayoutProp {
  children: React.ReactNode;
}
export default function BlogLayout({ children }: LayoutProp) {
  return (
    <div className='relative flex flex-col'>
      <NavBar />
      <div className='container mx-auto max-w-5.5xl flex-grow'>{children}</div>
    </div>
  );
}
