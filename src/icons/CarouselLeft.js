import * as React from 'react';

const CarouselLeft = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
    <path
      d="M19 8.5 11.5 16l7.5 7.5"
      stroke="#333"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CarouselLeft;
