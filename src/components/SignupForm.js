import React, { Component } from 'react';

export default class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      first: '',
      last: ''
    };
  }

  handleChange = (event, field) => {
    const { value } = event.target;

    this.setState({
      [field]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <section className="forms">
        <div className="form">
          <h2>Sign Up</h2>
          <form onSubmit={this.handleSubmit}>
            <label className="halfwidth">
              Name
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={event => this.handleChange(event, 'name')}
              />
            </label>
            <label className="halfwidth">
              Password
              <input
                name="password"
                type="text"
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
