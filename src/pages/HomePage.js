import React from 'react';
import Landing from './Landing';
import Home from './Home';
import {AuthUserContext} from '../components/Session';

const HomePage = () => (
  <AuthUserContext.Consumer>
    {authUser => 
      authUser ? (
        <Home authUser={authUser}/>
      ) : (
        <Landing/>
      )
    }
  </AuthUserContext.Consumer>
);

export default HomePage;