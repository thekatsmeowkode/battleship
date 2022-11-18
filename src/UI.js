
export const UI = () => {
    const instructionBox = document.getElementById('instruction-box')

   const generateTable = (tableID, player) => {
        const table = document.createElement('table')
        table.classList.add(`${player}-table`)
        const boardFrame = document.querySelector(tableID)
        boardFrame.appendChild(table)
        for (let y=0; y < 10; y++) {
            const row = document.createElement('tr')
            row.classList.add('row')
            for (let x=0; x < 10; x++) {
                const cell = document.createElement('td')
                cell.classList.add('dropzone')
                cell.classList.add('board-square')
                cell.classList.add(player)
                player === 'human' ? cell.style.pointerEvents = 'none' : null
                player === 'robot' ? cell.style.cursor = 'pointer' : null
                cell.setAttribute('id', `${y}${x}`)
                row.appendChild(cell)
            }
        table.appendChild(row)
        }
    }

    const registerClicks = () => {
    let boardSquares = document.getElementsByClassName('board-square')
    for (const square of boardSquares) {
        square.addEventListener('click', (event) => {
        let target = event.target
        console.log(target.id)
            })}}

    const registerHovers = () => {
        document.querySelector('.robot-table').addEventListener('mouseover', (event) => {
            let target = event.target
            target.style.backgroundColor='red'
        })
        
        document.querySelector('.robot-table').addEventListener('mouseout', (event) => {
            let target = event.target
            target.style.backgroundColor='lightgreen'
        })
    }

    const gameStart = (bool) => {
        if (!bool) {
            instructionBox.textContent = 'Please place worm on board'
        }
    }

    const displayWorms = (wormCoords) => {
        for (let i=0; i<wormCoords.length; i++) {
            let boxID = `${wormCoords[i]}`
            let box = document.querySelectorAll('.robot')
            box.forEach((box) => {
                if (box.id === boxID) {
                    box.style.backgroundColor = 'red'
                    box.style.pointerEvents = 'none'
                }
            })
            }
        }

    return {generateTable, registerClicks, registerHovers, gameStart, displayWorms}
}

// module.exports = {UI}