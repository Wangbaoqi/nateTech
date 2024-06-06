import fs from 'fs';

import {
  fetchUserInfo,
  fetchAlgoListByType,
  fetchUserRepos,
  fetchRepoContentByPath
} from '@/lib/github';

interface IContext {
  params: {
    slug: string[];
  };
}

export async function GET(request: Request, context: IContext) {
  const type = context.params.slug.join('');

  const list = await fetchRepoContentByPath();
  console.log(list, 'list');

  return Response.json({ list });
}
