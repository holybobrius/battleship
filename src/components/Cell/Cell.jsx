import './Cell.css'

const Cell = props => {
    let content = ''
    console.log(props.gameboard.getShips().map(v => v.coordinates))
    if(props.gameboard.getMisses().find(v => v.x == props.x && v.y == props.y)) content = '●';
    if([].concat.apply([], props.gameboard.getShips().map(ship => ship.coordinates)).find(pos => pos.x === props.x && pos.y === props.y)) content = 'X'
    return (
        <div className="cell" onClick={() => console.log(props.x, props.y)}>{content}</div>
    )
}

export default Cell