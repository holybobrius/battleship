import shipFactory from "./ship";

const gameboardFactory = () => {
    const ships = [];
    const misses = [];

    const getShips = () => ships
    const getMisses = () => misses

    const generateShip = (shipLength, shipPositions, horizontal) => {
        const generateHits = (shipPositions) => {
            const positions = []
            if (shipPositions) {
                shipPositions.forEach(pos => {
                    positions.push({
                        coordinates: { x: pos.x, y: pos.y },
                        hit: false
                    })
                })
            }

            return positions
        }
        const defaultSunk = false

        return shipFactory(shipLength, generateHits(shipPositions), defaultSunk, horizontal)
    }

    const placeShip = (coordinates, shipLength, horizontal) => {
        const newShip = generateShip(shipLength, coordinates, horizontal)
        ships.push({
            coordinates,
            ship: newShip
        })
    }

    const receiveAttack = coordinates => {
        let gotShip = false;
        ships.map(v => v.ship).forEach(n => {
            if (n.getPositions().some(v => v.coordinates.x === coordinates.x && v.coordinates.y === coordinates.y)) {
                n.hit(coordinates)
                if (n.getSunk()) {
                    const adjCoords = []
                    if (!n.getHorizontal()) {
                        n.getPositions().forEach(pos => {
                            adjCoords.push({ y: pos.coordinates.y, x: pos.coordinates.x + 1 }, { y: pos.coordinates.y, x: pos.coordinates.x - 1 })
                        })

                        adjCoords.push({ y: n.getPositions()[0].coordinates.y - 1, x: n.getPositions()[0].coordinates.x }, { y: n.getPositions()[0].coordinates.y - 1, x: n.getPositions()[0].coordinates.x - 1 }, { y: n.getPositions()[0].coordinates.y - 1, x: n.getPositions()[0].coordinates.x + 1 })
                        adjCoords.push({ y: n.getPositions()[n.getLength() - 1].coordinates.y + 1, x: n.getPositions()[n.getLength() - 1].coordinates.x }, { y: n.getPositions()[n.getLength() - 1].coordinates.y + 1, x: n.getPositions()[n.getLength() - 1].coordinates.x - 1 }, { y: n.getPositions()[n.getLength() - 1].coordinates.y + 1, x: n.getPositions()[n.getLength() - 1].coordinates.x + 1 })
                    } else {
                        n.getPositions().forEach(pos => {
                            adjCoords.push({ x: pos.coordinates.x, y: pos.coordinates.y + 1 }, { x: pos.coordinates.x, y: pos.coordinates.y - 1 })
                        })
                        adjCoords.push({ x: n.getPositions()[0].coordinates.x - 1, y: n.getPositions()[0].coordinates.y }, { x: n.getPositions()[0].coordinates.x - 1, y: n.getPositions()[0].coordinates.y - 1 }, { x: n.getPositions()[0].coordinates.x - 1, y: n.getPositions()[0].coordinates.y + 1 })
                        adjCoords.push({ x: n.getPositions()[n.getLength() - 1].coordinates.x + 1, y: n.getPositions()[n.getLength() - 1].coordinates.y }, { x: n.getPositions()[n.getLength() - 1].coordinates.x + 1, y: n.getPositions()[n.getLength() - 1].coordinates.y - 1 }, { x: n.getPositions()[n.getLength() - 1].coordinates.x + 1, y: n.getPositions()[n.getLength() - 1].coordinates.y + 1 })
                    }

                    adjCoords.forEach(value => misses.push(value))
                }
                gotShip = true
            }
        })
        misses.push(coordinates)
        if (areAllShipsSunk()) console.log('all ships sunk!')
        return gotShip
    }

    const areAllShipsSunk = () => ships.map(ship => ship.ship).every(v => v.getSunk() == true)

    return { getShips, placeShip, getMisses, receiveAttack }
}

export default gameboardFactory