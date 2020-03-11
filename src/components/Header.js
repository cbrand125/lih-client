import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import SearchBar from './SearchBar';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toView: '',
      toHome: false
    };
  }

  handleLogout = event => {
    event.preventDefault();
    event.stopPropagation();

    this.props.logout();
    this.setState(() => ({
      toHome: true
    }));
  };

  viewTournament = async text => {
    this.setState(() => ({
      toView: text
    }));
  };

  render() {
    if (this.state.toView) {
      const to = `/view?name=${this.state.toView}`;

      this.setState(() => ({
        toView: ''
      }));

      return <Redirect to={to} />
    }

    if (this.state.toHome) {
      const to = `/`;

      this.setState(() => ({
        toHome: false
      }));

      return <Redirect to={to} />
    }

    const token = this.props.token;
    let links;

    if (token) {
      links = (
        <React.Fragment>
          <li>
            <Link to="/add">Add</Link>
          </li>
          <li>
            <Link to="/" onClick={this.handleLogout}>
              Logout
            </Link>
          </li>
        </React.Fragment>
      );
    } else {
      links = (
        <React.Fragment>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </React.Fragment>
      );
    }

    return (
      <header>
        <nav>
          <ul>
            <li>
              <SearchBar onSearch={this.viewTournament} />
            </li>
          </ul>
          <ul>{links}</ul>
        </nav>
      </header>
    );
  }
}
