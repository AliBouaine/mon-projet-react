import React, { useState } from "react";
import useEventStore from "../ZustandStore/useEventStore";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    name: "",
    description: "",
    price: "",
    nbTickets: "",
    img: "",
    nbParticipants: 0,
    like: false,
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const addEvent = useEventStore((state) => state.addEvent);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEvent(event);
      navigate("/");
    } catch (err) {
      console.error("Failed to add event", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
        <input
          name="name"
          value={event.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="description"
          value={event.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          name="price"
          type="number"
          value={event.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          name="nbTickets"
          type="number"
          value={event.nbTickets}
          onChange={handleChange}
          placeholder="Tickets"
          required
        />
        <input
          name="img"
          value={event.img}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <button type="submit" className="btn btn-primary">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
