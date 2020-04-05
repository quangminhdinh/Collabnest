import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import { withAuthentication } from './components/Session';
import './assets/css/styles.css';
import * as ROUTES from './components/constants/routes';

function App() {
  return (
    <Switch>
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.PROFILE + '/:id'} component={Profile} />
        <Route path={ROUTES.HOME} component={HomePage} exact/>
    </Switch>
  );
}

export default withAuthentication(App);
