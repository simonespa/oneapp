import React, { memo } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import Home from './Home';
import About from './About';
import NotFound from './NotFound';

const OneApp = memo(function OneApp() {
  return (
    <ErrorBoundary>
      <>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </>
    </ErrorBoundary>
  );
});

OneApp.displayName = 'OneAppPage';

export default OneApp;
