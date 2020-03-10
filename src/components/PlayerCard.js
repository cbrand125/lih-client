import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default class PlayerCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wr: this.props.player[1]['Overall Winrate'],
      kda: this.props.player[1]['Overall KDA'],
      games: this.props.player[1]['Overall Games Played'],
      label: 'Overall'
    };
  }

  reset = () => {
    this.setState({
      wr: this.props.player[1]['Overall Winrate'],
      kda: this.props.player[1]['Overall KDA'],
      games: this.props.player[1]['Overall Games Played'],
      label: 'Overall'
    });
  };

  _onSelect = (event, type) => {
    const { value } = event;

    this.setState({
      wr: this.props.player[1][type][value].Winrate,
      kda: this.props.player[1][type][value].KDA,
      games: this.props.player[1][type][value]['Games Played'],
      label: value
    });
  };

  render() {
    const name = this.props.player[0];
    const stats = this.props.player[1];
    const champOptions = Object.keys(stats.Champions);
    const roleOptions = Object.keys(stats.Roles);

    return (
      <div className="playerCard">
        <div className="titleSection">
          <h2>{name}</h2>
          <div className="statViewOptions">
            <button onClick={this.reset}>Overall</button>
            <Dropdown
              options={champOptions}
              onChange={event => this._onSelect(event, 'Champions')}
              placeholder="Champions"
            />
            <Dropdown
              options={roleOptions}
              onChange={event => this._onSelect(event, 'Roles')}
              placeholder="Roles"
            />
          </div>
        </div>
        <div className="statView">
          <h3>{this.state.label}</h3>
          <p>Games Played: {this.state.games}</p>
          <p>Winrate: {this.state.wr}</p>
          <p>Average KDA: {this.state.kda}</p>
        </div>
      </div>
    );
  }
}
