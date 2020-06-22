import React from 'react';
// import { Svg } from '@blockstack/ui';
import { Svg } from './svg';

export const CheckboxChecked = props => {
  return (
    <Svg {...props} display="inline-block">
      <rect width="16" height="16" rx="4" fill="#3700FF" />
      <path
        d="M5.25 8L7.5 10L11 6"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
