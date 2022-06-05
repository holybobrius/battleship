import { useEffect, useState } from 'react';
import './Cell.css'

const Cell = props => {
    const [content, setContent] = useState('')

    const checkContent = () => {
        if(props.gameboard.getMisses().find(v => v.x == props.x && v.y == props.y)) setContent('●');
        if([].concat.apply([], props.gameboard.getShips().map(ship => ship.coordinates)).find(pos => pos.x === props.x && pos.y === props.y)) setContent('X')
    }

    useEffect(() => checkContent(), [])
    return (
        <div className="cell" onClick={() => {
            props.player.takeTurn({x: props.x, y: props.y})
            checkContent()
        }}>{content}</div>
    )
}

export default Cell