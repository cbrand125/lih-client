import React, { Component } from 'react';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameid: '',
      tournament: '',
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

    const tournament = await this.props.onSubmit(this.state);
    this.setState(() => ({
      toView: tournament
    }));
  };

  render() {
    if (this.state.toView) {
      return <Redirect to={`/view?name=${this.state.toView}`} />
    }

    return (
      <section className="forms">
        <div className="form">
          <h2>Add Game</h2>
          <form onSubmit={this.handleSubmit}>
            <label className="halfwidth">
              Game ID
              <input
                name="gameid"
                type="text"
                value={this.state.gameid}
                onChange={event => this.handleChange(event, 'gameid')}
              />
            </label>
            <label className="halfwidth">
              Tournament Name
              <input
                name="tournament"
                type="text"
                value={this.state.tournament}
                onChange={event => this.handleChange(event, 'tournament')}
              />
            </label>
            <button type="submit">Add</button>
          </form>
        </div>
      </section>
    );
  }
}
