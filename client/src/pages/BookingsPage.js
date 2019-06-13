import React, { useEffect, useContext } from 'react';
import { EventsContext } from '../context/events-context';
import { AuthContext } from '../context/auth-context';
import Spinner from '../components/Spinner/Spinner';

const BookingsPage = () => {
  const { isLoading, fetchBookings, bookings } = useContext(EventsContext);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchBookings(token);
  }, []);

  let bookingList;
  if (!isLoading && bookings) {
    bookingList = bookings.map(booking => (
      <li key={booking._id}>{booking.event.title}</li>
    ));
  }

  return <ul>{!isLoading ? bookingList : <Spinner />}</ul>;
};

export default BookingsPage;
