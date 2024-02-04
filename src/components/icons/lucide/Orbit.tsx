import { memo } from 'react';
import { IconSvgProps } from '@/types';

export const IconOrbit = memo<JSX.IntrinsicElements['svg']>(function IconOrbit({
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
      <circle cx='12' cy='12' r='3' />
      <circle cx='19' cy='5' r='2' />
      <circle cx='5' cy='19' r='2' />
      <path d='M10.4 21.9a10 10 0 0 0 9.941-15.416' />
      <path d='M13.5 2.1a10 10 0 0 0-9.841 15.416' />
    </svg>
  );
});
