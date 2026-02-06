import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';

const Event = ({ event, buyEvent, toggleLike }) => {
  return (
    <Col md={4} className="mb-4">
      <Card>
        <Card.Img variant="top" src={event.img}   style={{ height: "200px", objectFit: "cover" }}
/>

        <Card.Body>
          <Card.Title>{event.name}</Card.Title>
          <Card.Text>{event.description}</Card.Text>

          <p><strong>Price:</strong> {event.price} DT</p>
          <p><strong>Tickets:</strong> {event.nbTickets}</p>
          <p><strong>Participants:</strong> {event.nbParticipants}</p>

          {event.nbTickets === 0 && (
            <p className="text-danger fw-bold">Sold Out</p>
          )}

          <Button
            variant="primary"
            className="me-2"
            disabled={event.nbTickets === 0}
            onClick={() => buyEvent(event.id)}
          >
            Book an event
          </Button>

          <Button
            variant={event.like ? "danger" : "success"}
            onClick={() => toggleLike(event.id)}
          >
            {event.like ? "Dislike" : "Like"}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Event;
