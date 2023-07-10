/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import {
  createContext,
  memo,
  useState,
  useContext,
  useId,
  Fragment,
  Suspense,
  useEffect,
  useRef,
  useTransition,
  useReducer,
} from 'react';
import cn from 'classnames';
import NextLink from 'next/link';

import ButtonLink from '../ButtonLink';
import {IconRestart} from '../Icon/IconRestart';
import BlogCard from 'components/MDX/BlogCard';
import {IconChevron} from 'components/Icon/IconChevron';
import {IconSearch} from 'components/Icon/IconSearch';
import {Logo} from 'components/Logo';
import Link from 'components/MDX/Link';
import CodeBlock from 'components/MDX/CodeBlock';
import {IconNavArrow} from 'components/Icon/IconNavArrow';
import {ExternalLink} from 'components/ExternalLink';
import sidebarBlog from '../../sidebarBlog.json';

function Section({children, background = null}) {
  return (
    <div
      className={cn(
        'mx-auto flex flex-col w-full',
        background === null && 'max-w-7xl',
        background === 'left-card' &&
          'bg-gradient-left dark:bg-gradient-left-dark border-t border-primary/10 dark:border-primary-dark/10 ',
        background === 'right-card' &&
          'bg-gradient-right dark:bg-gradient-right-dark border-t border-primary/5 dark:border-primary-dark/5'
      )}
      style={{
        contain: 'content',
      }}>
      <div className="flex-col gap-2 flex grow w-full my-20 lg:my-32 mx-auto items-center">
        {children}
      </div>
    </div>
  );
}

function Header({children}) {
  return (
    <h2 className="leading-xl font-display text-primary dark:text-primary-dark font-semibold text-5xl lg:text-6xl -mt-4 mb-7 w-full max-w-3xl lg:max-w-4xl">
      {children}
    </h2>
  );
}

function Para({children}) {
  return (
    <p className="max-w-3xl mx-auto text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">
      {children}
    </p>
  );
}

function Left({children}) {
  return (
    <div className="px-5 lg:px-0 max-w-4xl lg:text-left text-white text-opacity-80">
      {children}
    </div>
  );
}

function Center({children}) {
  return (
    <div className="px-5 lg:px-0 max-w-4xl lg:text-center text-white text-opacity-80 flex flex-col items-center justify-center">
      {children}
    </div>
  );
}

function FullBleed({children}) {
  return (
    <div className="max-w-7xl mx-auto flex flex-wrap w-full">{children}</div>
  );
}

function CurrentTime() {
  const msPerMinute = 60 * 1000;
  const date = new Date();
  let nextMinute = Math.floor(+date / msPerMinute + 1) * msPerMinute;

  const currentTime = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: 'numeric',
  });
  let [, forceUpdate] = useReducer((n) => n + 1, 0);
  useEffect(() => {
    const timeout = setTimeout(forceUpdate, nextMinute - Date.now());
    return () => clearTimeout(timeout);
  }, [date]);
  return <span suppressHydrationWarning>{currentTime}</span>;
}

const blogSidebar = sidebarBlog.routes[1];
if (blogSidebar.path !== '/blog') {
  throw Error('Could not find the blog route in sidebarBlog.json');
}
const recentPosts = blogSidebar.routes.slice(0, 4).map((entry) => ({
  title: entry.titleForHomepage,
  icon: entry.icon,
  date: entry.date,
  url: entry.path,
}));

