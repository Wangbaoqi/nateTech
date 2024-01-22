import React from 'react';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import NextLink from 'next/link';

export default function Source() {
  return (
    <div className='px-8 mt-5'>
      <div className='grid gap-y-3 gap-x-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
        <NextLink
          href={'/source/react'}
          className='group relative rounded-2xl duration-300 sm:min-w-[300px] xl:min-w-[320px]'
        >
          <Card className='py-4' isHoverable>
            <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
              <p className='text-tiny uppercase font-bold'>REACT SOURCE</p>
              <small className='text-default-500 my-2'>12 Chapters</small>
              <h4 className='font-bold text-large'>React 源码系列</h4>
            </CardHeader>
            <CardBody className='overflow-visible py-2'>
              <Image
                alt='Card background'
                className='object-cover h-[200px] rounded-xl'
                src='/cover/tree3.png'
                width='100%'
              />
            </CardBody>
          </Card>
        </NextLink>

        <Card className='py-4'>
          <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
            <p className='text-tiny uppercase font-bold'>Daily Mix</p>
            <small className='text-default-500'>12 Tracks</small>
            <h4 className='font-bold text-large'>Frontend Radio</h4>
          </CardHeader>
          <CardBody className='overflow-visible py-2'>
            <Image
              alt='Card background'
              className='object-cover h-[200px] rounded-xl'
              src='/cover/tree3.png'
              width='100%'
            />
          </CardBody>
        </Card>

        <Card className='py-4'>
          <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
            <p className='text-tiny uppercase font-bold'>Daily Mix</p>
            <small className='text-default-500'>12 Tracks</small>
            <h4 className='font-bold text-large'>Frontend Radio</h4>
          </CardHeader>
          <CardBody className='overflow-visible py-2'>
            <Image
              alt='Card background'
              className='object-cover h-[200px] rounded-xl'
              src='/cover/tree3.png'
              width='100%'
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
