const playerFactory = (name, enemyGameboard) => {
    const moves = []
    const getMoves = () => moves
    const getName = () => name
    const getEnemyGameboard = () => enemyGameboard


    const takeTurn = (coordinates) => {
        enemyGameboard.receiveAttack(coordinates)
        moves.push(coordinates)
    }

    const generateMove = () => {
        console.log('func fired')
        const x = Math.floor(Math.random() * 10)
        const y = Math.floor(Math.random() * 10)
        if(!(moves.some(v => v.x == x && v.y == y))) {
            console.log('pass', x, y)
            return {x, y}
        } else {
            console.log('error', x, y)
            return generateMove()
        }
    }

    const randomMove = () => {
        takeTurn(generateMove())
    }

    return { getName, getMoves, getEnemyGameboard, takeTurn, randomMove }
}

export default playerFactory