import { memo } from 'react';
import { IconSvgProps } from '@/types';

export const IconNotepadDash = memo<JSX.IntrinsicElements['svg']>(
  function IconNotepadDash({
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
        <path d='M8 2v4' />
        <path d='M12 2v4' />
        <path d='M16 2v4' />
        <path d='M16 4h2a2 2 0 0 1 2 2v2' />
        <path d='M20 12v2' />
        <path d='M20 18v2a2 2 0 0 1-2 2h-1' />
        <path d='M13 22h-2' />
        <path d='M7 22H6a2 2 0 0 1-2-2v-2' />
        <path d='M4 14v-2' />
        <path d='M4 8V6a2 2 0 0 1 2-2h2' />
        <path d='M8 10h6' />
        <path d='M8 14h8' />
        <path d='M8 18h5' />
      </svg>
    );
  }
);
