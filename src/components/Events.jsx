import React, { useEffect, useState } from 'react';
import { Row, Alert, Spinner } from 'react-bootstrap';
import Event from './Event';
import { deleteEvent } from "../service/api";
import useEventStore from "../ZustandStore/useEventStore";
import useFavouriteStore from "../ZustandStore/useFavouriteStore";

const Events = () => {
  const events = useEventStore((state) => state.events);
  const fetchEvents = useEventStore((state) => state.fetchEvents);
  const deleteEventObject = useEventStore((state) => state.deleteEventObject);
  const updateEventObject = useEventStore((state) => state.updateEventObject);
  const storeErrors = useEventStore((state) => state.errors);

  const [showBookMsg, setShowBookMsg] = useState(false);
  const [showWelcomeMsg, setShowWelcomeMsg] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [errorLoading, setErrorLoading] = useState(null);
  const favourites = useFavouriteStore((s) => s.favourites);

  useEffect(() => {
    fetchEvents()
      .catch((err) => {
        console.error(err);
        setErrorLoading("Impossible de charger les événements. Vérifiez que le serveur JSON tourne (npm run server)");
      })
      .finally(() => setLoadingEvents(false));
  }, [fetchEvents]);
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
    const ev = events.find(e => e.id === id);
    if (!ev || ev.nbTickets <= 0) return;
    const updated = {
      ...ev,
      nbTickets: ev.nbTickets - 1,
      nbParticipants: ev.nbParticipants + 1,
    };
    updateEventObject(updated);

    setShowBookMsg(true);
    setTimeout(() => setShowBookMsg(false), 2000);
  };

  const toggleLike = (id) => {
    const ev = events.find(e => e.id === id);
    if (!ev) return;
    updateEventObject({ ...ev, like: !ev.like });
  };

  const deleteEventHandler = (id) => {
    deleteEvent(id)
      .then(() => {
        deleteEventObject(id);
      })
      .catch(err => {
        console.error("Delete failed", err);
        // As fallback, still remove from store to update UI
        deleteEventObject(id);
      });
  };

  return (
    <div className="container mt-4">
      {errorLoading && (
        <Alert variant="danger">
          {errorLoading}
        </Alert>
      )}

      {loadingEvents ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
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

          {favourites && favourites.length === 0 && (
            <Alert variant="warning">Aucun élément en favoris</Alert>
          )}

          {favourites && favourites.length > 0 && (
            <>
              <h3>Favoris</h3>
              <Row>
                {favourites.map((event) => (
                  <Event
                    key={event.id}
                    event={event}
                    buyEvent={buyEvent}
                    toggleLike={toggleLike}
                    deleteEvent={deleteEventHandler}
                  />
                ))}
              </Row>
            </>
          )}

          {events.length === 0 && (
            <Alert variant="warning">
              Aucun événement trouvé.
            </Alert>
          )}

          <Row>
            {events.map(event => (
              <Event
                key={event.id}
                event={event}
                buyEvent={buyEvent}
                toggleLike={toggleLike}
                deleteEvent={deleteEventHandler}
              />
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default Events;
