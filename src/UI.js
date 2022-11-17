const UI = () => {
   const generateTable = (tableID, player) => {
        const table = document.createElement('table')
        const boardFrame = document.querySelector(tableID)
        boardFrame.appendChild(table)
        for (let y=0; y < 10; y++) {
            const row = document.createElement('tr')
            row.classList.add('row')
            for (let x=0; x < 10; x++) {
                const cell = document.createElement('td')
                cell.classList.add('board-square')
                cell.classList.add(player)
                cell.setAttribute('id', `${y}${x}`)
                row.appendChild(cell)
            }
        table.appendChild(row)
        }
    }

    return {generateTable}
}

module.exports = {UI}