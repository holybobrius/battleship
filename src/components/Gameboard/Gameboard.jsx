import './Gameboard.css'
import Cell from '../Cell/Cell'

const Gameboard = props => {
    const cells = []
    const shipCoords = [].concat.apply([], props.gameboard.getShips().map(ship => ship.coordinates))
    const attack = coordinates => {
        if(!(props.enemyPlayer.getMoves().some(v => v.x === coordinates.x && v.y === coordinates.y) || props.gameboard.getMisses().some(v => v.x === coordinates.x && v.y === coordinates.y))) {
            const hasShip = shipCoords.some(v => v.x === coordinates.x && v.y === coordinates.y)
            const handleRandomMove = () => {
                if(!props.player.randomMove()) {
                    return
                } else handleRandomMove()
            }
            props.enemyPlayer.takeTurn(coordinates)
            if(props.gameboard.areAllShipsSunk()) props.handleEnd(props.enemyPlayer)
            props.changeTurn()
            if(!hasShip) {
                handleRandomMove()
                props.changeTurn()
                if(props.player.getEnemyGameboard().areAllShipsSunk()) props.handleEnd(props.player)
            }
        }
    }

    const checkForMiss = coordinates => {
        return props.gameboard.getMisses().some(v => v.x === coordinates.x && v.y === coordinates.y)
    }

    for(let i = 0; i < 100; i++) {
        const coordinates = {x: i % 10, y: Math.floor(i / 10)}
        const hasShip = shipCoords.some(v => v.x === coordinates.x && v.y === coordinates.y)
    
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
            visible={props.visible}
            blocked={props.blocked}
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