import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import LBar from "./components/LBar.jsx";
import Basepage from "./components/Basepage.jsx";
import './stylesheets/styles.scss';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Basepage} />
        <Route path="/window" component={LBar} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
