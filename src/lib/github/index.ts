import { Octokit } from 'octokit';
import fs from 'fs-extra';

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

    // console.log(data, 'data octokit');

    const content = Buffer.from(data?.content, 'base64').toString('utf-8');

    // console.log('frontmatter Content:', content);
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
  filePaths = ''
) {
  const list = [];
  for (const filePath of filePaths) {
    const content = await getFileContent(owner, repo, filePath);
    list.push(content);
  }
  console.log(list.length, 'listLength');

  return list;
}

export const fetchAlgoDir = async () => {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: 'Wangbaoqi',
      repo: 'leetCode',
      path: 'src/LinkList'
    });

    const files = data?.filter((item) => item.type === 'file');
    const directories = data.filter((item) => item.type === 'dir');

    const paths = directories.map((dir) => dir.path);
    const list = await processFiles('Wangbaoqi', 'leetCode', paths);
    console.log(list, 'jsonlist');

    return Promise.resolve({ list });
  } catch (error) {
    console.log(error, 'error');
  }
};
