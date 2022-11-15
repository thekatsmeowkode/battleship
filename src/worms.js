const Worm = ({length}) => {
    const hits = new Set()

    const isEaten = () => {
        return hits.size === length
    }

    return {
        length,
        isEaten,
        hits: []
    }
}

module.exports = {Worm}