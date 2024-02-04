import { memo } from 'react';
import { IconSvgProps } from '@/types';

export const IconFormInput = memo<JSX.IntrinsicElements['svg']>(
  function IconFormInput({
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
        <rect width='20' height='12' x='2' y='6' rx='2' />
        <path d='M12 12h.01' />
        <path d='M17 12h.01' />
        <path d='M7 12h.01' />
      </svg>
    );
  }
);
