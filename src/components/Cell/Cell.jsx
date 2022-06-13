import { useEffect, useRef, useState } from 'react';
import './Cell.css'

const Cell = props => {

    const [content, setContent] = useState(props.hasShip ? 'X' : '')

    useEffect(() => {
        if(!props.hasShip) {
            setContent(props.gameboard.getMisses().some(v => v.x === props.coordinates.x && v.y === props.coordinates.y) ? '●' : '')
        } else if(props.enemyPlayer.getMoves().some(v => v.x === props.coordinates.x && v.y === props.coordinates.y)) {
            setContent('X!!!')
        }
    }, [props.turn])

    const attack = () => {
        props.handleClick(props.coordinates)
        if(!props.hasShip) {
            setContent(props.checkForMiss ? '●' : '')}
        }

    return (
        <div className={`cell${!props.visible ? '' : ' blocked'}`} onClick={attack}>{content}</div>
    )
}

export default Cell