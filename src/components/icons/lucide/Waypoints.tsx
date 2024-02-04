import { memo } from 'react';
import { IconSvgProps } from '@/types';

export const IconWaypoints = memo<JSX.IntrinsicElements['svg']>(
  function IconWaypoints({
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
        <circle cx='12' cy='4.5' r='2.5' />
        <path d='m10.2 6.3-3.9 3.9' />
        <circle cx='4.5' cy='12' r='2.5' />
        <path d='M7 12h10' />
        <circle cx='19.5' cy='12' r='2.5' />
        <path d='m13.8 17.7 3.9-3.9' />
        <circle cx='12' cy='19.5' r='2.5' />
      </svg>
    );
  }
);
