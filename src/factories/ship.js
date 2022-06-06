const shipFactory = (length, positions, sunk) => {

    const isSunk = () => {
        if(positions.every(v => v.hit == true)) sunk = true
        console.log('ship sunk? ', positions.every(v => v.hit == true))
    }

    const hit = position => {
        positions.find(n => n.coordinates.x == position.x && n.coordinates.y == position.y).hit = true
        isSunk()
    }

    const getSunk = () => sunk

    const getLength = () => length

    const getPositions = () => positions

    return { getLength, getPositions, getSunk, hit }
}

export default shipFactory