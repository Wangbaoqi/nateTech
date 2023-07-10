/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import Image from 'next/image'

export function Logo({
  width = 48,
  height = 48,
  className = ''
}) {
  return (
    <Image className={className} width={width} height={height}  src="/images/me.webp" alt="logo"  />
  );
}
