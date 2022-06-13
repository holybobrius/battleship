const playerFactory = (name, enemyGameboard) => {
    const moves = []
    const getMoves = () => moves
    const getName = () => name
    const getEnemyGameboard = () => enemyGameboard


    const takeTurn = (coordinates) => {
        const hit = enemyGameboard.receiveAttack(coordinates)
        moves.push(coordinates)
        return hit
    }

    const generateMove = () => {
        const x = Math.floor(Math.random() * 10)
        const y = Math.floor(Math.random() * 10)
        if(!(moves.some(v => v.x == x && v.y == y))) {
            return {x, y}
        } else {
            return generateMove()
        }
    }

    const randomMove = () => {
        const hit = takeTurn(generateMove())
        return hit
    }

    return { getName, getMoves, getEnemyGameboard, takeTurn, randomMove }
}

export default playerFactory