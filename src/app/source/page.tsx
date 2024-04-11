'use client';
import React from 'react';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import { HoverEffect } from '@/components/aceternity';
import NextLink from 'next/link';
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle
} from '@/components/aceternity';
import { ArrowRightIcon } from '@/components/icons';

export default function Source() {
  const list = [
    {
      title: 'React Roadmap',
      description: 'react 源码解析系列',
      link: '/docs/react',
      chapter: '12章'
    },
    {
      title: 'React Router源码系列',
      description: 'React Router 源码解析系列',
      link: '/docs/react',
      chapter: '12'
    },
    {
      title: 'React Redux源码系列',
      description: 'React Redux源码解析系列',
      link: '/docs/react',
      chapter: '12'
    },
    {
      title: 'Lodash 源码系列',
      description: 'lodash源码解析系列',
      link: '/docs/react',
      chapter: '12'
    }
  ];
  return (
    <div className='px-8 mt-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10 gap-4 antialiased'>
        {list.map((item, idx) => (
          <GlowingStarsBackgroundCard key={`${item.title}-${idx}`}>
            <NextLink
              href={item?.link}
              key={item?.link}
              className='relative group block p-2 h-full w-full'
            >
              <GlowingStarsTitle>{item.title}</GlowingStarsTitle>
              <div className='flex justify-between items-end'>
                <GlowingStarsDescription>
                  {item.description}
                </GlowingStarsDescription>
                <div className='h-8 w-8 rounded-full bg-default-100 flex items-center justify-center'>
                  <ArrowRightIcon size={18} />
                </div>
              </div>
            </NextLink>
          </GlowingStarsBackgroundCard>
        ))}
      </div>
    </div>
  );
}
