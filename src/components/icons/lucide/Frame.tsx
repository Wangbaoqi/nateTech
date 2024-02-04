import { memo } from 'react';
import { IconSvgProps } from '@/types';

export const IconFrame = memo<JSX.IntrinsicElements['svg']>(function IconFrame({
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
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      height={size || height}
      width={size || width}
      {...props}
    >
      <line x1='22' x2='2' y1='6' y2='6' />
      <line x1='22' x2='2' y1='18' y2='18' />
      <line x1='6' x2='6' y1='2' y2='22' />
      <line x1='18' x2='18' y1='2' y2='22' />
    </svg>
  );
});
