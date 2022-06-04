import gameboardFactory from "./factories/gameboard";
import playerFactory from "./factories/player";

export const startGame = (name1, name2) => {
    const gameboard1 = gameboardFactory();
    const gameboard2 = gameboardFactory();

    const player1 = playerFactory(name1, gameboard2)
    const player2 = playerFactory(name2, gameboard1)

    return [player1, player2]
}