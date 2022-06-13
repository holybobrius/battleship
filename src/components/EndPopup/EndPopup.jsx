import './EndPopup.css'

const EndPopup = ({winner}) => {
    return(
        <div className='popup'>
            <div className='popup-content'>
                <h2>Game Over!</h2>
                <p>{winner.getName()} has won!</p>
                <button onClick={() => document.location.reload()}>Play again</button>
            </div>
        </div>
    )
}

export default EndPopup