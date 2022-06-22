import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './PurchasedCard.css';
export const PurchasedCard = ({ imgName, name, selectedDate, selectedTime, chairs, amount }) => {
  return (
    <Row className="purchased-card">
      <Col>
        <img className="purchased-card__img" src={require(`../../images/${imgName}`)} alt={name} />
      </Col>
      <Col className="d-flex flex-column justify-content-center" xs={10}>
        <h3>{name}</h3>
        <div>
          <span>
            {new Date(selectedDate).toLocaleString('tr', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          <span style={{ marginLeft: '10px' }}>
            {new Date(selectedTime).toLocaleTimeString('tr', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        <div className="mt-2">
          <span>{chairs.join(',')}</span>
          <span style={{ marginLeft: '30px' }}>{amount} TL</span>
        </div>
      </Col>
    </Row>
  );
};
