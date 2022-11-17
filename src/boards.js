const { Worm } = require("./worms")

const Board = () => {
    
    const wormsOnBoard = []
    const missedShots = []

    const createBoard = () => {
        let name
        let board = []

        for (let i=0; i<10; i++) {
            for (let j=0; j<10; j++) {
                name = `${i}`
                name += `${j}`
                board.push(name)
            }
        }
        return board
    }

    //checks for valid placement of worm & creates worm if valid
    const placeWorms = (coords, orientation) => {
        let leadingCoordinate = coords[0]
        let length = coords.length
        if (orientation === 'horizontal') {
            let leadingCoordRow = parseInt(String(leadingCoordinate).charAt(1))
            if (leadingCoordRow > (10 - length))
                { return null }
            else {return holdWorms(Worm(length, coords, 'horizontal'))}
        }
        else if (orientation === 'vertical')  {
            let leadingCoordCol = parseInt(String(leadingCoordinate).charAt(0))
            if (leadingCoordCol > (10 - length))
                {return null}
            else {return holdWorms(Worm(length, coords, 'vertical'))}
        }
    }
    
    //adds worm to Board array
    const holdWorms = (wormObject) => {
        wormsOnBoard.push(wormObject)
    }
    
    //checks if coord clicked matches any worms that exist on board
    const receiveAttack = (coordinates) => {
        for (let i=0; i < wormsOnBoard.length; i++) {
            if (wormsOnBoard[i].coords.includes(coordinates))
                {return wormsOnBoard[i].hit(coordinates)}
            else {continue}
        }
        return recordMiss(coordinates)
    }
    
    const recordMiss = (coordinates) => {
        if (missedShots.includes(coordinates)) {
            return null
        }
        else {missedShots.push(coordinates)}
    }

    const checkDeadWorms = () => {
        for (let i=0; i< wormsOnBoard.length; i++) {
            let tallyOfDead = []
            if (wormsOnBoard[i].coords.length === wormsOnBoard[i].hits.length)
                {wormsOnBoard[i].dead = true
                tallyOfDead.push(wormsOnBoard[i])}
            else {continue}
        }
        if (tallyOfDead.length === wormsOnBoard.length) {} //RUN GAME OVER FUNCTION}
        else return null
    }

    return {createBoard, placeWorms, holdWorms, receiveAttack, recordMiss, checkDeadWorms, wormsOnBoard, missedShots}
}

module.exports = {Board} 