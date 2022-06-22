/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { TailSpin } from 'react-loader-spinner';
import { Button } from 'react-bootstrap';
import { topFilms } from '../../data';
import './Detail.css';
import { useSelector } from 'react-redux';
import { selectFilmById } from '../../authSlice';
//embedId almak için, html içinde video açmak için gerekli
const getYoutubeId = (path) => {
  let regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  let match = path.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  }
};

export const Detail = () => {
  const { id } = useParams();
  const film = useSelector((state) => selectFilmById(state, id));
  const navigate = useNavigate();

  return film ? (
    <div className="detail d-flex flex-column align-items-center">
      <h1>{film.name}</h1>
      <div className="detail__video-container">
        <iframe
          className="detail__video"
          src={`https://www.youtube.com/embed/${getYoutubeId(film.trailer)}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="detail__description-container">
        <p className="lg-text">{film.description}</p>
      </div>
      <div style={{ width: '100%' }}>
        <Button onClick={() => navigate(`/detail/${id}/ticket`)} size="lg">
          Bilet Al
        </Button>
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center">
      <TailSpin className="d-flex justify-content-center " color="black" height={80} width={80} />
    </div>
  );
};
