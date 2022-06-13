const shipFactory = (length, positions, sunk, horizontal) => {

    const isSunk = () => {
        if(positions.every(v => v.hit == true)) sunk = true
    }

    const hit = position => {
        positions.find(n => n.coordinates.x == position.x && n.coordinates.y == position.y).hit = true
        return isSunk()
    }

    const getSunk = () => sunk

    const getLength = () => length

    const getPositions = () => positions

    const getHorizontal = () => horizontal

    return { getLength, getPositions, getSunk, hit, getHorizontal }
}

export default shipFactory