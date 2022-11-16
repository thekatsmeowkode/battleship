const { Worm } = require("./worms")

const Board = () => {
    
    const wormsOnBoard = []

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

    const placeWorms = (coords, orientation) => {
        let leadingCoordinate = coords[0]
        let length = coords.length
        if (orientation === 'horizontal') {
            let leadingCoordRow = parseInt(String(leadingCoordinate).charAt(1))
            if (leadingCoordRow > (10 - length))
                { return null }
            else {return holdWorms(Worm(length, coords))}
        }
        else if (orientation === 'vertical')  {
            let leadingCoordCol = parseInt(String(leadingCoordinate).charAt(0))
            if (leadingCoordCol > (10 - length))
                {return null}
            else {return holdWorms(Worm(length, coords))}
        }
    }
    
    //adds worm to Board array
    const holdWorms = (worm) => {
        let wormCoords = worm[coords]
        wormsOnBoard.push(wormCoords)
    }
    
    const receiveAttack = (coords) => {

    }

    return {createBoard, placeWorms, receiveAttack, wormsOnBoard}
}

module.exports = {Board} 