import shipFactory from "./ship";

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
        const allCoordinates = [].concat.apply([], ships.map(ship => ship.coordinates)) // array of all coordinates of ships
        if(!allCoordinates.find(v => v.x == coordinates.x && v.y == coordinates.y)) {
            misses.push(coordinates)
        } else {
            ships.map(ship => ship.ship).forEach(n => {
                if(n.getPositions().find(v => v.coordinates.x == coordinates.x && v.coordinates.y == coordinates.y)) {
                    n.hit(coordinates)
                }
            })
        }

        if(areAllShipsSunk()) console.log('all ships sunk!')
    }

    const areAllShipsSunk = () => ships.map(ship => ship.ship).every(v => v.getSunk() == true)

    return { getShips, placeShip, getMisses, receiveAttack }
}

export default gameboardFactory