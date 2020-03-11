import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      first: '',
      last: '',
      toView: ''
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

    await this.props.onSubmit(this.state);

    this.setState(() => ({
      toView: ' '
    }));
  };

  render() {
    if (this.state.toView) {
      return <Redirect to={`/view?name=${this.state.toView}`} />
    }

    return (
      <section className="forms">
        <div className="form">
          <h2>Sign Up</h2>
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
            <label className="halfwidth">
              First Name
              <input
                name="first"
                type="text"
                value={this.state.first}
                onChange={event => this.handleChange(event, 'first')}
              />
            </label>
            <label className="halfwidth">
              Last Name
              <input
                name="last"
                type="text"
                value={this.state.last}
                onChange={event => this.handleChange(event, 'last')}
              />
            </label>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </section>
    );
  }
}
