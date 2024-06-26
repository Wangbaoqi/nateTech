import { NavBar, Footer } from '@/components/blogLayout';
import { Suspense } from 'react';
import { HomeCard } from '@/components/homeLayout/HomeCard';
import { Metadata } from 'next/types';

export function generateMetadata({
  params
}: {
  params: { slug: string[] };
}): Metadata {
  return {
    title: `home of nantTech`,
    description: `posts of nateTech`
  };
}

export default function Home() {
  return (
    <div className='relative flex flex-col'>
      <NavBar />
      <div className='mt-10'>
        <Suspense fallback={'loading'}>
          <HomeCard
            title='Posts for JavaScript'
            tag='JavaScript'
            redirectRoute='/tags/javascript'
          />
        </Suspense>
        <Suspense fallback={'loading'}>
          <HomeCard
            title='Posts for React'
            tag='React'
            redirectRoute='/tags/react'
          />
        </Suspense>
        <Suspense fallback={'loading'}>
          <HomeCard
            title='Posts for DataStructure'
            tag='Structure'
            redirectRoute='/tags/structure'
          />
        </Suspense>
        <Suspense fallback={'loading'}>
          <HomeCard
            title='Posts for Browser'
            tag='Browser'
            redirectRoute='/tags/structure'
          />
        </Suspense>
        <Suspense fallback={'loading'}>
          <HomeCard
            title='Posts for Network'
            tag='Network'
            redirectRoute='/tags/network'
          />
        </Suspense>
        <Suspense fallback={'loading'}>
          <HomeCard
            title='Posts for Toolchain'
            tag='Toolchain'
            redirectRoute='/tags/toolchain'
          />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
