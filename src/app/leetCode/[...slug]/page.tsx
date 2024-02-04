import React from 'react';
import { allAlgos, type Algo } from 'contentlayer/generated';
import fg from 'fast-glob';
import fse from 'fs-extra';
import { Layout } from '@/components/problemLayout';

interface ProblemProps {
  params: {
    slug: string[];
  };
}

const { readFileSync } = fse;

export default async function ProblemPage({ params: { slug } }: ProblemProps) {
  const post = allAlgos.find(
    (algo) => algo._raw.flattenedPath === `leetCode/${slug?.join('/')}`
  );

  const sourceCode = readFileSync(
    `${process.cwd()}/content/leetCode/${slug?.join('/')}/code.ts`,
    'utf-8'
  );

  const testCode = readFileSync(
    `${process.cwd()}/content/leetCode/${slug?.join('/')}/code.test.ts`,
    'utf-8'
  );

  const codeSnippet = {
    code: sourceCode,
    testCode: testCode
  };

  return (
    <div className='relative flex flex-col'>
      <Layout post={post} code={codeSnippet} />
    </div>
  );
}
