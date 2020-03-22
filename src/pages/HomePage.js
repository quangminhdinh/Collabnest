import React from 'react';
import Landing from './Landing';
import Home from './Home';
import {AuthUserContext} from '../components/Session';

const HomePage = () => (
  <AuthUserContext.Consumer>
    {authUser => {
        if (authUser !== "init") {
          if (authUser) {
            return (<Home authUser={authUser}/>);
          } else {
            return (<Landing/>);
          }
        }
      }
    }
  </AuthUserContext.Consumer>
);

export default HomePage;