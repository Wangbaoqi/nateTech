'use client';
import { NavBar } from '@/components/blogLayout';
import { Sidebar } from '@/components/sourceLayout';
import React from 'react';
import { usePathname } from 'next/navigation';

interface LayoutProp {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProp) {
  const pathname = usePathname();
  const [, , slug] = pathname?.split('/');

  return (
    <div className='relative flex flex-col max-w'>
      <NavBar width='2xl' />
      <div className='container mx-auto max-w-[1536px] pt-5 px-7'>
        <div className='relative flex justify-center w-full'>
          <aside className='hidden xl:block flex-[0_10000_280px] sticky top-0 h-[calc(100vh-194px)] mr-auto overflow-auto pb-4'>
            <Sidebar slug={[slug]} />
          </aside>
          {children}
        </div>
      </div>
    </div>
  );
}
