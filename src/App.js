import React, { Component } from 'react';
import axios from 'axios';
import PlayerCardList from './components/PlayerCardList';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: []
    };
  }

  async componentDidMount() {
    const { data } = await axios.get(
      'https://lih-api.herokuapp.com/api/stats/tournament?tournament_name=test_1'
    );

    this.setState({ players: Object.entries(data) });
  }

  fetchPlayers = async () => {
    const { data } = await axios.get(
      'https://lih-api.herokuapp.com/api/stats/tournament?tournament_name=test_1'
    );

    this.setState({ players: Object.entries(data) });
  };

  render() {
    return (
      <React.Fragment>
        <PlayerCardList players={this.state.players} />
      </React.Fragment>
    );
  }
}
