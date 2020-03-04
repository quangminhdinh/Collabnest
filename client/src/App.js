import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Intro from "./Pages/intro";
import './assets/css/App.css';

function App() {
  return (
    <Switch>
        <Route path="/" component={Intro} exact />
        <Route path="/signin" component={Intro} />
        <Route path="/signup" component={Intro} />
    </Switch>
  );
}

export default App;
