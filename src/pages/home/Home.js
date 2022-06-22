import React from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { CarouselButton } from '../../components/carousel/CarouselButton';
import { topFilms } from '../../data';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();
  const films = useSelector((state) => state.auth.films);
  const pushDetail = (item) => {
    navigate(`/detail/${item.id}`);
  };

  return (
    <>
      <main style={{ minHeight: '80vh' }}>
        <Carousel
          className="carousel-top"
          interval={null}
          indicators={false}
          nextIcon={<CarouselButton direction="Next" />}
          prevIcon={<CarouselButton direction="Previous" />}>
          {films.map((item, index) => (
            <Carousel.Item key={item.id}>
              <Row className="justify-content-center align-items-center">
                <Col className="d-flex justify-content-center" onClick={() => pushDetail(item)}>
                  <img
                    className="img"
                    src={require(`../../images/${item.imgName}`)}
                    alt={item.name}
                  />
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </main>
      <Carousel
        className="carousel-bottom"
        interval={null}
        nextIcon={<CarouselButton direction="Next" />}
        prevIcon={<CarouselButton direction="Previous" />}>
        {[...films].reverse().map((item) => (
          <Carousel.Item
            onClick={() => pushDetail(item)}
            style={{ cursor: 'pointer' }}
            key={item.name}>
            <Carousel.Caption>
              <h3>{item.name}</h3>
            </Carousel.Caption>
            <img className="img" src={require(`../../images/${item.imgName}`)} alt={item.name} />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};
