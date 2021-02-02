import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import Tab from './page/index';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Tab} />
      </Switch>
    </Router>
  );
}
