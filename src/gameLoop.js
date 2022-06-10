import gameboardFactory from "./factories/gameboard";
import playerFactory from "./factories/player";

const randomNumber = max => {
    return Math.floor(Math.random() * max);
}

const generateShips = (gameboard) => {
    const usedSquares = []
    
    const generateShip = (length, horizontal) => {
        let start = randomNumber(10-length)
        let constCoord = randomNumber(10)
        const shipCoords = []
        for (let i = 0; i < length; i++) {
            shipCoords.push(horizontal ? {x: start + i, y: constCoord} : {x: constCoord, y: start + i})
        }
        shipCoords.forEach(v => {
            if(usedSquares.some(n => (n.x === v.x && n.y === v.y)
                || (n.x === v.x + 1 && n.y === v.y)
                || (n.x === v.x + 1 && n.y === v.y + 1)
                || (n.x === v.x + 1 && n.y === v.y - 1)
                || (n.x === v.x && n.y === v.y + 1) 
                || (n.x === v.x && n.y === v.y - 1)
                || (n.x === v.x - 1 && n.y === v.y + 1)
                || (n.x === v.x - 1 && n.y === v.y)
                || (n.x === v.x - 1&& n.y === v.y - 1))
            ) {
                generateShip(length, horizontal)
            } else console.log('nay');
         })
        shipCoords.forEach(v => {
            usedSquares.push(v)
        })
        gameboard.placeShip(shipCoords)
        console.log(usedSquares);
    }

    generateShip(4, randomNumber(2) === 1 ? true : false)
    generateShip(3, randomNumber(2) === 1 ? true : false)

}


export const startGame = (name1, name2) => {
    const gameboard1 = gameboardFactory();
    const gameboard2 = gameboardFactory();

    gameboard1.placeShip([{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}])
    gameboard1.placeShip([{x: 2, y: 4}, {x: 2, y: 5}, {x: 2, y: 6}])
    gameboard1.placeShip([{x: 2, y: 0}, {x: 2, y: 1}])
    gameboard1.placeShip([{x: 6, y: 5}, {x: 6, y: 6}])

    gameboard2.placeShip([{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}])
    gameboard2.placeShip([{x: 2, y: 4}, {x: 2, y: 5}, {x: 2, y: 6}])
    gameboard2.placeShip([{x: 2, y: 0}, {x: 2, y: 1}])
    gameboard2.placeShip([{x: 6, y: 5}, {x: 6, y: 6}])

    const player1 = playerFactory(name1, gameboard2)
    const player2 = playerFactory(name2, gameboard1)


    return [player1, player2]
}

export const turn = (player, coordinates) => {
    player.takeTurn(coordinates)
    
}