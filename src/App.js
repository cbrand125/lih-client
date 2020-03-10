import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TournamentView from './components/TournamentView';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/view" exact component={TournamentView} />
          <Route render={() => <div>404</div>} />
        </Switch>
      </Router>
    );
  }
}
