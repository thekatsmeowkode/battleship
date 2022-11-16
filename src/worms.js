const Worm = (length, coords = null, orientation) => {
    //set doesn't allow duplicate values, good for hits functionality
    const hits = new Set()

    const isEaten = () => {
        return (hits.size === length)
    }

    const hit = (coordinates) => {
        //add logic to see if hit coordinates don't already exist in set and are on valid place on board and ship location
        hits.add(coordinates)
    }

    return {
        hit,
        coords,
        orientation
        length,
        isEaten,
        hits
    }
}

module.exports = {Worm}