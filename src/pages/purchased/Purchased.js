import React from 'react';
import { useSelector } from 'react-redux';
import { PurchasedCard } from '../../components/purchasedCard/PurchasedCard';

export const Purchased = () => {
  const films = useSelector((state) => state.auth.user.purchasedFilms);
  console.log(typeof films);
  return films ? (
    films.map((item, index) => (
      <PurchasedCard
        key={index}
        imgName={item.img}
        name={item.name}
        selectedDate={item.selectedDate}
        selectedTime={item.selectedTime}
        amount={item.amount}
        chairs={item.chairs}
      />
    ))
  ) : (
    <h1>Satın Alınmış Film Bulunmuyor</h1>
  );
};
