import { memo } from 'react';
import { IconSvgProps } from '@/types';

export const IconComponent = memo<JSX.IntrinsicElements['svg']>(
  function IconComponent({
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
        <path d='M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z' />
        <path d='m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z' />
        <path d='M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z' />
        <path d='m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z' />
      </svg>
    );
  }
);
