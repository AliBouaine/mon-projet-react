import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFavouriteStore from "../ZustandStore/useFavouriteStore";
const Event = ({ event, buyEvent, toggleLike, deleteEvent }) => {
  const navigate = useNavigate();
  const isFavourited = useFavouriteStore((s) => s.isFavourited(event.id));
  const toggleFavourite = useFavouriteStore((s) => s.toggleFavourite);
  return (
    <Col md={4} className="mb-4">
      <Card>
        {/* if img value is just a filename we assume it lives in public/assets */}
      <Card.Img
        variant="top"
        src={
          event.img
            ? event.img.startsWith("/")
              ? event.img
              : `/assets/${event.img}`
            : "/assets/404-error-not-found-badge.png"
        }
        style={{ height: "200px", objectFit: "cover" }}
      />

        <Card.Body>
          <Card.Title>
            <Link to={`/event/${event.name}`}>
              {event.name}
            </Link>
          </Card.Title>
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
          <Button onClick={() => navigate(`/update/${event.id}`)}>
             Update Event
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteEvent(event.id)}
          >
            Delete Event
          </Button>
          <Button
            variant={event.like ? "danger" : "success"}
            onClick={() => toggleLike(event.id)}
          >
            {event.like ? "Dislike" : "Like"}
          </Button>
          <Button
            variant={isFavourited ? "warning" : "outline-primary"}
            className="ms-2"
            onClick={() => toggleFavourite(event)}
          >
            {isFavourited ? "Retirer favori" : "Ajouter favori"}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Event;
