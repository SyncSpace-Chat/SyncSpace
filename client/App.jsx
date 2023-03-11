import React from 'react';
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import './stylesheets/styles.css';

function App() {
    return (
        <>
            {/* <Header /> */}
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </>
    )
}

export default App;