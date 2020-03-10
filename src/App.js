import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TournamentView from './components/TournamentView';
import Header from './components/Header';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/view" component={TournamentView} />
          <Route
            path="/signup"
            render={() => <SignupForm onSubmit={this.signup} />}
          />
          <Route
            path="/login"
            render={() => <LoginForm onSubmit={this.login} />}
          />
          <Route render={() => <div>404</div>} />
        </Switch>
      </Router>
    );
  }
}
