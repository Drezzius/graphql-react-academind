import React, { createContext } from 'react';
import { useFetchEventsState } from '../hooks/useFetchState';
import { useBookingState } from '../hooks/useBookingState';
import { useIsLoadingState } from '../hooks/useIsLoadingState';

export const EventsContext = createContext();

export const EventsProvider = props => {
  const [isLoading] = useIsLoadingState(false);
  const [bookEvent, fetchBookings, bookings, cancelBooking] = useBookingState(
    []
  );
  const [events, fetchEvents, createEvent] = useFetchEventsState();

  return (
    <EventsContext.Provider
      value={{
        events,
        fetchEvents,
        createEvent,
        isLoading,
        bookEvent,
        fetchBookings,
        bookings,
        cancelBooking
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};
