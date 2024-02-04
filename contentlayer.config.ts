// contentlayer.config.ts
import { defineDocumentType } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';
import { spawn } from 'node:child_process';
import { makeSource } from 'contentlayer/source-remote-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `content/blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    excerpt: { type: 'string', required: true },
    date: { type: 'date', required: true },
    category: { type: 'string', required: true },
    coverImage: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    author: { type: 'string' },
    authorIcon: { type: 'string' }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`
    }
  }
}));

export const Docs = defineDocumentType(() => ({
  name: 'Docs',
  filePathPattern: `content/docs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    category: { type: 'string', required: true },
    tags: { type: 'string', required: true }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`
    }
  }
}));

const runBashCommand = (command: string) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, [], { shell: true });

    // child.stdout.setEncoding('utf8');

    child.stdout.on('data', (data) => {
      console.log(Buffer.from(data, 'base64'), 'update data');
      return process.stdout.write(data);
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data) => process.stderr.write(data));

    child.on('close', function (code) {
      if (code === 0) {
        console.log(code, 'close code');
        resolve(void 0);
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });

const syncContentFromGit = async (contentDir: string) => {
  const syncRun = async () => {
    const gitUrl = 'https://github.com/Wangbaoqi/leetCode.git';
    await runBashCommand(`
      if [ -d  "${contentDir}" ];
        then
          cd "${contentDir}"; git pull;
        else
          git clone --depth 1 --single-branch ${gitUrl} ${contentDir};
      fi
    `);
  };

  let wasCancelled = false;
  let syncInterval: NodeJS.Timeout;

  const syncLoop = async () => {
    console.log('Syncing content files from git');

    await syncRun();

    if (wasCancelled) return;

    syncInterval = setTimeout(syncLoop, 1000 * 60);
  };

  // Block until the first sync is done
  await syncLoop();

  return () => {
    wasCancelled = true;
    clearTimeout(syncInterval);
  };
};

export const Algo = defineDocumentType(() => ({
  name: 'Algo',
  filePathPattern: `content/algo/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    id: { type: 'number', required: true },
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    category: { type: 'string', required: true },
    tags: { type: 'string', required: true },
    leetCode: { type: 'string', required: true },
    status: { type: 'string', required: true }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`
    }
  }
}));

export default makeSource({
  contentDirPath: 'content',
  syncFiles: () => syncContentFromGit('content/leetCode'),
  documentTypes: [Post, Algo, Docs],
  contentDirInclude: ['docs', 'blog', 'leetCode/src'],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      () => (tree) => {
        visit(tree, 'element', (node) => {
          if (node.tagName === 'code' && node.data && node.data.meta) {
            node.properties.meta = node.data.meta;
          }
        });
      }
    ]
  }
});
