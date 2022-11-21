import { Worm } from "./worms";
import { UI } from "./UI";
import { player, ui } from './index'

export function Board() {
  const wormsOnBoard = [];
  const playerWormCoords = [];
  const robotWormCoords = [];
  const robotWormObjects = [];
  const missedShotshuman = [];
  const missedShotsrobot = [];
  const totalRobotHits = []
  const totalHumanHits = []
  let tallyOfDead = [];
  let choices = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99"]
  let randomChoice = choices[Math.floor(Math.random() * 101)];

  let currentPlayer = player1;
  let player1 = "human";
  let player2 = "robot";


  const switchPlayer = (current) => {
    current === player1 ? (current = player2) : (current = player1);
  };

  const duplicateChecker = (coords, player) => {
    if (player === player1) {
        if (missedShotshuman.contains(coords) || totalRobotHits.contains(coords))
        {return true}
    }
    if (player === player2) {
        if (missedShotsrobot.contains(coords) || totalHumanHits.contains(coords))
        {return true}
    }
  }
 
  const placeWorms = (coords, wormLength, playerName) => {
    if (playerName === 'human') {
      let yValue = coords.charAt(1);
      let upperLimit = 10 - wormLength;
      if (yValue > upperLimit) {
        return null;
      } else {
        let generatedArray = generateCoordsArray(coords, wormLength);
        let wormCheck = findCommonElements(generatedArray, playerName);
        if (!wormCheck) {
          UI().displayWorms(generatedArray);
          holdWorms(Worm(wormLength, generatedArray, playerName), playerName);
        } else return null;
      }
    }
    if (playerName === 'robot') {
        let yValue = String(coords)[1];
        let upperLimit = 10 - wormLength;
        if (yValue > upperLimit) {
          return placeWorms(player.randomChoice(), wormLength, playerName)
        } else {
          let generatedArray = generateCoordsArray(coords, wormLength);
          let wormCheck = findCommonElements(generatedArray, playerName);
          if (!wormCheck) {
            holdWorms(Worm(wormLength, generatedArray, playerName), playerName);
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
    let yValue = String(coords)[1];
    for (let i = 0; i < length; i++) {
      let xValue = String(coords)[0];
      let xy = xValue + yValue++;
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
    placeWorms(player.randomChoice(), 2, 'robot')
    placeWorms(player.randomChoice(), 3, 'robot')
    placeWorms(player.randomChoice(), 4, 'robot')
    placeWorms(player.randomChoice(), 5, 'robot')
  };

  //checks if coord clicked matches any worms that exist on board
  const receiveAttack = (coordinates, player) => {
    if (player === player2) {
       if (duplicateChecker(player2) === true) {receiveAttack(player.randomChoice()), player1}
      for (let i = 0; i < wormsOnBoard.length; i++) {
        if (wormsOnBoard[i].coords.includes(coordinates)) {
          wormsOnBoard[i].hit(coordinates);
          totalHumanHits.push(coordinates)
          checkDeadWorms(player2)
          return ui.changeColor(player2, coordinates, 'hit')
        } 
        else {continue}
    }
    recordMiss(coordinates, player2)
}
    if (player === player1) {
        if (duplicateChecker(player1) === true) {return null}
      for (let j = 0; j < robotWormObjects.length; j++) {
        if (robotWormObjects[j].coords.includes(coordinates)) {
          robotWormObjects[j].hit(coordinates);
          totalRobotHits.push(coordinates)
          checkDeadWorms(player1)
          ui.changeColor(player1, coordinates, 'hit')
          return receiveAttack(randomChoice, 'robot')
        }
         else {continue}
    }
    recordMiss(coordinates, player1);
      receiveAttack(randomChoice, 'robot')}
  };
  
  const recordMiss = (coordinates, currentPlayer) => {
    if (currentPlayer === player1) {
      missedShotshuman.includes(coordinates)
        ? null
        : missedShotshuman.push(coordinates);
        ui.changeColor(player1, coordinates, 'miss')
    }
    if (currentPlayer === player2) {
      missedShotsrobot.includes(coordinates)
        ? null
        : missedShotsrobot.push(coordinates);
        ui.changeColor(player2, coordinates, 'miss')
    }
  };

  const checkDeadWorms = (player) => {
    if (player === player1) {
        if (totalHumanHits.length === playerWormCoords.flat().length) {
            const instructionBox = document.getElementById("instruction-box");
            instructionBox.textContent = 'Game over, Robot wins'}    
    } 
    if (player === player2) {
        if (totalRobotHits.length === robotWormCoords.flat().length) {
            const instructionBox = document.getElementById("instruction-box");
            instructionBox.textContent = 'Game over, Human wins'}
        }
    }


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
    totalRobotHits,
    totalHumanHits,
    player1,
    player2,
  };
};
