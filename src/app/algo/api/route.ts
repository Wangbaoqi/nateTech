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
  const type = context.params.slug.join('');
  const list = await fetchAlgoListByType(type);

  console.log(list, 'api');

  return Response.json({ data: list });
}
