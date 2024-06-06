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
  Button,
  Link,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Spinner,
  SortDescriptor
} from '@nextui-org/react';

import { SearchLinearIcon } from '@/components/icons';
import { compareAsc, format } from 'date-fns';
import { useAsyncList } from '@react-stately/data';
import { fetchRepoContentByPath } from '@/lib/github';

interface AlgoStatusType {
  [key: string]:
    | 'success'
    | 'danger'
    | 'warning'
    | 'default'
    | 'primary'
    | 'secondary'
    | undefined;
}

interface IAlgoListProps {
  slug: string;
}

const statusColorMap: AlgoStatusType = {
  easy: 'success',
  hard: 'danger',
  medium: 'warning'
};

const columns = [
  // { name: 'ID', uid: 'id', sortable: true },
  { name: 'TITLE', uid: 'title' },
  { name: 'GITHUB', uid: 'github' }
];

const INITIAL_VISIBLE_COLUMNS = ['id', 'title', 'github'];

export function AlgoList({ slug }: IAlgoListProps) {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState('');
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const originLists = useAsyncList({
    async load() {
      const list = await fetchRepoContentByPath();
      setIsLoading(false);
      return {
        items: Array.isArray(list) ? list : []
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor?.column];
          let second = b[sortDescriptor?.column];
          if (
            sortDescriptor?.column &&
            first !== undefined &&
            second !== undefined
          ) {
            let cmp =
              (parseInt(first) || first) < (parseInt(second) || second)
                ? -1
                : 1;

            if (sortDescriptor.direction === 'descending') {
              cmp *= -1;
            }

            return cmp;
          }

          return 0;
        })
      };
    }
  });

  const headerColumns = React.useMemo(() => {
    if (visibleColumns.has('all')) return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const hasSearchFilter = Boolean(filterValue);

  // 筛选过滤
  const filteredItems = useMemo(() => {
    let filterList = [...originLists.items];

    if (hasSearchFilter) {
      filterList = filterList.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filterList;
  }, [originLists, hasSearchFilter, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const renderCell = React.useCallback((user: any, columnKey: string) => {
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
      case 'date':
        return <></>;
      case 'status':
        return (
          <Chip
            className='capitalize'
            color={statusColorMap[user.status]}
            size='sm'
            variant='flat'
          >
            {cellValue}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

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
          <span className='text-default-400 text-small'>Total</span>
          <label className='flex items-center text-default-400 text-small'>
            Rows per page:
            <select
              className='bg-transparent outline-none text-default-400 text-small'
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
  }, [filterValue, onSearchChange, onRowsPerPageChange, onClear]);

  const bottomContent = useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        <Pagination
          isCompact
          showControls
          showShadow
          // color='primary'
          classNames={{
            // wrapper: 'dark:text-algo-context-dark text-algo-context',
            // item: ' bg-transparent dark:text-algo-context-dark text-algo-context'
            wrapper: '',
            item: '',
            cursor:
              'bg-gradient-to-r from-algo-context dark:from-algo-context-dark text-white font-bold'
          }}
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='flat'
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='flat'
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [onNextPage, onPreviousPage, page, pages]);

  return (
    <Table
      aria-label='the problems of the leetCode algorithms'
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      classNames={{
        wrapper: 'bg-content1/30 '
      }}
      topContent={topContent}
      topContentPlacement='outside'
    >
      <TableHeader columns={headerColumns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody
        // emptyContent={'No problems found'}
        items={items}
        isLoading={isLoading}
        loadingContent={<Spinner label='Loading...' />}
      >
        {(item) => (
          <TableRow key={item?.sha}>
            {(columnKey: any) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
