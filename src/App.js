import { useEffect, useLayoutEffect, useState } from 'react';
import './App.css';
import EndPopup from './components/EndPopup/EndPopup';
import Gameboard from './components/Gameboard/Gameboard';
import StartPopup from './components/StartPopup/StartPopup';
import { startGame } from './gameLoop';

function App() {

  const [players, setPlayers] = useState()
  const [winner, setWinner] = useState()
  const [playersTurns, setPlayersTurns] = useState([true, false])
  const [startPopupVisible, setStartPopupVisible] = useState(true)

  const changeTurn = () => {
    setPlayersTurns([!playersTurns[0], !playersTurns[1]])
  }

  const handleGameEnd = (player) => {
    setWinner(player)
  }

  const handleSubmit = (name) => {
    setPlayers(startGame(name, 'Computer'))
    setStartPopupVisible(false)
  }

  return (
    <div className="App">
      {startPopupVisible && <StartPopup handleSubmit={handleSubmit}/>}
      <header>
        <h1>Battleship.</h1>
        {winner && <EndPopup winner={winner}/>}
      </header>
      {players && <main>
        <Gameboard player={players[0]} visible={true} blocked={true} enemyPlayer={players[1]} gameboard={players[1].getEnemyGameboard()} turn={playersTurns[1]} changeTurn={changeTurn}/>
        <Gameboard player={players[1]} enemyPlayer={players[0]} gameboard={players[0].getEnemyGameboard()} turn={playersTurns[0]} changeTurn={changeTurn} handleEnd={handleGameEnd} />
      </main>}
    </div>
  );
}

export default App;
