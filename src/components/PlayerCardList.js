import React from 'react';
import PlayerCard from './PlayerCard';

export default function PlayerCardList(props) {
  return (
    <section className="playerCards">
      {props.players.map(player => (
        <PlayerCard key={player[0]} player={player} />
      ))}
    </section>
  );
}
