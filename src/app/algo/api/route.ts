import fs from 'fs';
import { bundleMDX } from 'mdx-bundler';

import { fetchAlgoContentByType, fetchAlgoDir } from '@/lib/github';

async function handleMdxFileJson(content = '') {
  const { code, frontmatter } = await bundleMDX({
    source: content || ''
  });

  return {
    code,
    frontmatter
  };
}

export async function GET(request: Request, context: any) {
  // const team = params.team // '1'

  const content = await fetchAlgoDir();

  const jsonList = [];

  for (const item of content?.list) {
    const object = await handleMdxFileJson(item);
    jsonList.push(object);
  }

  console.log(jsonList, 'api');

  return Response.json({ text: content });
}
