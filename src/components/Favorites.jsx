import React from "react";
import { Row, Alert, Button, Col, Card } from "react-bootstrap";
import useFavouriteStore from "../ZustandStore/useFavouriteStore";

const Favorites = () => {
  const favourites = useFavouriteStore((s) => s.favourites);
  const removeFavourite = useFavouriteStore((s) => s.removeFavourite);
  const clearFavourites = useFavouriteStore((s) => s.clearFavourites);

  if (!favourites || favourites.length === 0) {
    return (
      <div className="container mt-4">
        <Alert variant="warning">Aucun élément en favoris</Alert>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Favoris</h2>
        <Button variant="outline-danger" onClick={clearFavourites}>
          Vider les favoris
        </Button>
      </div>

      <Row>
        {favourites.map((event) => (
          <Col md={4} key={event.id} className="mb-4">
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
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
                <p>
                  <strong>Price:</strong> {event.price} DT
                </p>
                <Button variant="danger" onClick={() => removeFavourite(event.id)}>
                  Retirer des favoris
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Favorites;
