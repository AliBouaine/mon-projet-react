import React from "react";
import { useParams } from "react-router-dom";
import eventsData from "../data/events.json";
import { Card } from "react-bootstrap";

const EventDetails = () => {
  const { name } = useParams();

  const event = eventsData.find(e => e.name === name);

  if (!event) {
    return <h2>Event not found</h2>;
  }

  return (
    <Card>
      <Card.Img variant="top" src={event.img} />
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
        <p>Price: {event.price}</p>
        <p>Participants: {event.nbParticipants}</p>
      </Card.Body>
    </Card>
  );
};

export default EventDetails;