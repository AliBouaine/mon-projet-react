import React, { useEffect, useState } from "react";
import { editEvent, getallEvents } from "../service/api";
import { useParams, useNavigate } from "react-router-dom";

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getallEvents(id).then(res => {
      setEvent(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setError("Failed to load event");
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editEvent(id, event).then(() => navigate("/")).catch(err => console.error("Update failed", err));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={event.name || ""} onChange={handleChange} />
      <input name="description" value={event.description || ""} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateEvent;