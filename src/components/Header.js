import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  handleLogout = event => {
    event.preventDefault();
    event.stopPropagation();

    this.props.logout();
  };

  render() {
    const token = this.props.token;
    let links;

    if (token) {
      links = (
        <React.Fragment>
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
              <Link to="/view">View</Link>
            </li>
            {links}
          </ul>
        </nav>
      </header>
    );
  }
}
