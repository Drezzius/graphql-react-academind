import React, { useContext } from 'react';
import './EventItem.css';
import { AuthContext } from '../../../context/auth-context';

const EventItem = props => {
  const { userId } = useContext(AuthContext);
  const { _id, title, price, date } = props.event;

  const handleOnDetail = id => {
    props.onDetail(id);
  };
  return (
    <li key={props.eventId} className="event__list-item">
      <div>
        <h1>{title}</h1>
        <h2>
          ${price} - {new Date(date).toLocaleDateString()}
        </h2>
      </div>
      <div>
        {userId === props.creatorId ? (
          <p>You're the owner of this event.</p>
        ) : (
          <button className="btn" onClick={() => handleOnDetail(_id)}>
            View Details
          </button>
        )}
      </div>
    </li>
  );
};

export default EventItem;
