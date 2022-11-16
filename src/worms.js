const { Board } = require('./boards')

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

    const decideWormName = (length) => {
        let wormName
        switch (length) {
            case 2:
                wormName = 'grub'
                break;
            case 3:
                wormName = 'larvae'
                break;
            case 4:
                wormName = 'flatworm'
                break;
            case 5:
                wormName = 'earthworm'
                break;
            default:
                wormName = 'worm'
        }
        return wormName
    }

    const wormName = decideWormName(length)

    return {
        decideWormName,
        hit,
        isEaten,
        coords,
        orientation,
        length,
        hits,
        wormName
    }
}

module.exports = {Worm}