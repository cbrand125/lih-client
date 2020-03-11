import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import TournamentView from './components/TournamentView';
import Header from './components/Header';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';

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

    window.location.href = '/view';
  };

  login = async user => {
    const { data } = await axios.post(
      'https://lih-api.herokuapp.com/api/users/login',
      user
    );

    localStorage.setItem('token', data);
    this.setState({ token: data });

    window.location.href = '/view';
  };

  logout = () => {
    axios.delete('https://lih-api.herokuapp.com/api/users/logout', {
      cookie: this.state.token
    });

    console.log('ok');

    localStorage.setItem('token', '');
    this.setState({ token: '' });

    window.location.href = '/view';
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
          <Route render={() => <div>404</div>} />
        </Switch>
      </Router>
    );
  }
}
