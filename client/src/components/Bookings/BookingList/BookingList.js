import React, { useEffect, useContext } from 'react';
import { EventsContext } from '../../../context/events-context';
import { AuthContext } from '../../../context/auth-context';
import Spinner from '../../Spinner/Spinner';
import BookingItem from '../BookingItem/BookingItem';
import './BookingList.css';

const BookingList = () => {
  const { isLoading, fetchBookings, bookings } = useContext(EventsContext);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchBookings(token);
  }, []);

  let bookingList;
  if (!isLoading && bookings) {
    bookingList = bookings.map(booking => (
      <BookingItem key={booking._id} booking={booking} />
    ));
  }
  return (
    <ul className="bookings__list">{!isLoading ? bookingList : <Spinner />}</ul>
  );
};

export default BookingList;
