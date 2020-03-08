import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Intro from "./Pages/Intro";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import './assets/css/App.css';

function App() {
  return (
    <Switch>
        <Route path="/intro" component={Intro} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile" component={Profile}/>
        <Route path="/" component={Home} exact/>
    </Switch>
  );
}

export default App;
