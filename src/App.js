import './App.css';
import Gameboard from './components/Gameboard/Gameboard';
import { startGame } from './gameLoop';

function App() {

  const players = startGame('Player 1', 'Player 2')

  return (
    <div className="App">
      <header>
        <h1>Battleship.</h1>
        <button>start game</button>
      </header>
      <main>
        <Gameboard name={players[0].getName()} visible={true} player={players[1]} gameboard={players[1].getEnemyGameboard()}></Gameboard>
        <Gameboard name={players[1].getName()} visible={false} player={players[0]} gameboard={players[0].getEnemyGameboard()}></Gameboard>
      </main>
    </div>
  );
}

export default App;
