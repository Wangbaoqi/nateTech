import { memo } from 'react';
import { IconSvgProps } from '@/types';

export const IconCodeSquare = memo<JSX.IntrinsicElements['svg']>(
  function IconCodeSquare({
    className,
    size = 24,
    width,
    height,
    ...props
  }: IconSvgProps) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}
        height={size || height}
        width={size || width}
        {...props}
      >
        <rect width='18' height='18' x='3' y='3' rx='2' />
        <path d='m10 10-2 2 2 2' />
        <path d='m14 14 2-2-2-2' />
      </svg>
    );
  }
);
