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

    //checks for valid placement of worm & creates worm if valid
    const placeWorms = (coords, orientation) => {
        let leadingCoordinate = coords[0]
        let length = coords.length
        if (orientation === 'horizontal') {
            let leadingCoordRow = parseInt(String(leadingCoordinate).charAt(1))
            if (leadingCoordRow > (10 - length))
                { return null }
            else {
                
                return holdWorms(Worm(length, coords, 'horizontal'))}
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
        let wormLabel = wormObject.wormName
        let wormCoords = wormObject.coords
        wormForMemory = {}
        wormForMemory[wormLabel] = wormCoords
        wormsOnBoard.push(wormForMemory)
    }
    
    //checks if coord clicked matches any worms that exist on board
    const receiveAttack = (coords) => {
        if (wormsOnBoard.map(Object.values).some(([i]) => i.includes(coords)))
            {return true}
        else {return false}
            
        }

    const sendAttackToWorm = (wormArray, coords) => {
        console.log('hello')
    }

    return {createBoard, placeWorms, holdWorms, receiveAttack, sendAttackToWorm, wormsOnBoard}
}

module.exports = {Board} 