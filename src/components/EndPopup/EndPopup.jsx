import './EndPopup.css'

const EndPopup = ({winner}) => {
    return(
        <div className='popup'>
            <div className='popup-content'>
                <h2>Game Over!</h2>
                <p>{winner.getName()} has won!</p>
                <img className='klass' src='https://tlgrm.ru/_/stickers/d21/e99/d21e9940-fc86-49ba-9d91-b20a71136040/6.jpg'></img>
                <button onClick={() => document.location.reload()}>Play again</button>
            </div>
        </div>
    )
}

export default EndPopup