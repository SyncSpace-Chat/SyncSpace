import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import ChatContainer from "./routes/ChatContainer";
import LBar from "./components/LBar.jsx";
import Basepage from "./routes/Basepage.jsx";
// import "./stylesheets/styles.css";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Basepage} />
        <Route path="/window" component={ChatContainer} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
