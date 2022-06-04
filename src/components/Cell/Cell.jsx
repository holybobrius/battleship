import './Cell.css'

const Cell = props => {
    return (
        <div className="cell" onClick={() => console.log(props.x, props.y)}></div>
    )
}

export default Cell