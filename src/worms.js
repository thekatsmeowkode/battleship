const { Board } = require('./boards')

const Worm = (length, coords = null, orientation) => {
    
    const hits = []

    const isEaten = () => {
        return (hits.size === length)
    }

    const hit = (coordinates) => {
        return hits.push(coordinates)
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