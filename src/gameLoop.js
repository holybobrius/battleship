import gameboardFactory from "./factories/gameboard";
import playerFactory from "./factories/player";

const randomNumber = max => {
    return Math.floor(Math.random() * max);
}

const generateShips = (gameboard) => {
    let usedSquares = {shipCoords: [], adjCoord: []}
    
    const generateShip = (size) => {
        const horizontal = randomNumber(2) === 0 ? true : false

        if(horizontal) {
            let shipCoords = []
            const x = randomNumber(10 - size)
            const y = randomNumber(10)
            for(let i = 0; i < size; i++) {
                if(usedSquares.shipCoords.some(v => (v.x === x + i && v.y === y)) || (usedSquares.adjCoord.length !== 0 && usedSquares.adjCoord.some(n => n.x === x + i && n.y === y)))
                {
                    return generateShip(size)
                } else {
                    shipCoords.push({x: x + i, y: y})
                    
                }
            }
            usedSquares.shipCoords = usedSquares.shipCoords.concat(shipCoords)
            const adjCoords = []
            shipCoords.forEach(n => {
                adjCoords.push({x: n.x, y: n.y + 1}, {x: n.x, y: n.y - 1})
            })
            adjCoords.push({x: shipCoords[0].x - 1, y: shipCoords[0].y}, {x: shipCoords[0].x - 1, y: shipCoords[0].y - 1}, {x: shipCoords[0].x - 1, y: shipCoords[0].y + 1})
            adjCoords.push({x: shipCoords[size - 1].x + 1, y: shipCoords[size - 1].y}, {x: shipCoords[size - 1].x + 1, y: shipCoords[size - 1].y - 1}, {x: shipCoords[size - 1].x + 1, y: shipCoords[size - 1].y + 1})
            usedSquares.adjCoord = usedSquares.adjCoord.concat(adjCoords)
            gameboard.placeShip(shipCoords, size, true)
        } else {

            let shipCoords = []
            const y = randomNumber(10 - size)
            const x = randomNumber(10)
            for(let i = 0; i < size; i++) {
                if(usedSquares.shipCoords.some(v => (v.y === y + i && v.x === x)) || (usedSquares.adjCoord.length !== 0 && usedSquares.adjCoord.some(n => n.y === y + i && n.x === x)))
                {
                    return generateShip(size)
                } else {
                    shipCoords.push({y: y + i, x: x})
                    
                }
            }
            usedSquares.shipCoords = usedSquares.shipCoords.concat(shipCoords)
            const adjCoords = []
            shipCoords.forEach(n => {
                adjCoords.push({y: n.y, x: n.x + 1}, {y: n.y, x: n.x - 1})
            })
            adjCoords.push({y: shipCoords[0].y - 1, x: shipCoords[0].x}, {y: shipCoords[0].y - 1, x: shipCoords[0].x - 1}, {y: shipCoords[0].y - 1, x: shipCoords[0].x + 1})
            adjCoords.push({y: shipCoords[size - 1].y + 1, x: shipCoords[size - 1].x}, {y: shipCoords[size - 1].y + 1, x: shipCoords[size - 1].x - 1}, {y: shipCoords[size - 1].y + 1, x: shipCoords[size - 1].x + 1})
            usedSquares.adjCoord = usedSquares.adjCoord.concat(adjCoords)
            gameboard.placeShip(shipCoords, size, false)
            }
        
    }

    generateShip(4)
    generateShip(3)
    generateShip(3)
    generateShip(2)
    generateShip(2)
    generateShip(2)
    generateShip(1)
    generateShip(1)
    generateShip(1)
    generateShip(1)

}


export const startGame = (name1, name2) => {
    const gameboard1 = gameboardFactory();
    const gameboard2 = gameboardFactory();

    generateShips(gameboard1)
    generateShips(gameboard2)



    const player1 = playerFactory(name1, gameboard2)
    const player2 = playerFactory(name2, gameboard1)


    return [player1, player2]
}

export const turn = (player, coordinates) => {
    player.takeTurn(coordinates)
    
}

