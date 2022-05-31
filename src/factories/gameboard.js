const gameboardFactory = () => {
    const ships = [];
    const misses = [];

    const getShips = () => ships
    const getMisses = () => misses

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

    const placeShip = (coordinates, shipLength) => {
        const newShip = generateShip(shipLength, coordinates)
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