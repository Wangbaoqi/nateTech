import fs from 'fs';
import { bundleMDX } from 'mdx-bundler';

import { fetchAlgoContentByType, fetchAlgoDir } from '@/lib/github';

interface IContext {
  params: {
    slug: string[];
  };
}

export async function GET(request: Request, context: IContext) {
  // const team = params.team // '1'

  const type = context.params.slug.join('');

  // console.log(context, 'context');

  const content = await fetchAlgoContentByType();

  const { code, frontmatter } = await bundleMDX({
    source: content || ''
  });

  // console.log(code, frontmatter, 'api');

  return Response.json({ text: content });
}
