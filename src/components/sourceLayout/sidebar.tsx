'use client';
import React, { SetStateAction, memo, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

import { sourceRoutes, sourceRoutesItemType } from '@/config/routes';
import { Divider, Accordion, AccordionItem, Avatar } from '@nextui-org/react';
import { ChevronRightLinearIcon } from '@/components/icons';
import clsx from 'clsx';
type SidebarProps = {
  slug: string[];
};

export const Sidebar = memo(function Sidebar(props: SidebarProps) {
  const { slug = [] } = props;
  const [root] = slug;

  const sidebarList = useMemo(() => {
    console.log(root, 'change');

    return sourceRoutes[root];
  }, [root]);

  console.log(sidebarList);

  return (
    <nav className='flex flex-col shrink-0 w-full box-border'>
      <ul className=''></ul>
      {sidebarList?.map((item, idx) => {
        return <SidebarDetail key={idx} item={item} />;
      })}
    </nav>
  );
});

const SidebarDetail = memo(function SidebarDetail(props: {
  item: sourceRoutesItemType;
}) {
  const { item } = props;
  const pathname = usePathname();
  const isActive = pathname === item.path;
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const childClsx = clsx('ml-4', {
    hidden: !collapsed
  });

  if (item.path && !item.items) {
    return (
      <SidebarItem
        item={item}
        isActive={isActive}
        setCollapsed={() => setCollapsed(!collapsed)}
      />
    );
  }

  return (
    <div className='p-0 m-0 bg-transparent border-none rounded-none'>
      <section>
        <SidebarItem
          item={item}
          isActive={isActive}
          setCollapsed={() => setCollapsed(!collapsed)}
        />
      </section>
      <div className={childClsx}>
        {item?.items?.map((item: sourceRoutesItemType, idx: number) => {
          return <SidebarDetail key={idx} item={item} />;
        })}
      </div>
    </div>
  );
});

const SidebarItem = memo(function SidebarItem(props: {
  item: sourceRoutesItemType;
  isActive: boolean;
  setCollapsed: any;
}) {
  const { item, isActive, setCollapsed } = props;
  const Icon = item.icon;

  const cls = clsx(
    'flex justify-between px-3 gap-[0.5rem] hover:bg-zinc-100 hover:dark:bg-zinc-900 hover:no-underline cursor-pointer py-unit-xs -outline-offset-1 lg:rounded-[8px] bg-transparent no-underline',
    {
      'dark:bg-zinc-900 bg-zinc-100': isActive
    }
  );

  if (item.path) {
    return (
      <NextLink href={item.path} className={cls}>
        <span className='flex  items-center gap-2 min-w-0 shrink'>
          <span className='flex shrink-0 items-center justify-center h-xl w-xl'>
            {Icon && <Icon size={22} />}
          </span>
          <span className='flex flex-col justify-center min-w-0 shrink '>
            <span className='text-[15px]'>
              <p className=' truncate'>{item.name}</p>
            </span>
          </span>
        </span>
      </NextLink>
    );
  }
  return (
    <div className={cls} onClick={setCollapsed}>
      <span className='flex items-center gap-2 min-w-0 shrink'>
        <span className='flex shrink-0 items-center justify-center h-xl w-xl'>
          {Icon && <Icon size={22} />}
        </span>
        <span className='flex flex-col justify-center min-w-0 shrink '>
          <span className='text-[15px] text-default-500'>
            <p className=' truncate'>{item.name}</p>
          </span>
        </span>
      </span>
      {item.items ? (
        <span className='flex items-center shrink-0'>
          <ChevronRightLinearIcon className=' rotate-90' size={18} />
        </span>
      ) : null}
    </div>
  );
});
