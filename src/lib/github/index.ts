import { Octokit } from 'octokit';
import { Endpoints, OctokitResponse } from '@octokit/types';
import fs from 'fs-extra';
import { bundleMDX } from 'mdx-bundler';

type ReposParameters = Endpoints['GET /repos/{owner}/{repo}']['parameters'];
type ContentReposParameters =
  Endpoints['GET /repos/{owner}/{repo}/contents/{path}']['parameters'];
type ContentReposResponse =
  Endpoints['GET /repos/{owner}/{repo}/contents/{path}']['response'];

type ReposData = ContentReposResponse['data'];

const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH
});

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
  type: string
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
