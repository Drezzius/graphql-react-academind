import React, { useState, useContext } from 'react';
import './EventsPage.css';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import { useInputState } from '../hooks/useInputState';
import { AuthContext } from '../context/auth-context';
import EventList from '../components/Events/EventList/EventList';
import { EventsContext } from '../context/events-context';
import Spinner from '../components/Spinner/Spinner';

const EventsPage = () => {
  const { token } = useContext(AuthContext);
  const { createEvent, events, isLoading, bookEvent } = useContext(
    EventsContext
  );
  const [creating, setCreating] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [title, setTitle] = useInputState('');
  const [description, setDescription] = useInputState('');
  const [price, setPrice] = useInputState(0);
  const [date, setDate] = useInputState('');

  const createEventHandler = () => setCreating(true);
  const cancelEventHandler = () => {
    setCreating(false);
    setSelectedEvent(null);
  };
  const confirmEventHandler = () => {
    if (
      title.trim().length === 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }
    const event = {
      title,
      description,
      price,
      date
    };

    createEvent(event, token);
    setCreating(false);
  };

  const showDetailHandler = id => {
    const selectedEvent = events.find(event => event._id === id);
    setSelectedEvent(selectedEvent);
  };

  const bookEventHandler = e => {
    if (!token) {
      setSelectedEvent(null);
      return;
    }
    bookEvent(selectedEvent._id, token);
    setSelectedEvent(null);
  };

  return (
    <>
      {creating || (selectedEvent && <Backdrop />)}
      {creating && (
        <Modal
          title="Add Event"
          onCancel={cancelEventHandler}
          onConfirm={confirmEventHandler}
          confirmText="Confirm"
          canCancel
          canConfirm
        >
          <form>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" value={title} onChange={setTitle} />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea
                rows="4"
                id="description"
                value={description}
                onChange={setDescription}
              />
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={setPrice}
              />
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input
                type="datetime-local"
                id="date"
                value={date}
                onChange={setDate}
              />
            </div>
          </form>
        </Modal>
      )}
      {selectedEvent && (
        <Modal
          title={selectedEvent.title}
          onCancel={cancelEventHandler}
          onConfirm={bookEventHandler}
          confirmText={token ? 'Book' : 'Confirm'}
          canCancel
          canConfirm
        >
          <h1>{selectedEvent.title}</h1>
          <h2>
            ${selectedEvent.price} -{' '}
            {new Date(selectedEvent.date).toLocaleDateString()}
          </h2>
          <p>{selectedEvent.description}</p>
        </Modal>
      )}
      {token && (
        <div className="events-control">
          <p>Share your own Events!</p>
          <button className="btn" onClick={createEventHandler}>
            Create Event
          </button>
        </div>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <EventList events={events} onViewDetail={showDetailHandler} />
      )}
    </>
  );
};

export default EventsPage;
