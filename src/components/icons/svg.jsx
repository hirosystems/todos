import * as React from 'react';
import { Box } from '@blockstack/ui';

export const Svg = ({
  width = '24px',
  height = 'auto',
  viewBox = '0 0 24 24',
  fill = 'none',
  ...rest
}) => {
  return <Box as="svg" width={width} height={height} viewBox={viewBox} fill={fill} {...rest} />;
};
