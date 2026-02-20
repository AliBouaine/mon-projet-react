import React, { useEffect, useState } from 'react';
import { Row, Alert } from 'react-bootstrap';
import Event from './Event';
import { getallEvents } from "../service/api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showBookMsg, setShowBookMsg] = useState(false);
  const [showWelcomeMsg, setShowWelcomeMsg] = useState(false);
useEffect(() => {
  getallEvents()
    .then((res) => {
      setEvents(res.data);
    })
    .catch((err) => console.log(err));
}, []);
  // componentDidMount
  useEffect(() => {
    console.log("Component mounted");

    const timer = setTimeout(() => {
      setShowWelcomeMsg(true);
    }, 3000);

    return () => {
      console.log("Component unmounted");
      clearTimeout(timer);
    };
  }, []);

  // Message disparaît après 3 secondes
  useEffect(() => {
    if (showWelcomeMsg) {
      const timer = setTimeout(() => {
        setShowWelcomeMsg(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showWelcomeMsg]);

  const buyEvent = (id) => {
    setEvents(events.map(event =>
      event.id === id && event.nbTickets > 0
        ? {
            ...event,
            nbTickets: event.nbTickets - 1,
            nbParticipants: event.nbParticipants + 1
          }
        : event
    ));

    setShowBookMsg(true);
    setTimeout(() => setShowBookMsg(false), 2000);
  };

  const toggleLike = (id) => {
    setEvents(events.map(event =>
      event.id === id
        ? { ...event, like: !event.like }
        : event
    ));
  };

  return (
    <div className="container mt-4">
      {showWelcomeMsg && (
        <Alert variant="success">
          Welcome to Events Management 🎉
        </Alert>
      )}

      {showBookMsg && (
        <Alert variant="info">
          You have booked an event
        </Alert>
      )}

      <Row>
        {events.map(event => (
          <Event
            key={event.id}
            event={event}
            buyEvent={buyEvent}
            toggleLike={toggleLike}
          />
        ))}
      </Row>
    </div>
  );
};

export default Events;
