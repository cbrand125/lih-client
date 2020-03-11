import React, { Component } from 'react';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = (event, field) => {
    const { value } = event.target;

    this.setState({
      [field]: value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <section className="forms">
        <div className="form">
          <h2>Log In</h2>
          <form onSubmit={this.handleSubmit}>
            <label className="halfwidth">
              Email
              <input
                name="email"
                type="text"
                value={this.state.email}
                onChange={event => this.handleChange(event, 'email')}
              />
            </label>
            <label className="halfwidth">
              Password
              <input
                name="password"
                type="password"
                value={this.state.password}
                onChange={event => this.handleChange(event, 'password')}
              />
            </label>
            <button type="submit">Log In</button>
          </form>
        </div>
      </section>
    );
  }
}
