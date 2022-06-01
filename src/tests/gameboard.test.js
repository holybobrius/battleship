import gameboardFactory from "../factories/gameboard";

describe('create a new gameboard', () => {
    const newGameboard = gameboardFactory();

    test('expect gameboard to have 3 ships', () => {
        newGameboard.placeShip([{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}])
        newGameboard.placeShip([{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}])
        newGameboard.placeShip([{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}])
        
        expect(newGameboard.getShips().length).toBe(3)
        expect(newGameboard.getShips()[0].ship.getPositions()[0].coordinates).toStrictEqual({x: 0, y: 0})
    })
})

describe('receiveAttack func', () => {
    const newGameboard = gameboardFactory();
    newGameboard.placeShip([{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}])

    test('attack a ship', () => {
        newGameboard.receiveAttack({x: 0, y: 1});

        expect(newGameboard.getMisses().length).toBe(0)
        expect(newGameboard.getShips()[0].ship.getPositions()[1].hit).toBe(true)
        expect(newGameboard.getShips()[0].ship.getSunk()).toBe(false)
    })

    test('miss', () => {
        newGameboard.receiveAttack({x: 5, y: 10})

        expect(newGameboard.getMisses().length).toBe(1)
        expect(newGameboard.getMisses()[0]).toStrictEqual({x: 5, y: 10})
    })

    test('sink a ship', () => {
        newGameboard.receiveAttack({x: 0, y: 0});
        newGameboard.receiveAttack({x: 0, y: 1});
        newGameboard.receiveAttack({x: 0, y: 2});

        expect(newGameboard.getShips()[0].ship.getSunk()).toBe(true)
    })
})

describe('areAllShipsSunk func', () => {
    const newGameboard = gameboardFactory();
    newGameboard.placeShip([{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}])
    newGameboard.placeShip([{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}])

    test('sink one ship', () => {
        newGameboard.receiveAttack({x: 0, y: 0});
        newGameboard.receiveAttack({x: 0, y: 1});
        newGameboard.receiveAttack({x: 0, y: 2});

        expect(newGameboard.areAllShipsSunk()).toBe(false)
    })

    test('sink all ships', () => {
        newGameboard.receiveAttack({x: 0, y: 0});
        newGameboard.receiveAttack({x: 0, y: 1});
        newGameboard.receiveAttack({x: 0, y: 2});

        newGameboard.receiveAttack({x: 1, y: 0});
        newGameboard.receiveAttack({x: 1, y: 1});
        newGameboard.receiveAttack({x: 1, y: 2});

        expect(newGameboard.areAllShipsSunk()).toBe(true)
    })
})