import React from 'react';
import Event from './Event';
import './EventList.css';

const EventList = props => {
  const events = props.events.map(event => (
    <Event key={event._id} event={event} onDetail={props.onViewDetail} />
  ));
  return <ul className="event__list">{events}</ul>;
};

export default EventList;
