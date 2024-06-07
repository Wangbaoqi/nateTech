'use client';
import React, { useCallback, useMemo, useState } from 'react';
import NextLink from 'next/link';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Link,
  Pagination,
  Spinner
} from '@nextui-org/react';

import { SearchLinearIcon } from '@/components/icons';
import { useAsyncList } from '@react-stately/data';
import { fetchRepoContentByPath } from '@/lib/github';
import { cn } from '@/utils/cn';

interface IAlgoListProps {
  slug: string;
}

export function AlgoList({ slug }: IAlgoListProps) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [rowsPerPage, setRowsPerPage] = useState(18);
  const [filterValue, setFilterValue] = useState('');

  // fetch origin data list
  const originLists = useAsyncList({
    initialFilterText: slug,
    async load({ filterText }) {
      const list = await fetchRepoContentByPath(filterText);
      setIsLoading(false);
      return {
        items: Array.isArray(list) ? list : []
      };
    }
  });

  const hasSearchFilter = Boolean(filterValue);

  // 筛选过滤
  const filteredItems = useMemo(() => {
    let filterList = [...originLists.items];

    console.log(filterList, 'filterList');

    if (hasSearchFilter) {
      filterList = filterList.filter((user) =>
        user.name?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filterList;
  }, [originLists, hasSearchFilter, filterValue]);

  // 分页
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  // 总页数
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  // 渲染单元格
  const renderCell = useCallback((user: any, columnKey: string) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case 'title':
        return (
          <NextLink
            href={user.html_url}
            target='_blank'
            className='hover:text-default-500'
          >
            {user.name}
          </NextLink>
        );
      case 'github':
        return (
          <Link isExternal href={user.html_url} showAnchorIcon>
            github
          </Link>
        );

      default:
        return cellValue;
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  // 表格顶部
  const topContent = React.useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            className='w-full sm:max-w-[44%]'
            placeholder='Search by name...'
            startContent={<SearchLinearIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
        <div className='flex justify-between items-center'>
          <span className=' text-small'>Total：{originLists.items.length}</span>
          <label className='flex items-center text-small'>
            Rows per page:
            <select
              className='bg-transparent outline-none text-small'
              onChange={onRowsPerPageChange}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    originLists?.items,
    filterValue,
    onSearchChange,
    onRowsPerPageChange,
    onClear
  ]);

  // 表格底部
  const bottomContent = useMemo(() => {
    return (
      <div
        className={cn('py-2  flex justify-center items-center', {
          hidden: pages <= 1
        })}
      >
        <Pagination showControls total={pages} page={page} onChange={setPage} />
      </div>
    );
  }, [page, pages]);

  return (
    <Table
      aria-label='the problems of the leetCode algorithms'
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      classNames={{
        wrapper: 'bg-content1/30 h-[calc(100vh-_544px)] '
      }}
      topContent={topContent}
      topContentPlacement='outside'
    >
      <TableHeader>
        <TableColumn key='title'>TITLE</TableColumn>
        <TableColumn key='github'>GITHUB</TableColumn>
      </TableHeader>
      <TableBody
        items={items}
        isLoading={isLoading}
        loadingContent={<Spinner color='default' label='Loading...' />}
      >
        {(item) => (
          <TableRow key={item?.name}>
            {(columnKey: any) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
