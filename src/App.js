import { useEffect, useLayoutEffect, useState } from 'react';
import './App.css';
import Gameboard from './components/Gameboard/Gameboard';
import { startGame } from './gameLoop';

function App() {

  const [players, setPlayers] = useState()
  const [playersTurns, setPlayersTurns] = useState([true, false])

  useLayoutEffect(() => {
    if(!players) setPlayers(startGame('Player 1', 'Player 2'))
  }, [])

  const changeTurn = () => {
    setPlayersTurns([!playersTurns[0], !playersTurns[1]])
  }

  return (
    <div className="App">
      <header>
        <h1>Battleship.</h1>
        <button>start game</button>
      </header>
      {players && <main>
        <Gameboard player={players[0]} blocked={true} enemyPlayer={players[1]} gameboard={players[1].getEnemyGameboard()} turn={playersTurns[1]} changeTurn={changeTurn}/>
        <Gameboard player={players[1]} enemyPlayer={players[0]} gameboard={players[0].getEnemyGameboard()} turn={playersTurns[0]} changeTurn={changeTurn} />
      </main>}
    </div>
  );
}

export default App;
