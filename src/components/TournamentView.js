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

      if (a > b) {
        return -1;
      }
      if (b > a) {
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

      if (name.includes(text)) {
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
