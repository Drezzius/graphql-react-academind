import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './auth-context';

export const EventsContext = createContext();

export const EventsProvider = props => {
  const { userId } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const createEvent = async ({ title, description, price, date }, token) => {
    const requestBody = {
      query: `
        mutation {
          createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"})
          {
            _id
            title
            description
            price
            date
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
    const updatedEvents = [...events];
    updatedEvents.push({
      _id: res.data.data.createEvent._id,
      title: res.data.data.createEvent.title,
      description: res.data.data.createEvent.description,
      price: res.data.data.createEvent.price,
      date: res.data.data.createEvent.date,
      creator: {
        _id: userId
      }
    });
    setEvents(updatedEvents);
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    const requestBody = {
      query: `
        query {
          events
          {
            _id
            title
            description
            price
            date
            creator {
              _id
              email
            }
          }
        }
      `
    };

    const res = await axios({
      method: 'post',
      url: 'http://localhost:8000/graphql',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(requestBody)
    });
    if (res.status !== 200 && res.status !== 201) {
      setIsLoading(false);
      throw new Error('Failed!');
    }
    setEvents(res.data.data.events);
    setIsLoading(false);
  };
  return (
    <EventsContext.Provider
      value={{ fetchEvents, events, createEvent, isLoading }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};
