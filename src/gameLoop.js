import gameboardFactory from "./factories/gameboard";
import playerFactory from "./factories/player";

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