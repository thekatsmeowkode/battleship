import { Worm } from "./worms";
import { Dragdrop } from "./dragdrop";
import { UI } from "./UI";
import { Player } from './player'

export const Board = () => {
  const wormsOnBoard = [];
  const playerWormCoords = [];
  const robotWormCoords = [];
  const robotWormObjects = [];
  const missedShotshuman = [];
  const missedShotsrobot = [];

  let startPlayer = player1;
  let player1 = "human";
  let player2 = "robot";

  const switchPlayer = (current) => {
    current === player1 ? (current = player2) : (current = player1);
  };

  //   const createBoard = () => {
  //     let name;
  //     let board = [];
  //     for (let i = 0; i < 10; i++) {
  //       for (let j = 0; j < 10; j++) {
  //         name = `${i}`;
  //         name += `${j}`;
  //         board.push(name);
  //       }
  //     }
  //     return board;
  //   };

  //checks for valid placement of worm & creates worm if valid
 
  const placeWorms = (coords, wormLength, player) => {
    if (player === 'human') {
      let yValue = coords.charAt(1);
      let upperLimit = 10 - wormLength;
      if (yValue > upperLimit) {
        return null;
      } else {
        let generatedArray = generateCoordsArray(coords, wormLength);
        let wormCheck = findCommonElements(generatedArray, player);
        if (!wormCheck) {
          UI().displayWorms(generatedArray);
          holdWorms(Worm(wormLength, generatedArray, player), player);
        } else return null;
      }
    }
    if (player === player2) {
        let yValue = coords.charAt(1);
        let upperLimit = 10 - wormLength;
        if (yValue > upperLimit) {
          return null;
        } else {
          let generatedArray = generateCoordsArray(coords, wormLength);
          let wormCheck = findCommonElements(generatedArray, player);
          if (!wormCheck) {
            holdWorms(Worm(wormLength, generatedArray, player), player);
          } else return null;
        }
    }
  };

  // else if (orientation === 'vertical')  {
  //     let leadingCoordCol = parseInt(String(leadingCoordinate).charAt(0))
  //     if (leadingCoordCol > (10 - length))
  //         {return null}
  //     else {return holdWorms(Worm(length, coords, 'vertical'))}
  // }
  const generateCoordsArray = (coords, length) => {
    let newArray = [];
    let yValue = `${coords.charAt(1)}`;
    for (let i = 0; i < length; i++) {
      let xValue = `${coords.charAt(0)}`;
      let xy = `${xValue}${yValue++}`;
      newArray.push(xy);
    }
    return newArray;
  };

  const findCommonElements = (proposedCoords, player) => {
    if (player === "human") {
      const flatArray = playerWormCoords.flat();
      return flatArray.some((item) => proposedCoords.includes(item));
    }
    if (player === "robot") {
      const flatArray = robotWormCoords.flat();
      return flatArray.some((item) => proposedCoords.includes(item));
    }
  };

  //adds worm to Board array
  const holdWorms = (wormObject, player) => {
    if (player === 'human') {
      playerWormCoords.push(wormObject.coords);
      wormsOnBoard.push(wormObject);
      UI().createStartButton(wormsOnBoard);
    }
    if (player === 'robot') {
      robotWormObjects.push(wormObject);
      robotWormCoords.push(wormObject.coords);
    }
  };

  const robotSetShips = () => {
    placeWorms(Player().randomChoice(), 2, 'robot')
    placeWorms(Player().randomChoice(), 3, 'robot')
    placeWorms(Player().randomChoice(), 4, 'robot')
    placeWorms(Player().randomChoice(), 5, 'robot')
  };

  //checks if coord clicked matches any worms that exist on board
  const receiveAttack = (coordinates, player) => {
    if (player === player2) {
      for (let i = 0; i < wormsOnBoard.length; i++) {
        if (wormsOnBoard[i].coords.includes(coordinates)) {
          return wormsOnBoard[i].hit(coordinates);
        } else {
          return recordMiss(coordinates, player2);
        }
      }
    }
    if (player === player1) {
      for (let j = 0; j < robotWormObjects.length; j++) {
        if (robotWormObjects[i].coords.includes(coordinates)) {
          return robotWormObjects[i].hit(coordinates);
        } else {
          return recordMiss(coordinates, player1);
        }
      }
    }
  };

  //need to designate what player array to add to
  const recordMiss = (coordinates, currentPlayer) => {
    if (currentPlayer === player1) {
      missedShotshuman.includes(coordinates)
        ? null
        : missedShotshuman.push(coordinates);
    }
    if (currentPlayer === player2) {
      missedShotsrobot.includes(coordinates)
        ? null
        : missedShotsrobot.push(coordinates);
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
    placeWorms,
    holdWorms,
    receiveAttack,
    recordMiss,
    checkDeadWorms,
    robotSetShips,
    wormsOnBoard,
    missedShotshuman,
    missedShotsrobot,
    playerWormCoords,
    player1,
    player2,
  };
};
