import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
// import WorldTimeline from './components/WorldTimeline';
import Main from './pages/Main';
import About from './pages/About';

import './style.scss';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={Main}
                ></Route>
                <Route
                    path="/about"
                    component={About}
                ></Route>
            </Switch>
        </Router>
    );
};

export default App;
