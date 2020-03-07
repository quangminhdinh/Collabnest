import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Intro from "./Pages/Intro";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import './assets/css/App.css';

function App() {
  return (
    <Switch>
        <Route path="/intro" component={Intro} exact />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={Home}/>
    </Switch>
  );
}

export default App;
