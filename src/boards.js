const { Worm } = require("./worms");
import { Dragdrop } from "./dragdrop";
import { UI } from "./UI";

export const Board = () => {
  const wormsOnBoard = [];
  const allWormCoords = [];
  const missedShots = [];

  const createBoard = () => {
    let name;
    let board = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        name = `${i}`;
        name += `${j}`;
        board.push(name);
      }
    }
    return board;
  };

  //checks for valid placement of worm & creates worm if valid
  const placeWorms = (coords, wormLength, orientation) => {
    if (orientation === "horizontal") {
      let leadingCoordRow = parseInt(String(coords).charAt(1));
      let upperLimit = 10 - wormLength;
      if (leadingCoordRow > upperLimit) {
        return null;
      } else {
        let wormCoords = [];
        let staticCoords = `${coords.charAt(0)}`;
        for (let i = 0; i < wormLength; i++) {
          wormCoords.push(`${staticCoords}${leadingCoordRow++}`);
        }
        let wormCheck = findCommonElements(wormCoords);
        if (!wormCheck) {
          UI().displayWorms(wormCoords);
          holdWorms(Worm(wormLength, wormCoords, "horizontal"));
        } 
        else return null
      }
    }
  };

  // else if (orientation === 'vertical')  {
  //     let leadingCoordCol = parseInt(String(leadingCoordinate).charAt(0))
  //     if (leadingCoordCol > (10 - length))
  //         {return null}
  //     else {return holdWorms(Worm(length, coords, 'vertical'))}
  // }

  const findCommonElements = (proposedCoords) => {
    const flatArray = allWormCoords.flat();
    return flatArray.some((item) => proposedCoords.includes(item));
  };

  //adds worm to Board array
  const holdWorms = (wormObject) => {
    wormsOnBoard.push(wormObject);
    allWormCoords.push(wormObject.coords);
    createStartButton(wormsOnBoard)
  };

  const createStartButton = (wormsOnBoard) => {
    if (wormsOnBoard.length >=4) {
        let imageHolder = document.querySelector('.images')
        while (imageHolder.firstChild) {
            imageHolder.removeChild(imageHolder.firstChild)
        }
        let container = document.querySelector('.button-holder')
        let button = document.createElement('button')
        container.appendChild(button)
    }
  }

  //checks if coord clicked matches any worms that exist on board
  const receiveAttack = (coordinates) => {
    for (let i = 0; i < wormsOnBoard.length; i++) {
      if (wormsOnBoard[i].coords.includes(coordinates)) {
        return wormsOnBoard[i].hit(coordinates);
      } else {
        continue;
      }
    }
    return recordMiss(coordinates);
  };

  const recordMiss = (coordinates) => {
    if (missedShots.includes(coordinates)) {
      return null;
    } else {
      missedShots.push(coordinates);
    }
  };

  const checkDeadWorms = () => {
    for (let i = 0; i < wormsOnBoard.length; i++) {
      let tallyOfDead = [];
      if (wormsOnBoard[i].coords.length === wormsOnBoard[i].hits.length) {
        wormsOnBoard[i].dead = true;
        tallyOfDead.push(wormsOnBoard[i]);
      } else {
        continue;
      }
    }
    if (tallyOfDead.length === wormsOnBoard.length) {
    } //RUN GAME OVER FUNCTION}
    else return null;
  };

  return {
    createBoard,
    placeWorms,
    holdWorms,
    receiveAttack,
    recordMiss,
    checkDeadWorms,
    wormsOnBoard,
    missedShots,
  };
};

// module.exports = {Board}
