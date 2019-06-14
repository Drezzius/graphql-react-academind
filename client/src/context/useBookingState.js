import { useState } from 'react';
import axios from 'axios';
import { useIsLoadingState } from './useIsLoadingState';

export const useBookingState = () => {
  const [bookings, setBookings] = useState();
  const [isLoading, setIsLoading] = useIsLoadingState(false);

  const bookEvent = async (eventId, token) => {
    const requestBody = {
      query: `
        mutation {
          bookEvent(eventId: "${eventId}")
          {
            _id
            createdAt
            updatedAt
            }
          }
      `
    };

    const res = await axios({
      method: 'post',
      url: 'http://localhost:8000/graphql',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: JSON.stringify(requestBody)
    });
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Failed!');
    }
  };

  const fetchBookings = async token => {
    setIsLoading(true);
    const requestBody = {
      query: `
        query {
          bookings
          {
            _id
           createdAt
           event {
             _id
             title
             date
           }
          }
        }
      `
    };

    const res = await axios({
      method: 'post',
      url: 'http://localhost:8000/graphql',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: JSON.stringify(requestBody)
    });
    if (res.status !== 200 && res.status !== 201) {
      setIsLoading(false);
      throw new Error('Failed!');
    }
    setBookings(res.data.data.bookings);
    setIsLoading(false);
  };

  const cancelBooking = async (token, id) => {
    const requestBody = {
      query: `
        mutation {
          cancelBooking(bookingId: "${id}")
          {
            _id
           title
          }
        }
      `
    };

    const res = await axios({
      method: 'post',
      url: 'http://localhost:8000/graphql',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: JSON.stringify(requestBody)
    });
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Failed!');
    }
    const updatedBookings = bookings.filter(booking => booking._id !== id);
    setBookings(updatedBookings);
  };
  return [bookEvent, fetchBookings, bookings, cancelBooking];
};
