/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import Image from 'next/image'

export function Logo({
  width = 48,
  height = 48,
}) {
  return (
    <Image className="" width={width} height={height}  src="/images/me.webp" alt="logo"  />
  );
}
