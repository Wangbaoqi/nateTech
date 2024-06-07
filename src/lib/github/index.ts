import { Octokit } from 'octokit';
import { Endpoints, OctokitResponse } from '@octokit/types';
import fs from 'fs-extra';

export type TypeContentPath =
  Endpoints['GET /repos/{owner}/{repo}/contents/{path}']['response']['data'];

const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH
});

// user
export const fetchUserInfo = async () => {
  try {
    const data = await octokit.rest.users.getAuthenticated();
    console.log(data, 'user info');
  } catch (error) {
    console.log(error, 'fetch github user error');
  }
};

// fetch all repos
export const fetchUserRepos = async () => {
  try {
    const { data } = await octokit.rest.repos.listForUser({
      username: 'wangbaoqi'
    });
    console.log(data, 'fetch user repos');
  } catch (error) {
    console.log(error);
  }
};

export const fetchRepoContentByPath = async (type: string = '') => {
  // 定义要获取内容的仓库信息
  const owner = 'wangbaoqi';
  const repo = 'leetCode';
  const path = 'LinkList';

  try {
    // 获取目录内容
    const rst = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: type
    });

    if (rst?.status === 200 && rst?.data) {
      return rst.data;
    }
  } catch (error) {
    return [];
  }
};

export const fetchAlgoContentByType = async () => {
  try {
    const { data } = await octokit.request(
      'GET /repos/{owner}/{repo}/contents/{path}',
      {
        mediaType: {
          format: 'text'
        },
        owner: 'Wangbaoqi',
        repo: 'leetCode',
        path: 'src/LinkList/addTwoNumber/index.mdx',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          accept: 'application/vnd.github+json'
        }
      }
    );

    const content = Buffer.from(data?.content, 'base64').toString('utf-8');

    return Promise.resolve(content);
  } catch (error) {
    console.log(error, 'error');
  }

  return Promise.resolve('');
};

async function getFileContent(
  owner = 'Wangbaoqi',
  repo = 'leetCode',
  filePath = ''
) {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: `${filePath}/index.mdx`
    });
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return content;
  } catch (error) {
    console.error(`Error getting content of ${filePath}:`, error);
    throw error;
  }
}

async function processFiles(
  owner = 'Wangbaoqi',
  repo = 'leetCode',
  filePaths: string[] = []
) {
  const list = [];
  for (const filePath of filePaths) {
    const content = await getFileContent(owner, repo, filePath);
    const { code, frontmatter } = await bundleMDX({
      source: content || ''
    });

    list.push({
      name: filePath.split('/').pop(),
      path: filePath,
      ...frontmatter
    });
  }

  return list;
}

/**
 * Fetches a list of algorithms by type.
 *
 * @param {string} type - the type of algorithm
 * @return {Promise<{ list: any[] }>} a promise that resolves to an object containing a list of algorithms
 */
export const fetchAlgoListByType = async (
  type?: string
): Promise<{ list: any[] }> => {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: 'Wangbaoqi',
      repo: 'leetCode',
      path: 'linklist'
    });

    if (!Array.isArray(data)) {
      return { list: [] };
    }

    const directories = data.filter((item) => item.type === 'dir');
    const paths = directories.map((dir) => dir.path);
    const list = await processFiles('Wangbaoqi', 'leetCode', paths);

    return { list };
  } catch (error) {
    console.error(error);
    return { list: [] };
  }
};
