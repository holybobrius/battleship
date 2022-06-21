const playerFactory = (name, enemyGameboard) => {
    const moves = []
    const getMoves = () => moves
    const getName = () => name
    const getEnemyGameboard = () => enemyGameboard


    const takeTurn = (coordinates) => {
        const hit = enemyGameboard.receiveAttack(coordinates)
        moves.push(coordinates)
        return {hit, coordinates}
    }

    const generateMove = () => {
        const x = Math.floor(Math.random() * 10)
        const y = Math.floor(Math.random() * 10)
        if(!(moves.some(v => v.x == x && v.y == y)) && !(enemyGameboard.getMisses().some(v => v.x == x && v.y == y))) {
            console.log(enemyGameboard.getMisses(), enemyGameboard.getMisses().some(v => v.x == x && v.y == y))
            return {x, y}
        } else {
            return generateMove()
        }
    }

    const randomMove = (prevCoords) => {
        if (!prevCoords) {
            const coords = generateMove();
            return takeTurn(coords)
        } else {
            const emptyCoords = []
            if (!enemyGameboard.getMisses().some(v => v.x === prevCoords.x + 1 && v.y === prevCoords.y) && (prevCoords.x + 1 <= 9)) emptyCoords.push({ x: prevCoords.x + 1, y: prevCoords.y })
            if (!enemyGameboard.getMisses().some(v => v.x === prevCoords.x && v.y === prevCoords.y + 1) && (prevCoords.y + 1 <= 9)) emptyCoords.push({ x: prevCoords.x, y: prevCoords.y + 1 })
            if (!enemyGameboard.getMisses().some(v => v.x === prevCoords.x - 1 && v.y === prevCoords.y) && (prevCoords.x - 1 >= 0)) emptyCoords.push({ x: prevCoords.x - 1, y: prevCoords.y })
            if (!enemyGameboard.getMisses().some(v => v.x === prevCoords.x && v.y === prevCoords.y - 1) && (prevCoords.y - 1 >= 0)) emptyCoords.push({ x: prevCoords.x, y: prevCoords.y - 1 })
            if(emptyCoords.length === 0) {
                const coords = generateMove();
                return takeTurn(coords)
            } else {
                const random = Math.floor(Math.random() * emptyCoords.length)
                return takeTurn(emptyCoords[random])
            }
        }
    }

    return { getName, getMoves, getEnemyGameboard, takeTurn, randomMove }
}

export default playerFactory