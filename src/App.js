import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import TournamentView from './components/TournamentView';
import Header from './components/Header';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import CreateForm from './components/CreateForm';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { token: localStorage.getItem('token') };
  }

  signup = async user => {
    const { data } = await axios.post(
      'https://lih-api.herokuapp.com/api/users/signup',
      user
    );

    localStorage.setItem('token', data);
    this.setState({ token: data });
  };

  login = async user => {
    const { data } = await axios.post(
      'https://lih-api.herokuapp.com/api/users/login',
      user
    );

    localStorage.setItem('token', data);
    this.setState({ token: data });
  };

  logout = async () => {
    let config = {
      headers: {
        Authorization: 'Bearer ' + this.state.token
      }
    };

    axios.delete('https://lih-api.herokuapp.com/api/users/logout', config);

    localStorage.setItem('token', '');
    this.setState({ token: '' });
  };

  create = async data => {
    const { gameid, tournament } = data;

    let config = {
      headers: {
        Authorization: 'Bearer ' + this.state.token
      }
    };

    await axios.put(
      `https://lih-api.herokuapp.com/api/stats/game?game_id=${gameid}&tournament_name=${tournament}`,
      null,
      config
    );

    return tournament;
  };

  render() {
    return (
      <Router>
        <Header token={this.state.token} logout={this.logout} />
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
          <Route
            path="/add"
            render={() => <CreateForm onSubmit={this.create} />}
          />
          <Route path="/" render={() => <div>Search for a tournament name above to see some results!</div>} />
          <Route render={() => <div>404</div>} />
        </Switch>
      </Router>
    );
  }
}
