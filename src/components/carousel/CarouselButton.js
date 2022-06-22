import React from 'react';
import CarouselLeft from '../../icons/CarouselLeft';
import CarouselRight from '../../icons/CarouselRight';
import './CarouselButon.css';
export const CarouselButton = ({ direction }) => {
  return (
    <div aria-hidden="true" className="carousel__button">
      {direction === 'Previous' ? <CarouselLeft /> : <CarouselRight />}
    </div>
  );
};
