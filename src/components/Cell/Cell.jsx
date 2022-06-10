import { useEffect, useRef, useState } from 'react';
import './Cell.css'

const Cell = props => {
    const notInitialRender = useRef(false)

    const [content, setContent] = useState('')

    const displayShips = () => {
        if([].concat.apply([], props.gameboard.getShips().map(ship => ship.coordinates)).find(pos => pos.x === props.coordinates.x && pos.y === props.coordinates.y)) setContent('X')
    }

    const checkContent = () => {
        if(props.gameboard.getMisses().find(v => v.x == props.coordinates.x && v.y == props.coordinates.y)) setContent('●');
        
    }

    useEffect(() => {
        if(props.visible) displayShips()
    }, [])

    useEffect(() => {
        checkContent()
    }, [props.turn])

    const handleClick = () => {
        props.enemyPlayer.takeTurn({x: props.coordinates.x, y: props.coordinates.y})
        checkContent()
        if([].concat.apply([], props.gameboard.getShips().map(ship => ship.coordinates)).find(pos => pos.x === props.coordinates.x && pos.y === props.coordinates.y)) {
            setContent('X')
        } else {
            props.changeTurn();
            props.player.randomMove();
            props.changeTurn();
        }
    }
    
    return (
        <div className={`cell${!props.visible ? '' : ' blocked'}`} onClick={handleClick}>{content}</div>
    )
}

export default Cell