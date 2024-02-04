import { memo } from 'react';
import { IconSvgProps } from '@/types';

export const IconEclipse = memo<JSX.IntrinsicElements['svg']>(
  function IconEclipse({
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
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}
        height={size || height}
        width={size || width}
        {...props}
      >
        <circle cx='12' cy='12' r='10' />
        <path d='M12 2a7 7 0 1 0 10 10' />
      </svg>
    );
  }
);
