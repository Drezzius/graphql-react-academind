import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import AuthPage from './pages/AuthPage';
import EventsPage from './pages/EventsPage';
import BookingsPage from './pages/BookingsPage';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" exact to="/auth" />
        <Route path="/auth" exact component={AuthPage} />
        <Route path="/events" exact component={EventsPage} />
        <Route path="/bookings" exact component={BookingsPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
