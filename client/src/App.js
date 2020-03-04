import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Intro from "./Pages/Intro";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import './assets/css/App.css';

function App() {
  return (
    <Switch>
        <Route path="/" component={Intro} exact />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
    </Switch>
  );
}

export default App;
