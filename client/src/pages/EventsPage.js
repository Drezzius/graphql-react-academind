import React, { useState } from 'react';
import './Events.css';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';

const EventsPage = () => {
  const [creating, setCreating] = useState(false);

  const createEventHandler = () => setCreating(true);
  const cancelEventHandler = () => setCreating(false);
  const confirmEventHandler = () => setCreating(false);

  return (
    <>
      {creating && <Backdrop />}
      {creating && (
        <Modal
          title="Add Event"
          onCancel={cancelEventHandler}
          onConfirm={confirmEventHandler}
          canCancel
          canConfirm
        >
          <p>Modal Content</p>
        </Modal>
      )}
      <div className="events-control">
        <p>Share your own Events!</p>
        <button className="btn" onClick={createEventHandler}>
          Create Event
        </button>
      </div>
    </>
  );
};

export default EventsPage;
