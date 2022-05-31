import shipFactory from "../factories/ship";

const generateShip = (shipLength, shipPositions) => {
    const generateHits = (shipPositions) => {
        const positions = []
        if(shipPositions) {
            shipPositions.forEach(pos => {
                positions.push({
                    coordinates: {x: pos.x, y: pos.y},
                    hit: false
                })
            })
        }

        return positions
    }
    const defaultSunk = false

    return shipFactory(shipLength, generateHits(shipPositions), defaultSunk)
}

describe('creating a new ship', () => {

    const newShip = generateShip(3, [{x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}])

    test('ship length expected to be 3', () => {
        expect(newShip.getLength()).toBe(3)
    })

    test('ship expected to not be sunk', () => {
        expect(newShip.getSunk()).toBe(false)
    })
    
    test('ship hits expected to be [false, false, false]', () => {
        expect(newShip.getPositions().map(n => n.hit)).toStrictEqual([false, false, false])
    })
})

describe('hit func', () => {
    const newShip = generateShip(3, [{x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}])
    newShip.hit({x: 0, y: 2})
    test('ship hits after hit(2) expected to be [false, false, true, false]', () => {
        expect(newShip.getPositions().map(n => n.hit)).toStrictEqual([false, true, false])
    })
})

describe('isSunk func', () => {
    const newShip = generateShip(3, [{x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}])
    newShip.hit({x: 0, y: 1})
    newShip.hit({x: 0, y: 2})
    newShip.hit({x: 0, y: 3})
    test('ship sunk should be true', () => {
        expect(newShip.getSunk()).toBe(true)
    })
})