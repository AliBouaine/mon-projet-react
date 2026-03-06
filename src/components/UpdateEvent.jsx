import React, { useEffect, useState } from "react";
import useEventStore from "../ZustandStore/useEventStore";
import { useParams, useNavigate } from "react-router-dom";

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvent = useEventStore((state) => state.fetchEvent);
  const editEvent = useEventStore((state) => state.editEvent);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetchEvent(id);
        if (mounted) setEvent(res || {});
      } catch (err) {
        console.error(err);
        if (mounted) setError("Failed to load event");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => (mounted = false);
  }, [id, fetchEvent]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editEvent(id, event);
      navigate("/");
    } catch (err) {
      console.error("Update failed", err);
    }
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