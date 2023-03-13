import React from 'react';
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import LBar from './components/LBar.jsx'
import './stylesheets/styles.css';

function App() {
    return (
        <div className="app">
            {/* <Header /> */}
            <Switch>
                <Route exact path="/window" component={LBar} />
                <Route exact path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </div>
    )
}

export default App;