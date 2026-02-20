import React, { useState } from "react";
import { addEvent } from "../service/api";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const [event, setEvent] = useState({
    name: "",
    description: "",
    price: 0,
    nbTickets: 0,
    nbParticipants: 0,
    like: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(event).then(() => {
      navigate("/");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="price" type="number" onChange={handleChange} />
      <input name="nbTickets" type="number" onChange={handleChange} />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEvent;