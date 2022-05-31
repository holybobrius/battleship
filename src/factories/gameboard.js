const gameboardFactory = () => {
    const ships = [];
    const misses = [];

    const getShips = () => ships
    const getMisses = () => misses

    const generateShip = shipLength => {
        const generateHits = length => {
            return new Array(length).fill(false)
        }
        const defaultSunk = false
    
        return shipFactory(shipLength, generateHits(shipLength), defaultSunk)
    }

    const placeShip = (coordinates, shipLength) => {
        const newShip = generateShip(shipLength)
        ships.push({
            coordinates,
            ship: newShip
        })
    }

    const receiveAttack = coordinates => {
        ships.forEach(n => {
            if(n.coordinates.x == coordinates.x && n.coordinates.y == coordinates.y) {
                n.ship.hit(coordinates)
                return;
            }
        })
        misses.push(coordinates)
    }

    const areAllShipsSunk = () => ships.every(v => v.getSunk == true)
    
    
    return { getShips, placeShip, getMisses, receiveAttack, areAllShipsSunk }
}

export default gameboardFactory