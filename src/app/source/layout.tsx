import { NavBar } from '@/components/blogLayout';
import React from 'react';

interface BlogLayoutProp {
  children: React.ReactNode;
}
export default function BlogLayout({ children }: BlogLayoutProp) {
  return (
    <div className='relative flex flex-col'>
      <NavBar />
      <div className='container mx-auto max-w-7xl pt-5'>{children}</div>
    </div>
  );
}
