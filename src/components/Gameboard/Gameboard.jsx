import './Gameboard.css'
import Cell from '../Cell/Cell'

const Gameboard = props => {
    const cells = []
    for(let i = 0; i < 100; i++) {
        cells.push(<Cell key={props.name + i} x={Math.floor(i / 10)} y={i % 10}></Cell>)
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