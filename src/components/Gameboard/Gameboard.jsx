import './Gameboard.css'
import Cell from '../Cell/Cell'

const Gameboard = props => {
    const cells = []
    for(let i = 0; i < 100; i++) {
        const coordinates = {x: i % 10, y: Math.floor(i / 10)}
        cells.push(
        <Cell
            turn={props.turn}
            changeTurn={props.changeTurn}
            visible={props.visible} 
            key={props.name + i} 
            enemyPlayer={props.enemyPlayer} 
            player={props.player} 
            gameboard={props.gameboard}
            coordinates={coordinates}
        />)
    }
    return(
        <div>
            <h2>{props.name}</h2>
            <div className="gameboard">
                {cells}
            </div>
        </div>
    )
}

export default Gameboard