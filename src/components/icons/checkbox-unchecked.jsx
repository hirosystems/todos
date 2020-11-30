import React from 'react';
import { Svg } from './svg';

export const CheckboxUnchecked = props => {
  return (
    <Svg {...props} display="inline-block">
      <g filter="url(#filter0_d)">
        <rect x="2" y="1" width="16" height="16" rx="4" fill="white" />
        <rect x="2.5" y="1.5" width="15" height="15" rx="3.5" stroke="#C1C3CC" />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="20"
          height="20"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </Svg>
  );
};
