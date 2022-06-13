import './Gameboard.css'
import Cell from '../Cell/Cell'

const Gameboard = props => {
    const cells = []
    const shipCoords = [].concat.apply([], props.gameboard.getShips().map(ship => ship.coordinates))
    for(let i = 0; i < 100; i++) {
        const coordinates = {x: i % 10, y: Math.floor(i / 10)}
        const hasShip = shipCoords.some(v => v.x === coordinates.x && v.y === coordinates.y)

        const checkForMiss = coordinates => {
            return props.gameboard.getMisses().some(v => v.x === coordinates.x && v.y === coordinates.y)
        }

        const attack = coordinates => {
            if(!(props.enemyPlayer.getMoves().some(v => v.x === coordinates.x && v.y === coordinates.y) || props.gameboard.getMisses().some(v => v.x === coordinates.x && v.y === coordinates.y))) {
                props.enemyPlayer.takeTurn(coordinates)
                props.changeTurn()
                props.player.randomMove()
                props.changeTurn()
            }
        }

    
        cells.push(
        <Cell
            key={`id#${i}`}
            coordinates={coordinates}
            hasShip={hasShip ? 'X' : ''}
            handleClick={attack}
            gameboard={props.gameboard}
            checkForMiss={checkForMiss}
            turn={props.turn}
            enemyPlayer={props.enemyPlayer}
        />)

        
    }

    // console.log(props.player.getName(), props.gameboard.getShips())

    return(
        <div>
            <h2>{props.player.getName()}</h2>
            <div className={`gameboard${props.blocked ? ' blocked' : ''}`}>
                {cells}
            </div>
        </div>
    )
}

export default Gameboard