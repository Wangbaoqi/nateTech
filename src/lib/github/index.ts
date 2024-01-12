import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH
});

export const fetchAlgoCategories = async () => {
  const data = await octokit.request('GET /repos/{owner}/{repo}', {
    owner: 'Wangbaoqi',
    repo: 'leetCode',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  console.log(data, 'data octokit');

  return Promise.resolve({ name: 'a' });
};
