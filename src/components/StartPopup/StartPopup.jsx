import './StartPopup.css'

const StartPopup = ({ handleSubmit }) => {

    const onSubmit = (event) => {
        event.preventDefault()
        handleSubmit(event.target.name.value)
    }
    
    return(
        <div className='popup'>
            <div className='popup-content'>
                <h2>Welcome to BattleShip!</h2>
                <form onSubmit={onSubmit}>
                    <label>Player Name:</label>
                    <input name='name'></input>
                    <button>Start Game!</button>
                </form>
            </div>
        </div>
    )
}

export default StartPopup