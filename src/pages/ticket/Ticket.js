import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, OverlayTrigger, Popover, Button, Modal } from 'react-bootstrap';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { topFilms } from '../../data';
import { selectFilmById } from '../../authSlice';
import './Ticket.css';
import { purchase } from '../../authSlice';

const createDays = () => {
  let array = [];
  for (let i = 0; i < 6; i++) {
    let result = new Date();
    array.push(result.setDate(result.getDate() + i));
  }
  return array;
};

const createTimes = () => {
  let array = [];
  for (let i = 0; i < 6; i++) {
    let result = new Date();
    array.push(result.setMinutes(result.getMinutes() + i * 30));
  }
  return array;
};
export const Ticket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const film = useSelector((state) => selectFilmById(state, id));
  const [chairs, setChairs] = useState([]);
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const selectChair = (index) => {
    if (chairs.find((item) => item === index)) {
      const arr = chairs.filter((item) => item !== index);
      setChairs(arr);
    } else {
      setChairs((prev) => [...prev, index]);
    }
  };

  useEffect(() => {
    const array = createDays();
    setDates(array);

    const times = createTimes();
    setTimes(times);
  }, []);

  const getChairNumber = (index) => {
    let value = '';
    switch (true) {
      case index < 10:
        value = `A${index + 1}`;
        break;
      case index < 20 && index >= 10:
        value = `B${index + 1}`;
        break;
      case index < 30 && index >= 20:
        value = `C${index + 1}`;
        break;
      case index >= 30:
        value = `D${index + 1}`;
      default:
        break;
    }
    return value;
  };

  const selectedChairs = () => {
    let arr = [];
    chairs.forEach((item) => {
      arr.push(getChairNumber(item));
    });
    return arr;
  };

  const purchaseFilm = () => {
    dispatch(
      purchase({
        name: film.name,
        img: film.imgName,
        amount: memoizeChairs.length * film.price,
        chairs: memoizeChairs,
        selectedIndexes: film.selectedChairs ? [...chairs, ...film.selectedChairs] : chairs,
        selectedDate,
        selectedTime
      })
    );
    handleClose();
    navigate('/purchased-films');
  };

  const memoizeChairs = useMemo(() => selectedChairs(), [chairs]);

  const popover = (
    <Popover id={`popover-basic`}>
      <Popover.Body>
        {times.map((item) => (
          <div
            onClick={() => setSelectedTime(item)}
            style={{
              background: item === selectedTime ? '#1A2C50' : '',
              color: item === selectedTime ? 'white' : ''
            }}
            key={item}
            className="ticket__popover-body">
            {new Date(item).toLocaleTimeString('tr', { hour: '2-digit', minute: '2-digit' })}
          </div>
        ))}
      </Popover.Body>
    </Popover>
  );
  return film ? (
    <div className="ticket">
      <Row>
        <Col md={8}>
          <h2>{film.name}</h2>
          <p>{film.description}</p>
        </Col>
        <Col>
          <div>
            <img
              className="ticket__img mb-4"
              src={require(`../../images/${film.imgName}`)}
              alt={film.name}
            />
            <p>Duration: {film.time}</p>
            <p>Price: {film.price} TL</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex gap-4 justify-content-center">
          {dates?.map((item) => (
            <OverlayTrigger rootClose key={item} trigger="click" placement="top" overlay={popover}>
              <div
                style={{ background: item === selectedDate ? 'gray' : '' }}
                className="ticket__date"
                onClick={() => setSelectedDate(item)}>
                <span style={{ color: item === selectedDate ? 'white' : '' }}>
                  {new Date(item).toLocaleString('tr', { month: 'short', day: 'numeric' })}
                </span>
                <span style={{ color: item === selectedDate ? 'white' : '' }}>
                  {new Date(item).toLocaleString('tr', { weekday: 'short' })}
                </span>
              </div>
            </OverlayTrigger>
          ))}
        </Col>
      </Row>
      <Row className=" gap-3 justify-content-center" style={{ marginTop: '100px' }}>
        {[...Array(film.chairLength)].map((item, index) => (
          <>
            <div
              key={index}
              className={`ticket__chair fw-bold ${
                film.selectedChairs?.includes(index) ? 'ticket__chair--disabled' : ''
              }`}
              onClick={() => {
                if (!film.selectedChairs?.includes(index)) {
                  selectChair(index);
                }
              }}
              style={{
                backgroundColor: chairs.find((item) => item === index) ? '#118EEA' : 'initial',
                color: chairs.find((item) => item === index) ? 'white' : 'initial'
              }}>
              {getChairNumber(index)}
            </div>
            {(index + 1) % 10 === 0 && <div className="ticket__chair-hr" />}
          </>
        ))}
      </Row>
      <Row className="ticket__info-button">
        <Col className="d-flex justify-content-center">Seçilen Bilgiler</Col>
      </Row>
      {chairs.length > 0 && selectedTime && selectedDate && (
        <Row className="ticket__info-container">
          <Col className=" d-flex flex-column">
            <h4>Toplam</h4>
            <h2>{memoizeChairs.length * film.price} TL</h2>
          </Col>
          <Col className=" d-flex flex-column">
            <h4>Koltuklar</h4>
            <h2>{memoizeChairs.join(',')}</h2>
          </Col>
          <Col className="d-flex align-items-center">
            <Button onClick={handleShow} className="ticket__continue-button" variant="royal">
              Devam Et
            </Button>
          </Col>
        </Row>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Satın Alma</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>{film.name}</Row>
          <Row>
            {' '}
            <Col xs={6} style={{ paddingLeft: '0' }}>
              {new Date(selectedDate).toLocaleString('tr', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </Col>
            <Col>
              {new Date(selectedTime).toLocaleTimeString('tr', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Col>
          </Row>
          <Row>{memoizeChairs.join(',')}</Row>
          <Row>{memoizeChairs.length * film.price} TL</Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="primary" onClick={purchaseFilm}>
            Satın Al
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    <div className="d-flex justify-content-center">
      <TailSpin className="d-flex justify-content-center " color="black" height={80} width={80} />
    </div>
  );
};
