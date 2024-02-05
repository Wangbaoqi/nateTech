import fs from 'fs';

import { fetchAlgoContentByType, fetchAlgoListByType } from '@/lib/github';

interface IContext {
  params: {
    slug: string[];
  };
}

export async function GET(request: Request, context: IContext) {
  const type = context.params.slug.join('');

  console.log(type, 'type params');

  const list = await fetchAlgoListByType(type);

  console.log(list, 'api');

  return Response.json({ data: list });
}
