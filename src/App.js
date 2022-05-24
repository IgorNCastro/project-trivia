import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Trivia from './pages/Trivia';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/trivia" component={ Trivia } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
