import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { getallEvents } from "../service/api";

const EventDetails = () => {
  const { name } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Assuming getallEvents() returns all events, then find by name
    getallEvents()
      .then((res) => {
        const foundEvent = res.data.find(e => e.name === name);
        setEvent(foundEvent || null);
      })
      .catch(() => {
        setEvent(null);
      });
  }, [name]);

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