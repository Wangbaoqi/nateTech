import { IconSvgProps } from '@/types';

export const ArrowRightIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    focusable='false'
    height={height || size}
    role='presentation'
    width={width || size}
    {...props}
  >
    <path d='M5 12h14' />
    <path d='m12 5 7 7-7 7' />
  </svg>
);
