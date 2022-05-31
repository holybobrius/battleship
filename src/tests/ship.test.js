import shipFactory from "../factories/ship";

const generateShip = shipLength => {
    const generateHits = length => {
        return new Array(length).fill(false)
    }
    const defaultSunk = false

    return shipFactory(shipLength, generateHits(shipLength), defaultSunk)
}

describe('creating a new ship', () => {

    const newShip = generateShip(3)

    test('ship length expected to be 3', () => {
        expect(newShip.getLength()).toBe(3)
    })

    test('ship expected to not be sunk', () => {
        expect(newShip.getSunk()).toBe(false)
    })
    
    test('ship hits expected to be [false, false, false]', () => {
        expect(newShip.getHits()).toStrictEqual([false, false, false])
    })
})

describe('hit func', () => {
    const newShip = generateShip(4)
    newShip.hit(2)

    test('ship hits after hit(2) expected to be [false, false, true, false]', () => {
        expect(newShip.getHits()).toStrictEqual([false, false, true, false])
    })
})

describe('isSunk func', () => {
    const newShip = generateShip(3)
    newShip.hit(0)
    newShip.hit(1)
    newShip.hit(2)
    test('ship sunk should be true', () => {
        expect(newShip.getSunk()).toBe(true)
    })
})