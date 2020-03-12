import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import PlayerCardList from './PlayerCardList';
import SearchBar from './SearchBar';

export default class TournamentView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unfiltered: [],
      players: []
    };
  }

  async componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    const { data } = await axios.get(
      `https://lih-api.herokuapp.com/api/stats/tournament?tournament_name=${params.name}`
    );

    const sorted = [...Object.entries(data)].sort((first, second) => {
      const a = first[1]['Overall Winrate'];
      const b = second[1]['Overall Winrate'];

      const a1 = first[1]['Overall Games Played'];
      const b1 = second[1]['Overall Games Played'];

      if (a1 < 3 && b1 >= 3) {
        return 1;
      }

      if (a1 >= 3 && b1 < 3) {
        return -1;
      }

      if (a > b) {
        return -1;
      }
      if (b > a) {
        return 1;
      }

      if (a1 > b1) {
        return -1;
      }
      if (b1 > a1) {
        return 1;
      }

      return 0;
    });

    this.setState({
      unfiltered: sorted,
      players: [...sorted]
    });
  }

  filterPlayers = (text) => {
    const sorted = [...this.state.unfiltered].filter(value => {
      const name = value[0];

      if (name.toUpperCase().includes(text.toUpperCase())) {
        return true;
      }

      return false;
    });

    this.setState({
      players: sorted
    });
  };

  render() {
    return (
      <React.Fragment>
        <SearchBar onSearch={this.filterPlayers} />
        <PlayerCardList players={this.state.players} />
      </React.Fragment>
    );
  }
}
