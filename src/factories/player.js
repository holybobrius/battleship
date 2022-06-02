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
        const x = Math.floor(Math.random() * 10)
        const y = Math.floor(Math.random() * 10)
        if(moves.some(v => v.x == x && v.y == y)) {
            generateMove()
        } else {
            return {x, y}
        }
    }

    const randomMove = () => {
        takeTurn(generateMove())
    }

    return { getName, getMoves, getEnemyGameboard, takeTurn, randomMove }
}

export default playerFactory