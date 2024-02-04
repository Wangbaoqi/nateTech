import { memo } from 'react';
import { IconSvgProps } from '@/types';

export const IconRoute = memo<JSX.IntrinsicElements['svg']>(function IconRoute({
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
      <circle cx='6' cy='19' r='3' />
      <path d='M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15' />
      <circle cx='18' cy='5' r='3' />
    </svg>
  );
});
