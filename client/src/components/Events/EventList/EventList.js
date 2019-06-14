import React, { useEffect, useContext } from 'react';
import EventItem from '../EventItem/EventItem';
import './EventList.css';
import { EventsContext } from '../../../context/events-context';

const EventList = props => {
  const { fetchEvents, events } = useContext(EventsContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const eventsList = events.map(event => (
    <EventItem key={event._id} event={event} onDetail={props.onViewDetail} />
  ));
  return <ul className="event__list">{eventsList}</ul>;
};

export default EventList;
