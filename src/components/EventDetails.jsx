import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import useEventStore from "../ZustandStore/useEventStore";

const EventDetails = () => {
  const { name } = useParams();
  const [event, setEvent] = useState(null);
  const events = useEventStore((state) => state.events);
  const fetchEvents = useEventStore((state) => state.fetchEvents);

  useEffect(() => {
    let mounted = true;
    const findEvent = () => events.find((e) => e.name === name) || null;

    const load = async () => {
      try {
        const local = findEvent();
        if (local) {
          if (mounted) setEvent(local);
          return;
        }
        await fetchEvents();
        const after = findEvent();
        if (mounted) setEvent(after);
      } catch {
        if (mounted) setEvent(null);
      }
    };

    load();
    return () => (mounted = false);
  }, [name, events, fetchEvents]);

  if (!event) {
    return <h2>Event not found</h2>;
  }

  return (
    <Card>
      <Card.Img
        variant="top"
        src={
          event.img
            ? event.img.startsWith("/")
              ? event.img
              : `/assets/${event.img}`
            : "/assets/404-error-not-found-badge.png"
        }
      />
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