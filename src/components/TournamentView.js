import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import PlayerCardList from './PlayerCardList';

export default class TournamentView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: []
    };
  }

  async componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    const { data } = await axios.get(
      `https://lih-api.herokuapp.com/api/stats/tournament?tournament_name=${params.name}`
    );

    this.setState({
      players: Object.entries(data).sort((first, second) => {
        const a = first[1]['Overall Winrate'];
        const b = second[1]['Overall Winrate'];

        if (a > b) {
          return -1;
        }
        if (b > a) {
          return 1;
        }
        return 0;
      })
    });
  }

  render() {
    return (
      <React.Fragment>
        <PlayerCardList players={this.state.players} />
      </React.Fragment>
    );
  }
}
