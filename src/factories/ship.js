const shipFactory = (length, hits, sunk) => {

    const isSunk = () => {
        if(hits.every(Boolean)) sunk = true
    }

    const hit = position => {
        hits[position] = true
        isSunk()    
    }

    const getSunk = () => {
        return sunk
    }

    const getLength = () => {
        return length
    }

    const getHits = () => {
        return hits
    }

    return { getLength, getHits, getSunk, hit }
}

export default shipFactory