import { Board } from "./boards";

export const UI = () => {
  const instructionBox = document.getElementById("instruction-box");
    let wormsPlaced = false
    
  const generateTable = (tableID, player) => {
    const table = document.createElement("table");
    table.classList.add(`${player}-table`);
    const boardFrame = document.querySelector(tableID);
    boardFrame.appendChild(table);
    for (let y = 0; y < 10; y++) {
      const row = document.createElement("tr");
      row.classList.add("row");
      for (let x = 0; x < 10; x++) {
        const cell = document.createElement("td");
        cell.classList.add("dropzone");
        cell.classList.add("board-square");
        cell.classList.add(player);
        player === "human" ? (cell.style.pointerEvents = "none") : null;
        player === "robot" ? (cell.style.cursor = "pointer") : null;
        cell.setAttribute("id", `${y}${x}`);
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  };

  const registerClicks = () => {
    let boardSquares = document.getElementsByClassName("board-square");
    for (const square of boardSquares) {
      square.addEventListener("click", (event) => {
        let target = event.target;
        if (target.classList.contains('human')) {
            Board().receiveAttack(String(target.id), 'human')
            //check the missed shots array and pass through information on player
        }

        console.log(target.id);
      });
    }
  };

  const registerHovers = () => {
    document
      .querySelector(".robot-table")
      .addEventListener("mouseover", (event) => {
        let target = event.target;
        target.style.backgroundColor = "red";
      });

    document
      .querySelector(".robot-table")
      .addEventListener("mouseout", (event) => {
        let target = event.target;
        target.style.backgroundColor = "lightgreen";
      });
  };

  const gameStart = (bool) => {
   if (!bool) {
      instructionBox.textContent = "Please place worm on board";
    }
    else {instructionBox.textContent = ''
    const robotCells = document.querySelectorAll('.robot')
    const humanCells = document.querySelectorAll('.human')
    robotCells.forEach(cell => cell.style.pointerEvents = 'none')
    humanCells.forEach(cell => cell.style.pointerEvents = 'all')
    humanCells.forEach(cell => cell.style.cursor = 'pointer')
    wormsPlaced = true
    }
  };

  const displayWorms = (wormCoords) => {
    for (let i = 0; i < wormCoords.length; i++) {
      let boxID = `${wormCoords[i]}`;
      let box = document.querySelectorAll(".robot");
      box.forEach((box) => {
        if (box.id === boxID) {
          box.style.backgroundColor = "red";
          box.style.pointerEvents = "none";
        }
      });
    }
  };

  const createStartButton = (wormsOnBoard) => {
    if (wormsOnBoard.length >=4) {
        let imageHolder = document.querySelector('.images')
        while (imageHolder.firstChild) {
            imageHolder.removeChild(imageHolder.firstChild)
        }
        let container = document.querySelector('.button-holder')
        let button = document.createElement('button')
        button.classList.add('start-button')
        button.textContent = 'Start Game'
        button.addEventListener('click', () => {
            gameStart(true)
            Board().robotSetShips()
        })
        container.appendChild(button)
    }
  }

  return {
    generateTable,
    registerClicks,
    registerHovers,
    gameStart,
    displayWorms,
    createStartButton
  };
};

// module.exports = {UI}
