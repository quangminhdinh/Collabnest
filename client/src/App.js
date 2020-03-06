import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Intro from "./Pages/Intro";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Drawer from "./Components/Drawer";
import './assets/css/App.css';

function App() {
  return (
    <Switch>
        <Route path="/" component={Intro} exact />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/test" component={Drawer}/>
    </Switch>
  );
}

export default App;
