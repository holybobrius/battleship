import playerFactory from "../factories/player";
import gameboardFactory from '../factories/gameboard'

describe('create a new player', () => {
    const gameboard = gameboardFactory();
    const player = playerFactory('John', gameboard)

    test('expect player name to be John', () => {
        expect(player.getName()).toBe('John')
    })

    test('expect players enemy gameboard to have zero ships', () => {
        expect(player.getEnemyGameboard().getShips().length).toBe(0)
    })
})

describe('populate enemy gameboard', () => {
    const gameboard = gameboardFactory();
    const player = playerFactory('John', gameboard)
    
    player.getEnemyGameboard().placeShip([{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}])
    player.getEnemyGameboard().placeShip([{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}])

    test('expect players enemy gameboard to have two ships', () => {
        expect(player.getEnemyGameboard().getShips().length).toBe(2)
    })
})

describe('takeTurn func', () => {
    const gameboard = gameboardFactory();
    const player = playerFactory('John', gameboard)
    
    player.getEnemyGameboard().placeShip([{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}])
    player.getEnemyGameboard().placeShip([{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}])

    test('hit an enemy ship', () => {
        player.takeTurn({x: 0, y: 1})
        expect(player.getEnemyGameboard().getShips()[0].ship.getPositions()[1].hit).toBe(true)
        expect(player.getEnemyGameboard().getMisses().length).toBe(0)
    })

    test('sink an enemy ship', () => {
        player.takeTurn({x: 0, y: 0})
        player.takeTurn({x: 0, y: 1})
        player.takeTurn({x: 0, y: 2})
        expect(player.getEnemyGameboard().getShips()[0].ship.getSunk()).toBe(true)
        expect(player.getEnemyGameboard().areAllShipsSunk()).toBe(false)
        expect(player.getEnemyGameboard().getMisses().length).toBe(0)
    })

    test('sink all enemy ships', () => {
        player.takeTurn({x: 0, y: 0})
        player.takeTurn({x: 0, y: 1})
        player.takeTurn({x: 0, y: 2})

        player.takeTurn({x: 1, y: 0})
        player.takeTurn({x: 1, y: 1})
        player.takeTurn({x: 1, y: 2})

        expect(player.getEnemyGameboard().getShips()[0].ship.getSunk()).toBe(true)
        expect(player.getEnemyGameboard().getShips()[1].ship.getSunk()).toBe(true)
        expect(player.getEnemyGameboard().areAllShipsSunk()).toBe(true)
        expect(player.getEnemyGameboard().getMisses().length).toBe(0)
    })

    test('hit an empty spot', () => {
        player.takeTurn({x: 5, y: 10})

        expect(player.getEnemyGameboard().getMisses().length).toBe(1)
        expect(player.getEnemyGameboard().getMisses()[0]).toStrictEqual({x: 5, y: 10})
    })
})

describe('randomMove func', () => {
    const gameboard = gameboardFactory();
    const player = playerFactory('John', gameboard)
    
    player.getEnemyGameboard().placeShip([{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}])
    player.getEnemyGameboard().placeShip([{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}])

    test('make a random move', () => {
        player.randomMove();

        expect(player.getMoves().length).toBe(1)
        expect(player.getMoves()[0].x <= 9 && player.getMoves()[0].y <= 9).toBe(true)
    })

    test('make two more random moves', () => {
        player.randomMove();
        player.randomMove();

        expect(player.getMoves().length).toBe(3)
    })    
})