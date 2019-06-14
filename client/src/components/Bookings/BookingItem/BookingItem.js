import React, { useContext } from 'react';
import './BookingItem.css';
import { EventsContext } from '../../../context/events-context';
import { AuthContext } from '../../../context/auth-context';

const BookingItem = ({ booking }, props) => {
  const { title } = booking.event;
  const { createdAt } = booking;
  const { cancelBooking } = useContext(EventsContext);
  const { token } = useContext(AuthContext);

  const handleCancelBooking = () => cancelBooking(token, booking._id);
  return (
    <li className="bookings__item">
      <div className="bookings__item-data">
        {title} - {new Date(createdAt).toLocaleDateString()}
      </div>
      <div>
        <button className="btn" onClick={handleCancelBooking}>
          Cancel
        </button>
      </div>
    </li>
  );
};

export default BookingItem;
