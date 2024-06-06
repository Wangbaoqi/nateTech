import fs from 'fs';
import { bundleMDX } from 'mdx-bundler';

import { fetchAlgoContentByType, fetchAlgoListByType } from '@/lib/github';

async function handleMdxFileJson(content = '') {
  const { code, frontmatter } = await bundleMDX({
    source: content || ''
  });

  return {
    // code,
    ...frontmatter
  };
}

interface IContext {
  params: {
    slug: string[];
  };
}

export async function GET(request: Request, context: IContext) {
  try {
    const list = await fetchAlgoListByType('');

    return Response.json({ data: [] });
  } catch (error) {
    console.error(error, 'get algo index list error');
  }
}
