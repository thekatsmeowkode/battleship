function Worm(length) {
    return {
        length: length,
        hits: [], 
        hit(position) {}, 
        isEaten() {return hits.length === length}
    }
}

module.exports=Worm