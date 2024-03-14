'use client';
import React from 'react';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { MDXComponents } from '@/components/MDX';

type MdxType = {
  code: string;
};
export default function MDXContent({ code }: MdxType) {
  const Component = useMDXComponent(code);
  return (
    <div>
      <Component components={MDXComponents as any} />
    </div>
  );
}
