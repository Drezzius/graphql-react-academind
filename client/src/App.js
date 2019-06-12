import React, { useContext } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import AuthPage from './pages/AuthPage';
import EventsPage from './pages/EventsPage';
import BookingsPage from './pages/BookingsPage';
import MainNavigation from './components/Navigation/MainNavigation';
import { AuthContext } from './context/auth-context';

const App = () => {
  const { token } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <MainNavigation />
      <main className="main-content">
        <Switch>
          {!token && <Redirect from="/bookings" exact to="/auth" />}
          {token && <Redirect from="/" exact to="/events" />}
          {token && <Redirect from="/auth" exact to="/events" />}
          {!token && <Route path="/auth" exact component={AuthPage} />}
          <Route path="/events" exact component={EventsPage} />
          {token && <Route path="/bookings" exact component={BookingsPage} />}
          {!token && <Redirect exact to="/auth" />}
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
