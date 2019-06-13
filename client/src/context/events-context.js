import React, { useEffect, createContext } from 'react';
import { useFetchEventsState } from './useFetchState';
import { useBookingState } from './useBookingState';
import { useIsLoadingState } from './useIsLoadingState';

export const EventsContext = createContext();

export const EventsProvider = props => {
  const [isLoading] = useIsLoadingState(false);
  const [bookEvent, fetchBookings, bookings] = useBookingState([]);
  const [events, fetchEvents, createEvent] = useFetchEventsState();

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider
      value={{
        events,
        createEvent,
        isLoading,
        bookEvent,
        fetchBookings,
        bookings
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};
