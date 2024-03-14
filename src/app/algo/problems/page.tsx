import React from 'react';

// import { MDXComponents } from '@/components/mdx';
import { bundleMDX } from 'mdx-bundler';

export default async function RemoteMdxPage() {
  // const res = await fetch('http://localhost:3000/algo/api');
  // const data = await res.json();

  // const post = await bundleMDX({
  //   source: data.text
  // });

  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  // const res = await fetch('https://...')
  // const markdown = await res.text()

  // if (!data?.text) return null;
  // return <div>page</div>;

  return (
    <div>
      {/* <MDXContent code={post.code} /> */}
      <div>problems home</div>
    </div>
  );
  // return <MDXRemote source={data.text} />;
}
