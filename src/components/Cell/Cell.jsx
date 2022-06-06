import { useEffect, useState } from 'react';
import './Cell.css'

const Cell = props => {
    const [content, setContent] = useState('')

    const checkContent = () => {
        if(props.gameboard.getMisses().find(v => v.x == props.x && v.y == props.y)) setContent('●');
        if([].concat.apply([], props.gameboard.getShips().map(ship => ship.coordinates)).find(pos => pos.x === props.x && pos.y === props.y)) setContent('X')
    }

    useEffect(() => {
        if(props.visible) checkContent()
    }, [])
    
    return (
        <div className="cell" onClick={() => {
            props.enemyPlayer.takeTurn({x: props.x, y: props.y})
            checkContent()
            props.player.randomMove();
        }}>{content}</div>
    )
}

export default Cell