export function HomeContent() {
  return (
    <>
      <div className="pl-0">
        <div className="mx-5 mt-12 lg:mt-24 mb-20 lg:mb-32 flex flex-col gap-7 justify-center">

          <div className='w-40 flex items-center self-center'>
            <Logo width={152} height={152} />
          </div>

          <div className='flex items-center self-center font-semibold text-5xl flex-wrap lg:text-6xl max-w-4xl lg:max-w-4xl'>
            {'🎉\xa0'}{'NateTech Stack'}{'\xa0🥳'}
          </div>
          <Para>
            dedicated to {' '}
              <b>
                <a href="">
                  web development
                </a>{' '}
                and{' '}
                <a href="">
                  cross-platform development
                </a>{' '}
                always!
              </b>
          </Para>
          <div className="mt-5 self-center flex gap-2 w-full sm:w-auto flex-col sm:flex-row">
            <ButtonLink
              href={'/computer'}
              type="primary"
              size="lg"
              className="w-full sm:w-auto justify-center"
              label="Get Start">
              Get Start
            </ButtonLink>
            <ButtonLink
              href={'https://wangbaoqi.tech'}
              type="secondary"
              size="lg"
              className="w-full sm:w-auto justify-center"
              label="blog">
              blog
            </ButtonLink>
          </div>
        </div>

        <Section background="left-card">
          <Center>
            <Header>Languages and Tools 💻</Header>
          </Center>
          <FullBleed>
            <LanguageContent  />
          </FullBleed>
        </Section>
      </div>
    </>
  );
}

const LanguageImages = [
  {
    src: '/images/logo/HTML5_logo_and_wordmark.svg',
    alt: 'HTML',
  },
  {
    src: '/images/logo/CSS3_logo_and_wordmark.svg',
    alt: 'CSS',
  },
  {
    src: '/images/logo/JavaScript_logo.svg',
    alt: 'JavaScript',
  },
  {
    src: '/images/logo/Typescript_logo.svg',
    alt: 'TypeScript',
  },
  {
    src: '/images/logo/Vue.js_Logo_2.svg',
    alt: 'Vue',
  },
  {
    src: '/images/logo/React_logo.svg',
    alt: 'React',
  },
  {
    src: '/images/logo/nextjs_logo.svg',
    alt: 'NextJs',
  },
  {
    src: '/images/logo/redux.svg',
    alt: 'Redux',
  },
  {
    src: '/images/logo/React-Router.svg',
    alt: 'React-Router',
  },
  {
    src: '/images/logo/Angular_logo.svg',
    alt: 'Angular_logo',
  },
  {
    src: '/images/logo/tailwindcss.svg',
    alt: 'tailwindcss',
  },
  {
    src: '/images/logo/Node.js_logo.svg',
    alt: 'Node.js_logo',
  },
  {
    src: '/images/logo/LESS_Logo.svg',
    alt: 'LESS_Logo',
  },
  {
    src: '/images/logo/Sass_Logo_Color.svg',
    alt: 'Sass_Logo_Color',
  },
  {
    src: '/images/logo/ESLint_logo.svg',
    alt: 'ESLint_logo',
  },
  {
    src: '/images/logo/Git-logo.svg',
    alt: 'Git-logo',
  },
  {
    src: '/images/logo/Visual_Studio_Code_logo.svg',
    alt: 'Visual_Studio_Code_logo',
  },
  {
    src: '/images/logo/Npm-logo.svg',
    alt: 'Npm-logo',
  },
  {
    src: '/images/logo/webpack_logo.svg',
    alt: 'webpack_logo',
  },
  {
    src: '/images/logo/vite_logo.svg',
    alt: 'vite_logo',
  },
  {
    src: '/images/logo/esbuild_logo.svg',
    alt: 'esbuild_logo',
  },
  {
    src: '/images/logo/rollup-logo.svg',
    alt: 'rollup-logo',
  },
];
const LanguageContent = memo(function CommunityImages({isLazy}) {
  return (
    <div className='flex justify-center flex-wrap gap-4'>
      {LanguageImages.map(({src, alt}, i) => (
        <div
          key={i}
          className={cn(
            `flex justify-center px-5 w-32 relative`
          )}>
          <div>
            <img
              loading={isLazy ? 'lazy' : 'eager'}
              src={src}
              alt={alt}
              className=" h-full w-full flex  "
            />
          </div>
        </div>
      ))}
    </div>
  );
});

