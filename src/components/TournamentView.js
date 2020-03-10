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

    this.setState({ players: Object.entries(data) });
  }

  render() {
    return (
      <React.Fragment>
        <PlayerCardList players={this.state.players} />
      </React.Fragment>
    );
  }
}
