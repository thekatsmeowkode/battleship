/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UI": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./src/index.js");

function UI() {
  var instructionBox = document.getElementById("instruction-box");
  var wormsPlaced = false;
  var generateTable = function generateTable(tableID, player) {
    var table = document.createElement("table");
    table.classList.add("".concat(player, "-table"));
    var boardFrame = document.querySelector(tableID);
    boardFrame.appendChild(table);
    for (var y = 0; y < 10; y++) {
      var row = document.createElement("tr");
      row.classList.add("row");
      for (var x = 0; x < 10; x++) {
        var cell = document.createElement("td");
        cell.classList.add("dropzone");
        cell.classList.add("board-square");
        cell.classList.add(player);
        player === "human" ? cell.style.pointerEvents = "none" : null;
        player === "robot" ? cell.style.cursor = "pointer" : null;
        cell.setAttribute("id", "".concat(y).concat(x));
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  };
  var registerHovers = function registerHovers() {
    document.querySelector(".robot-table").addEventListener("mouseover", function (event) {
      var target = event.target;
      target.style.backgroundColor = "pink";
    });
    document.querySelector(".robot-table").addEventListener("mouseout", function (event) {
      var target = event.target;
      target.style.backgroundColor = "lightgreen";
    });
  };
  var gameStart = function gameStart(bool) {
    if (!bool) {
      instructionBox.textContent = "Please drag and drop up to 4 worms on right-hand board. Worm lengths run from 2 units to 5 units, left to right";
    } else {
      instructionBox.textContent = "To start game, click any square on the left-side board.  Red indicates a hit and dark green indicates a miss.  The robot will make a move automatically after you choose.  Good luck!";
      var robotCells = document.querySelectorAll(".robot");
      var humanCells = document.querySelectorAll(".human");
      robotCells.forEach(function (cell) {
        return cell.style.pointerEvents = "none";
      });
      humanCells.forEach(function (cell) {
        return cell.style.pointerEvents = "all";
      });
      humanCells.forEach(function (cell) {
        return cell.style.cursor = "pointer";
      });
      wormsPlaced = true;
    }
  };
  var displayWorms = function displayWorms(wormCoords) {
    var _loop = function _loop(i) {
      var boxID = "".concat(wormCoords[i]);
      var box = document.querySelectorAll(".robot");
      box.forEach(function (box) {
        if (box.id === boxID) {
          box.style.backgroundColor = "pink";
          box.style.pointerEvents = "none";
        }
      });
    };
    for (var i = 0; i < wormCoords.length; i++) {
      _loop(i);
    }
  };
  var createStartButton = function createStartButton(wormsOnBoard) {
    var button = document.createElement("button");
    if (wormsOnBoard.length >= 4) {
      var imageHolder = document.querySelector(".images");
      while (imageHolder.firstChild) {
        imageHolder.removeChild(imageHolder.firstChild);
      }
      var container = document.querySelector(".button-holder");
      button.classList.add("start-button");
      button.textContent = "Start Game";
      container.appendChild(button);
    }
    button.addEventListener("click", function () {
      gameStart(true);
      _index_js__WEBPACK_IMPORTED_MODULE_0__.board.robotSetShips();
      button.style.visibility = "hidden";
    });
  };
  function changeColor(player, coords, hit) {
    var playerName = "." + player;
    var IDsquare = document.querySelectorAll(playerName);
    if (hit === "hit") {
      IDsquare.forEach(function (square) {
        if (square.id === coords) {
          square.style.backgroundColor = "red";
          square.style.pointerEvents = "none";
        }
      });
    } else {
      IDsquare.forEach(function (square) {
        if (square.id === coords) {
          square.style.backgroundColor = "darkgreen";
          square.style.pointerEvents = "none";
        }
      });
    }
  }
  return {
    generateTable: generateTable,
    registerHovers: registerHovers,
    gameStart: gameStart,
    displayWorms: displayWorms,
    createStartButton: createStartButton,
    changeColor: changeColor
  };
}

/***/ }),

/***/ "./src/boards.js":
/*!***********************!*\
  !*** ./src/boards.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Board": () => (/* binding */ Board)
/* harmony export */ });
/* harmony import */ var _worms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./worms */ "./src/worms.js");
/* harmony import */ var _worms__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_worms__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./src/UI.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./src/index.js");



function Board() {
  var wormsOnBoard = [];
  var playerWormCoords = [];
  var robotWormCoords = [];
  var robotWormObjects = [];
  var missedShotshuman = [];
  var missedShotsrobot = [];
  var totalRobotHits = [];
  var totalHumanHits = [];
  var choices = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99"];
  var player1 = "human";
  var player2 = "robot";
  function randomNumber(array) {
    var randomNumber = Math.floor(Math.random() * 100);
    return array[randomNumber];
  }
  var duplicateChecker = function duplicateChecker(coords) {
    if (missedShotsrobot.includes(coords) || totalHumanHits.includes(coords)) {
      return true;
    } else {
      return false;
    }
  };
  var placeWorms = function placeWorms(coords, wormLength, playerName) {
    if (playerName === "human") {
      var yValue = coords.charAt(1);
      var upperLimit = 10 - wormLength;
      if (yValue > upperLimit) {
        return null;
      } else {
        var generatedArray = generateCoordsArray(coords, wormLength);
        var wormCheck = findCommonElements(generatedArray, playerName);
        if (!wormCheck) {
          (0,_UI__WEBPACK_IMPORTED_MODULE_1__.UI)().displayWorms(generatedArray);
          holdWorms((0,_worms__WEBPACK_IMPORTED_MODULE_0__.Worm)(wormLength, generatedArray, playerName), playerName);
        } else return null;
      }
    }
    if (playerName === "robot") {
      var _yValue = String(coords)[1];
      var _upperLimit = 10 - wormLength;
      if (_yValue > _upperLimit) {
        placeWorms(randomNumber(choices), wormLength, playerName);
      } else {
        var _generatedArray = generateCoordsArray(coords, wormLength);
        var _wormCheck = findCommonElements(_generatedArray, playerName);
        if (!_wormCheck) {
          holdWorms((0,_worms__WEBPACK_IMPORTED_MODULE_0__.Worm)(wormLength, _generatedArray, playerName), playerName);
        } else placeWorms(randomNumber(choices), wormLength, playerName);
      }
    }
  };
  var generateCoordsArray = function generateCoordsArray(coords, length) {
    var newArray = [];
    var yValue = String(coords)[1];
    for (var i = 0; i < length; i++) {
      var xValue = String(coords)[0];
      var xy = xValue + yValue++;
      newArray.push(xy);
    }
    return newArray;
  };
  var findCommonElements = function findCommonElements(proposedCoords, player) {
    if (player === "human") {
      var flatArray = playerWormCoords.flat();
      return flatArray.some(function (item) {
        return proposedCoords.includes(item);
      });
    }
    if (player === "robot") {
      var _flatArray = robotWormCoords.flat();
      return _flatArray.some(function (item) {
        return proposedCoords.includes(item);
      });
    }
  };
  var holdWorms = function holdWorms(wormObject, player) {
    if (player === "human") {
      playerWormCoords.push(wormObject.coords);
      wormsOnBoard.push(wormObject);
      (0,_UI__WEBPACK_IMPORTED_MODULE_1__.UI)().createStartButton(wormsOnBoard);
    }
    if (player === "robot") {
      robotWormObjects.push(wormObject);
      robotWormCoords.push(wormObject.coords);
    }
  };
  var robotSetShips = function robotSetShips() {
    placeWorms(_index__WEBPACK_IMPORTED_MODULE_2__.player.randomChoice(), 2, "robot");
    placeWorms(_index__WEBPACK_IMPORTED_MODULE_2__.player.randomChoice(), 3, "robot");
    placeWorms(_index__WEBPACK_IMPORTED_MODULE_2__.player.randomChoice(), 4, "robot");
    placeWorms(_index__WEBPACK_IMPORTED_MODULE_2__.player.randomChoice(), 5, "robot");
  };
  var receiveAttackRobot = function receiveAttackRobot(coordinates) {
    if (duplicateChecker(coordinates)) {
      coordinates = randomNumber(choices);
      receiveAttackRobot(coordinates, player2);
    } else {
      if (playerWormCoords.flat().includes(coordinates)) {
        robotHit(coordinates);
      } else {
        recordMiss(coordinates, player2);
        checkDeadWorms(player2);
        _index__WEBPACK_IMPORTED_MODULE_2__.ui.changeColor(player2, coordinates, "miss");
      }
    }
  };
  var robotHit = function robotHit(coordinates) {
    totalHumanHits.push(coordinates);
    checkDeadWorms(player2);
    _index__WEBPACK_IMPORTED_MODULE_2__.ui.changeColor(player2, coordinates, "hit");
  };
  var receiveAttack = function receiveAttack(coordinates, player) {
    if (player === player2) {
      receiveAttackRobot(coordinates);
    }
    if (player === player1) {
      for (var j = 0; j < robotWormObjects.length; j++) {
        if (robotWormObjects[j].coords.includes(coordinates)) {
          robotWormObjects[j].hit(coordinates);
          totalRobotHits.push(coordinates);
          checkDeadWorms(player1);
          _index__WEBPACK_IMPORTED_MODULE_2__.ui.changeColor(player1, coordinates, "hit");
          return receiveAttackRobot(randomNumber(choices));
        } else {
          continue;
        }
      }
      recordMiss(coordinates, player1);
      _index__WEBPACK_IMPORTED_MODULE_2__.ui.changeColor(player1, coordinates, "miss");
      checkDeadWorms(player1);
      receiveAttackRobot(randomNumber(choices));
    }
  };
  var recordMiss = function recordMiss(coordinates, currentPlayer) {
    if (currentPlayer === player1) {
      missedShotshuman.includes(coordinates) ? null : missedShotshuman.push(coordinates);
      _index__WEBPACK_IMPORTED_MODULE_2__.ui.changeColor(player1, coordinates, "miss");
    }
    if (currentPlayer === player2) {
      missedShotsrobot.includes(coordinates) ? receiveAttack(randomNumber(choices), player2) : missedShotsrobot.push(coordinates);
      _index__WEBPACK_IMPORTED_MODULE_2__.ui.changeColor(player2, coordinates, "miss");
    }
  };
  var checkDeadWorms = function checkDeadWorms(player) {
    function addResetButton() {
      var instructionBox = document.getElementById("instruction-box");
      instructionBox.style.display = 'flex';
      instructionBox.style.flexDirection = 'column';
      var resetButton = document.createElement('button');
      resetButton.classList.add('reset-button');
      resetButton.textContent = 'Reset Board';
      instructionBox.appendChild(resetButton);
      resetButton.addEventListener('click', reload, false);
    }
    function reload() {
      reload = location.reload();
    }
    if (player === player1) {
      if (totalHumanHits.length === playerWormCoords.flat().length) {
        instructionBox.textContent = "Game over, Robot wins!!";
        instructionBox.style.fontSize = '70px';
        instructionBox.style.fontFamily = 'Butterfly Kids';
        addResetButton();
      }
    }
    if (player === player2) {
      if (totalRobotHits.length === robotWormCoords.flat().length) {
        var _instructionBox = document.getElementById("instruction-box");
        _instructionBox.textContent = "Game over, you win!!";
        _instructionBox.style.fontSize = '70px';
        _instructionBox.style.fontFamily = 'Butterfly Kids';
        addResetButton();
      }
    }
  };
  return {
    placeWorms: placeWorms,
    holdWorms: holdWorms,
    receiveAttack: receiveAttack,
    recordMiss: recordMiss,
    checkDeadWorms: checkDeadWorms,
    robotSetShips: robotSetShips,
    wormsOnBoard: wormsOnBoard,
    missedShotshuman: missedShotshuman,
    missedShotsrobot: missedShotsrobot,
    playerWormCoords: playerWormCoords,
    totalRobotHits: totalRobotHits,
    totalHumanHits: totalHumanHits,
    player1: player1,
    player2: player2
  };
}

/***/ }),

/***/ "./src/dragdrop.js":
/*!*************************!*\
  !*** ./src/dragdrop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dragdrop": () => (/* binding */ Dragdrop)
/* harmony export */ });
/* harmony import */ var _assets_grub_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/grub.png */ "./src/assets/grub.png");
/* harmony import */ var _assets_pupae_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/pupae.png */ "./src/assets/pupae.png");
/* harmony import */ var _assets_shovel_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/shovel.png */ "./src/assets/shovel.png");
/* harmony import */ var _assets_flatworm_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/flatworm.png */ "./src/assets/flatworm.png");
/* harmony import */ var _assets_earthworm_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/earthworm.png */ "./src/assets/earthworm.png");
/* harmony import */ var _boards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./boards */ "./src/boards.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./index */ "./src/index.js");







function Dragdrop() {
  var component = function component() {
    var images = document.querySelector(".images");
    var grubImg = document.createElement("img");
    grubImg.classList.add("bug-images");
    grubImg.setAttribute("id", "grub");
    grubImg.classList.add("draggable");
    grubImg.setAttribute("draggable", true);
    grubImg.setAttribute("length", 2);
    grubImg.src = _assets_grub_png__WEBPACK_IMPORTED_MODULE_0__;
    grubImg.alt = "image of grub";
    images.appendChild(grubImg);
    //
    var pupaeImg = document.createElement("img");
    pupaeImg.classList.add("bug-images");
    pupaeImg.classList.add("draggable");
    pupaeImg.setAttribute("draggable", true);
    pupaeImg.setAttribute("length", 3);
    pupaeImg.setAttribute("id", "pupae");
    pupaeImg.src = _assets_pupae_png__WEBPACK_IMPORTED_MODULE_1__;
    pupaeImg.alt = "image of pupae";
    images.appendChild(pupaeImg);
    //
    var flatwormImg = document.createElement("img");
    flatwormImg.classList.add("bug-images");
    flatwormImg.classList.add("draggable");
    flatwormImg.setAttribute("draggable", true);
    flatwormImg.setAttribute("length", 4);
    flatwormImg.setAttribute("id", "flatworm");
    flatwormImg.src = _assets_flatworm_png__WEBPACK_IMPORTED_MODULE_3__;
    flatwormImg.alt = "image of flatworm";
    images.appendChild(flatwormImg);
    //
    var earthwormImg = document.createElement("img");
    earthwormImg.classList.add("bug-images");
    earthwormImg.classList.add("draggable");
    earthwormImg.setAttribute("length", 5);
    earthwormImg.setAttribute("draggable", true);
    earthwormImg.setAttribute("id", "earthworm");
    earthwormImg.src = _assets_earthworm_png__WEBPACK_IMPORTED_MODULE_4__;
    earthwormImg.alt = "image of flatworm";
    images.appendChild(earthwormImg);
  };
  var addListeners = function addListeners() {
    document.body.addEventListener("dragstart", handleDragStart);
    document.body.addEventListener("drop", handleDrop);
    document.body.addEventListener("dragover", handleOver);
    document.body.addEventListener("dragenter", handleEnter);
    document.body.addEventListener("dragleave", handleLeave);
  };
  var handleDragStart = function handleDragStart(event) {
    var obj = event.target;
    if (!obj.closest(".draggable")) return;
    if (obj.classList.contains("draggable")) {
      obj = obj.getAttribute("length");
    }
    var img = new Image();
    img.src = _assets_shovel_png__WEBPACK_IMPORTED_MODULE_2__;
    event.dataTransfer.setDragImage(img, 120, 0);
    event.dataTransfer.setData("text/plain", obj);
  };
  var handleDrop = function handleDrop(event) {
    var dropzone = event.target;
    var id = dropzone.id;
    if (!dropzone.classList.contains("dropzone")) return;
    event.preventDefault();
    var wormLength = event.dataTransfer.getData("text/plain");
    _index__WEBPACK_IMPORTED_MODULE_6__.board.placeWorms(id, wormLength, "human");
  };
  var handleOver = function handleOver(event) {
    var dropzone = event.target;
    if (!dropzone.classList.contains("dropzone")) return;
    event.preventDefault();
  };
  var handleEnter = function handleEnter(event) {
    var dropzone = event.target;
    if (!dropzone.classList.contains("dropzone")) return;
    event.preventDefault();
    dropzone.style.backgroundColor = "red";
  };
  var handleLeave = function handleLeave(event) {
    var dropzone = event.target;
    if (!dropzone.classList.contains("dropzone")) return;
    event.preventDefault();
    dropzone.style.backgroundColor = "lightgreen";
  };
  return {
    component: component,
    addListeners: addListeners,
    handleDragStart: handleDragStart,
    handleDrop: handleDrop
  };
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "board": () => (/* binding */ board),
/* harmony export */   "dragdrop": () => (/* binding */ dragdrop),
/* harmony export */   "player": () => (/* binding */ player),
/* harmony export */   "ui": () => (/* binding */ ui),
/* harmony export */   "worm": () => (/* binding */ worm)
/* harmony export */ });
/* harmony import */ var _UI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI.js */ "./src/UI.js");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _dragdrop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dragdrop.js */ "./src/dragdrop.js");
/* harmony import */ var _boards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boards */ "./src/boards.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _worms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./worms */ "./src/worms.js");
/* harmony import */ var _worms__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_worms__WEBPACK_IMPORTED_MODULE_5__);






var ui = (0,_UI_js__WEBPACK_IMPORTED_MODULE_0__.UI)();
var dragdrop = (0,_dragdrop_js__WEBPACK_IMPORTED_MODULE_2__.Dragdrop)();
var player = (0,_player__WEBPACK_IMPORTED_MODULE_4__.Player)();
var board = (0,_boards__WEBPACK_IMPORTED_MODULE_3__.Board)();
var worm = (0,_worms__WEBPACK_IMPORTED_MODULE_5__.Worm)();
ui.generateTable("#player-board", "human");
ui.generateTable("#robot-board", "robot");
ui.registerHovers();
dragdrop.component();
dragdrop.addListeners();
function registerClicks() {
  document.querySelectorAll(".human").forEach(function (square) {
    return square.addEventListener("click", function (event) {
      var target = event.target;
      board.receiveAttack(target.id, "human");
      console.log(target.id);
    });
  });
}
registerClicks();
ui.gameStart(false);

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _boards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boards */ "./src/boards.js");

function Player() {
  var previousChoices = [];
  var robotAttack = function robotAttack() {
    var randomAttack = randomChoice();
    _boards__WEBPACK_IMPORTED_MODULE_0__.Board.receiveAttack(randomAttack);
  };
  var randomChoice = function randomChoice() {
    var choices = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99"];
    var randomNumber = Math.floor(Math.random() * 100);
    var randomPick = choices[randomNumber];
    console.log(randomPick);
    if (previousChoices.includes(randomPick)) {
      randomChoice();
    } else {
      previousChoices.push(randomPick);
      return randomPick;
    }
  };
  return {
    robotAttack: robotAttack,
    randomChoice: randomChoice
  };
}
;

/***/ }),

/***/ "./src/worms.js":
/*!**********************!*\
  !*** ./src/worms.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(/*! ./boards */ "./src/boards.js"),
  Board = _require.Board;
var Worm = function Worm(length, coords, player) {
  var hits = [];
  var dead = false;
  var isEaten = function isEaten() {
    return hits.size === length;
  };
  var hit = function hit(coordinates) {
    return hits.push(coordinates);
  };
  var decideWormName = function decideWormName(length) {
    var wormName;
    switch (length) {
      case 2:
        wormName = "grub";
        break;
      case 3:
        wormName = "pupae";
        break;
      case 4:
        wormName = "flatworm";
        break;
      case 5:
        wormName = "earthworm";
        break;
      default:
        wormName = "worm";
    }
    return wormName;
  };
  var wormName = decideWormName(length);
  return {
    decideWormName: decideWormName,
    hit: hit,
    isEaten: isEaten,
    coords: coords,
    player: player,
    length: length,
    hits: hits,
    wormName: wormName,
    dead: dead
  };
};
module.exports = {
  Worm: Worm
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  height: 100vh;\n}\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 15px;\n}\n\n.board-frame {\n  height: 520px;\n  width: 520px;\n  background-color: lightgreen;\n}\n\n.title {\n  font-family: \"Butterfly Kids\", \"cursive\";\n  font-size: 10vh;\n  text-align: center;\n}\n\ntable {\n  border-spacing: 0px;\n}\n\n.row {\n  width: 100px;\n  margin: 0;\n  padding: 0;\n}\n\n.board-square {\n  height: 50px;\n  width: 50px;\n  border: 1px solid grey;\n  padding: 0;\n  margin: 0;\n  background-color: lightgreen;\n}\n\n.images {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 20vh;\n}\n\n.bug-images {\n  width: 15vw;\n}\n\n.over {\n  background-color: \"red\";\n}\n\n.button-holder {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.start-button {\n  padding: 10px;\n  margin: 10px;\n  background-color: pink;\n  border: grey;\n  font-size: 30px;\n}\n\n.reset-button {\n    padding: 10px;\n  margin: 10px;\n  background-color: pink;\n  border: grey;\n  font-size: 30px;\n}\n\nbutton:hover {\n    background-color: palevioletred;\n    border:darkgray;\n}\n\np {\n  text-align: center;\n  font-family: Georgia, \"Times New Roman\", Times, serif;\n  font-size: 16px;\n  padding: 10px;\n}\n", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,aAAa;AACf;AACA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,4BAA4B;AAC9B;;AAEA;EACE,wCAAwC;EACxC,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,sBAAsB;EACtB,UAAU;EACV,SAAS;EACT,4BAA4B;AAC9B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,sBAAsB;EACtB,YAAY;EACZ,eAAe;AACjB;;AAEA;IACI,aAAa;EACf,YAAY;EACZ,sBAAsB;EACtB,YAAY;EACZ,eAAe;AACjB;;AAEA;IACI,+BAA+B;IAC/B,eAAe;AACnB;;AAEA;EACE,kBAAkB;EAClB,qDAAqD;EACrD,eAAe;EACf,aAAa;AACf","sourcesContent":["* {\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  height: 100vh;\n}\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 15px;\n}\n\n.board-frame {\n  height: 520px;\n  width: 520px;\n  background-color: lightgreen;\n}\n\n.title {\n  font-family: \"Butterfly Kids\", \"cursive\";\n  font-size: 10vh;\n  text-align: center;\n}\n\ntable {\n  border-spacing: 0px;\n}\n\n.row {\n  width: 100px;\n  margin: 0;\n  padding: 0;\n}\n\n.board-square {\n  height: 50px;\n  width: 50px;\n  border: 1px solid grey;\n  padding: 0;\n  margin: 0;\n  background-color: lightgreen;\n}\n\n.images {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 20vh;\n}\n\n.bug-images {\n  width: 15vw;\n}\n\n.over {\n  background-color: \"red\";\n}\n\n.button-holder {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.start-button {\n  padding: 10px;\n  margin: 10px;\n  background-color: pink;\n  border: grey;\n  font-size: 30px;\n}\n\n.reset-button {\n    padding: 10px;\n  margin: 10px;\n  background-color: pink;\n  border: grey;\n  font-size: 30px;\n}\n\nbutton:hover {\n    background-color: palevioletred;\n    border:darkgray;\n}\n\np {\n  text-align: center;\n  font-family: Georgia, \"Times New Roman\", Times, serif;\n  font-size: 16px;\n  padding: 10px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/earthworm.png":
/*!**********************************!*\
  !*** ./src/assets/earthworm.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "earthworm.png";

/***/ }),

/***/ "./src/assets/flatworm.png":
/*!*********************************!*\
  !*** ./src/assets/flatworm.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "flatworm.png";

/***/ }),

/***/ "./src/assets/grub.png":
/*!*****************************!*\
  !*** ./src/assets/grub.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "grub.png";

/***/ }),

/***/ "./src/assets/pupae.png":
/*!******************************!*\
  !*** ./src/assets/pupae.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "pupae.png";

/***/ }),

/***/ "./src/assets/shovel.png":
/*!*******************************!*\
  !*** ./src/assets/shovel.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "shovel.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFnQixHQUFHLEVBQUU7RUFDM0IsSUFBTUMsY0FBYyxHQUFHLEVBQUU7RUFDekIsSUFBTUMsY0FBYyxHQUFHLEVBQUU7RUFFekIsSUFBSUMsT0FBTyxHQUFHLENBQ1osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxDQUNMO0VBRUQsSUFBSUMsT0FBTyxHQUFHLE9BQU87RUFDckIsSUFBSUMsT0FBTyxHQUFHLE9BQU87RUFFckIsU0FBU0MsWUFBWSxDQUFDQyxLQUFLLEVBQUU7SUFDM0IsSUFBSUQsWUFBWSxHQUFHRSxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDbEQsT0FBT0gsS0FBSyxDQUFDRCxZQUFZLENBQUM7RUFDNUI7RUFFQSxJQUFNSyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCLENBQUl4QixNQUFNLEVBQUs7SUFDbkMsSUFBSWEsZ0JBQWdCLENBQUNZLFFBQVEsQ0FBQ3pCLE1BQU0sQ0FBQyxJQUFJZSxjQUFjLENBQUNVLFFBQVEsQ0FBQ3pCLE1BQU0sQ0FBQyxFQUFFO01BQ3hFLE9BQU8sSUFBSTtJQUNiLENBQUMsTUFBTTtNQUNMLE9BQU8sS0FBSztJQUNkO0VBQ0YsQ0FBQztFQUVELElBQU0wQixVQUFVLEdBQUcsU0FBYkEsVUFBVSxDQUFJMUIsTUFBTSxFQUFFMkIsVUFBVSxFQUFFekIsVUFBVSxFQUFLO0lBQ3JELElBQUlBLFVBQVUsS0FBSyxPQUFPLEVBQUU7TUFDMUIsSUFBSTBCLE1BQU0sR0FBRzVCLE1BQU0sQ0FBQzZCLE1BQU0sQ0FBQyxDQUFDLENBQUM7TUFDN0IsSUFBSUMsVUFBVSxHQUFHLEVBQUUsR0FBR0gsVUFBVTtNQUNoQyxJQUFJQyxNQUFNLEdBQUdFLFVBQVUsRUFBRTtRQUN2QixPQUFPLElBQUk7TUFDYixDQUFDLE1BQU07UUFDTCxJQUFJQyxjQUFjLEdBQUdDLG1CQUFtQixDQUFDaEMsTUFBTSxFQUFFMkIsVUFBVSxDQUFDO1FBQzVELElBQUlNLFNBQVMsR0FBR0Msa0JBQWtCLENBQUNILGNBQWMsRUFBRTdCLFVBQVUsQ0FBQztRQUM5RCxJQUFJLENBQUMrQixTQUFTLEVBQUU7VUFDZGxGLHVDQUFFLEVBQUUsQ0FBQ21DLFlBQVksQ0FBQzZDLGNBQWMsQ0FBQztVQUNqQ0ksU0FBUyxDQUFDOUIsNENBQUksQ0FBQ3NCLFVBQVUsRUFBRUksY0FBYyxFQUFFN0IsVUFBVSxDQUFDLEVBQUVBLFVBQVUsQ0FBQztRQUNyRSxDQUFDLE1BQU0sT0FBTyxJQUFJO01BQ3BCO0lBQ0Y7SUFDQSxJQUFJQSxVQUFVLEtBQUssT0FBTyxFQUFFO01BQzFCLElBQUkwQixPQUFNLEdBQUdRLE1BQU0sQ0FBQ3BDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUM5QixJQUFJOEIsV0FBVSxHQUFHLEVBQUUsR0FBR0gsVUFBVTtNQUNoQyxJQUFJQyxPQUFNLEdBQUdFLFdBQVUsRUFBRTtRQUN2QkosVUFBVSxDQUFDUCxZQUFZLENBQUNILE9BQU8sQ0FBQyxFQUFFVyxVQUFVLEVBQUV6QixVQUFVLENBQUM7TUFDM0QsQ0FBQyxNQUFNO1FBQ0wsSUFBSTZCLGVBQWMsR0FBR0MsbUJBQW1CLENBQUNoQyxNQUFNLEVBQUUyQixVQUFVLENBQUM7UUFDNUQsSUFBSU0sVUFBUyxHQUFHQyxrQkFBa0IsQ0FBQ0gsZUFBYyxFQUFFN0IsVUFBVSxDQUFDO1FBQzlELElBQUksQ0FBQytCLFVBQVMsRUFBRTtVQUNkRSxTQUFTLENBQUM5Qiw0Q0FBSSxDQUFDc0IsVUFBVSxFQUFFSSxlQUFjLEVBQUU3QixVQUFVLENBQUMsRUFBRUEsVUFBVSxDQUFDO1FBQ3JFLENBQUMsTUFBTXdCLFVBQVUsQ0FBQ1AsWUFBWSxDQUFDSCxPQUFPLENBQUMsRUFBRVcsVUFBVSxFQUFFekIsVUFBVSxDQUFDO01BQ2xFO0lBQ0Y7RUFDRixDQUFDO0VBRUQsSUFBTThCLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBbUIsQ0FBSWhDLE1BQU0sRUFBRTdFLE1BQU0sRUFBSztJQUM5QyxJQUFJa0gsUUFBUSxHQUFHLEVBQUU7SUFDakIsSUFBSVQsTUFBTSxHQUFHUSxNQUFNLENBQUNwQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsS0FBSyxJQUFJM0UsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRixNQUFNLEVBQUVFLENBQUMsRUFBRSxFQUFFO01BQy9CLElBQUlpSCxNQUFNLEdBQUdGLE1BQU0sQ0FBQ3BDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUM5QixJQUFJdUMsRUFBRSxHQUFHRCxNQUFNLEdBQUdWLE1BQU0sRUFBRTtNQUMxQlMsUUFBUSxDQUFDckcsSUFBSSxDQUFDdUcsRUFBRSxDQUFDO0lBQ25CO0lBQ0EsT0FBT0YsUUFBUTtFQUNqQixDQUFDO0VBRUQsSUFBTUgsa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFrQixDQUFJTSxjQUFjLEVBQUVsRixNQUFNLEVBQUs7SUFDckQsSUFBSUEsTUFBTSxLQUFLLE9BQU8sRUFBRTtNQUN0QixJQUFNbUYsU0FBUyxHQUFHaEMsZ0JBQWdCLENBQUNpQyxJQUFJLEVBQUU7TUFDekMsT0FBT0QsU0FBUyxDQUFDRSxJQUFJLENBQUMsVUFBQzVILElBQUk7UUFBQSxPQUFLeUgsY0FBYyxDQUFDZixRQUFRLENBQUMxRyxJQUFJLENBQUM7TUFBQSxFQUFDO0lBQ2hFO0lBQ0EsSUFBSXVDLE1BQU0sS0FBSyxPQUFPLEVBQUU7TUFDdEIsSUFBTW1GLFVBQVMsR0FBRy9CLGVBQWUsQ0FBQ2dDLElBQUksRUFBRTtNQUN4QyxPQUFPRCxVQUFTLENBQUNFLElBQUksQ0FBQyxVQUFDNUgsSUFBSTtRQUFBLE9BQUt5SCxjQUFjLENBQUNmLFFBQVEsQ0FBQzFHLElBQUksQ0FBQztNQUFBLEVBQUM7SUFDaEU7RUFDRixDQUFDO0VBRUQsSUFBTW9ILFNBQVMsR0FBRyxTQUFaQSxTQUFTLENBQUlTLFVBQVUsRUFBRXRGLE1BQU0sRUFBSztJQUN4QyxJQUFJQSxNQUFNLEtBQUssT0FBTyxFQUFFO01BQ3RCbUQsZ0JBQWdCLENBQUN6RSxJQUFJLENBQUM0RyxVQUFVLENBQUM1QyxNQUFNLENBQUM7TUFDeENULFlBQVksQ0FBQ3ZELElBQUksQ0FBQzRHLFVBQVUsQ0FBQztNQUM3QjdGLHVDQUFFLEVBQUUsQ0FBQ3VDLGlCQUFpQixDQUFDQyxZQUFZLENBQUM7SUFDdEM7SUFDQSxJQUFJakMsTUFBTSxLQUFLLE9BQU8sRUFBRTtNQUN0QnFELGdCQUFnQixDQUFDM0UsSUFBSSxDQUFDNEcsVUFBVSxDQUFDO01BQ2pDbEMsZUFBZSxDQUFDMUUsSUFBSSxDQUFDNEcsVUFBVSxDQUFDNUMsTUFBTSxDQUFDO0lBQ3pDO0VBQ0YsQ0FBQztFQUVELElBQU1ILGFBQWEsR0FBRyxTQUFoQkEsYUFBYSxHQUFTO0lBQzFCNkIsVUFBVSxDQUFDcEUsdURBQW1CLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDO0lBQzdDb0UsVUFBVSxDQUFDcEUsdURBQW1CLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDO0lBQzdDb0UsVUFBVSxDQUFDcEUsdURBQW1CLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDO0lBQzdDb0UsVUFBVSxDQUFDcEUsdURBQW1CLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDO0VBQy9DLENBQUM7RUFFRCxJQUFNd0Ysa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFrQixDQUFJQyxXQUFXLEVBQUs7SUFDMUMsSUFBSXZCLGdCQUFnQixDQUFDdUIsV0FBVyxDQUFDLEVBQUU7TUFDakNBLFdBQVcsR0FBRzVCLFlBQVksQ0FBQ0gsT0FBTyxDQUFDO01BQ25DOEIsa0JBQWtCLENBQUNDLFdBQVcsRUFBRTdCLE9BQU8sQ0FBQztJQUMxQyxDQUFDLE1BQU07TUFDTCxJQUFJVCxnQkFBZ0IsQ0FBQ2lDLElBQUksRUFBRSxDQUFDakIsUUFBUSxDQUFDc0IsV0FBVyxDQUFDLEVBQUU7UUFDakRDLFFBQVEsQ0FBQ0QsV0FBVyxDQUFDO01BQ3ZCLENBQUMsTUFBTTtRQUNMRSxVQUFVLENBQUNGLFdBQVcsRUFBRTdCLE9BQU8sQ0FBQztRQUNoQ2dDLGNBQWMsQ0FBQ2hDLE9BQU8sQ0FBQztRQUN2Qlosa0RBQWMsQ0FBQ1ksT0FBTyxFQUFFNkIsV0FBVyxFQUFFLE1BQU0sQ0FBQztNQUM5QztJQUNGO0VBQ0YsQ0FBQztFQUVELElBQU1DLFFBQVEsR0FBRyxTQUFYQSxRQUFRLENBQUlELFdBQVcsRUFBSztJQUNoQ2hDLGNBQWMsQ0FBQy9FLElBQUksQ0FBQytHLFdBQVcsQ0FBQztJQUNoQ0csY0FBYyxDQUFDaEMsT0FBTyxDQUFDO0lBQ3ZCWixrREFBYyxDQUFDWSxPQUFPLEVBQUU2QixXQUFXLEVBQUUsS0FBSyxDQUFDO0VBQzdDLENBQUM7RUFFRCxJQUFNSSxhQUFhLEdBQUcsU0FBaEJBLGFBQWEsQ0FBSUosV0FBVyxFQUFFekYsTUFBTSxFQUFLO0lBQzdDLElBQUlBLE1BQU0sS0FBSzRELE9BQU8sRUFBRTtNQUN0QjRCLGtCQUFrQixDQUFDQyxXQUFXLENBQUM7SUFDakM7SUFDQSxJQUFJekYsTUFBTSxLQUFLMkQsT0FBTyxFQUFFO01BQ3RCLEtBQUssSUFBSW1DLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3pDLGdCQUFnQixDQUFDeEYsTUFBTSxFQUFFaUksQ0FBQyxFQUFFLEVBQUU7UUFDaEQsSUFBSXpDLGdCQUFnQixDQUFDeUMsQ0FBQyxDQUFDLENBQUNwRCxNQUFNLENBQUN5QixRQUFRLENBQUNzQixXQUFXLENBQUMsRUFBRTtVQUNwRHBDLGdCQUFnQixDQUFDeUMsQ0FBQyxDQUFDLENBQUNuRCxHQUFHLENBQUM4QyxXQUFXLENBQUM7VUFDcENqQyxjQUFjLENBQUM5RSxJQUFJLENBQUMrRyxXQUFXLENBQUM7VUFDaENHLGNBQWMsQ0FBQ2pDLE9BQU8sQ0FBQztVQUN2Qlgsa0RBQWMsQ0FBQ1csT0FBTyxFQUFFOEIsV0FBVyxFQUFFLEtBQUssQ0FBQztVQUMzQyxPQUFPRCxrQkFBa0IsQ0FBQzNCLFlBQVksQ0FBQ0gsT0FBTyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxNQUFNO1VBQ0w7UUFDRjtNQUNGO01BQ0FpQyxVQUFVLENBQUNGLFdBQVcsRUFBRTlCLE9BQU8sQ0FBQztNQUNoQ1gsa0RBQWMsQ0FBQ1csT0FBTyxFQUFFOEIsV0FBVyxFQUFFLE1BQU0sQ0FBQztNQUM1Q0csY0FBYyxDQUFDakMsT0FBTyxDQUFDO01BQ3ZCNkIsa0JBQWtCLENBQUMzQixZQUFZLENBQUNILE9BQU8sQ0FBQyxDQUFDO0lBQzNDO0VBQ0YsQ0FBQztFQUVELElBQU1pQyxVQUFVLEdBQUcsU0FBYkEsVUFBVSxDQUFJRixXQUFXLEVBQUVNLGFBQWEsRUFBSztJQUNqRCxJQUFJQSxhQUFhLEtBQUtwQyxPQUFPLEVBQUU7TUFDN0JMLGdCQUFnQixDQUFDYSxRQUFRLENBQUNzQixXQUFXLENBQUMsR0FDbEMsSUFBSSxHQUNKbkMsZ0JBQWdCLENBQUM1RSxJQUFJLENBQUMrRyxXQUFXLENBQUM7TUFDdEN6QyxrREFBYyxDQUFDVyxPQUFPLEVBQUU4QixXQUFXLEVBQUUsTUFBTSxDQUFDO0lBQzlDO0lBQ0EsSUFBSU0sYUFBYSxLQUFLbkMsT0FBTyxFQUFFO01BQzdCTCxnQkFBZ0IsQ0FBQ1ksUUFBUSxDQUFDc0IsV0FBVyxDQUFDLEdBQ2xDSSxhQUFhLENBQUNoQyxZQUFZLENBQUNILE9BQU8sQ0FBQyxFQUFFRSxPQUFPLENBQUMsR0FDN0NMLGdCQUFnQixDQUFDN0UsSUFBSSxDQUFDK0csV0FBVyxDQUFDO01BQ3RDekMsa0RBQWMsQ0FBQ1ksT0FBTyxFQUFFNkIsV0FBVyxFQUFFLE1BQU0sQ0FBQztJQUM5QztFQUNGLENBQUM7RUFFRCxJQUFNRyxjQUFjLEdBQUcsU0FBakJBLGNBQWMsQ0FBSTVGLE1BQU0sRUFBSztJQUNqQyxTQUFTZ0csY0FBYyxHQUFHO01BQ3hCLElBQU10RyxjQUFjLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLGlCQUFpQixDQUFDO01BQ2pFRixjQUFjLENBQUNrQixLQUFLLENBQUNxRixPQUFPLEdBQUcsTUFBTTtNQUNyQ3ZHLGNBQWMsQ0FBQ2tCLEtBQUssQ0FBQ3NGLGFBQWEsR0FBRyxRQUFRO01BQzdDLElBQUlDLFdBQVcsR0FBR3hHLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLFFBQVEsQ0FBQztNQUNsRGlHLFdBQVcsQ0FBQ2hHLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGNBQWMsQ0FBQztNQUN6QytGLFdBQVcsQ0FBQzVFLFdBQVcsR0FBRyxhQUFhO01BQ3ZDN0IsY0FBYyxDQUFDYSxXQUFXLENBQUM0RixXQUFXLENBQUM7TUFDdkNBLFdBQVcsQ0FBQ2xGLGdCQUFnQixDQUFDLE9BQU8sRUFBRW1GLE1BQU0sRUFBRSxLQUFLLENBQUM7SUFDdEQ7SUFFQSxTQUFTQSxNQUFNLEdBQUc7TUFBQ0EsTUFBTSxHQUFHQyxRQUFRLENBQUNELE1BQU0sRUFBRTtJQUFBO0lBRTdDLElBQUlwRyxNQUFNLEtBQUsyRCxPQUFPLEVBQUU7TUFDdEIsSUFBSUYsY0FBYyxDQUFDNUYsTUFBTSxLQUFLc0YsZ0JBQWdCLENBQUNpQyxJQUFJLEVBQUUsQ0FBQ3ZILE1BQU0sRUFBRTtRQUM1RDZCLGNBQWMsQ0FBQzZCLFdBQVcsR0FBRyx5QkFBeUI7UUFDdEQ3QixjQUFjLENBQUNrQixLQUFLLENBQUMwRixRQUFRLEdBQUcsTUFBTTtRQUN0QzVHLGNBQWMsQ0FBQ2tCLEtBQUssQ0FBQzJGLFVBQVUsR0FBRyxnQkFBZ0I7UUFDbERQLGNBQWMsRUFBRTtNQUNsQjtJQUNGO0lBQ0EsSUFBSWhHLE1BQU0sS0FBSzRELE9BQU8sRUFBRTtNQUN0QixJQUFJSixjQUFjLENBQUMzRixNQUFNLEtBQUt1RixlQUFlLENBQUNnQyxJQUFJLEVBQUUsQ0FBQ3ZILE1BQU0sRUFBRTtRQUMzRCxJQUFNNkIsZUFBYyxHQUFHQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQztRQUNqRUYsZUFBYyxDQUFDNkIsV0FBVyxHQUFHLHNCQUFzQjtRQUNuRDdCLGVBQWMsQ0FBQ2tCLEtBQUssQ0FBQzBGLFFBQVEsR0FBRyxNQUFNO1FBQ3RDNUcsZUFBYyxDQUFDa0IsS0FBSyxDQUFDMkYsVUFBVSxHQUFHLGdCQUFnQjtRQUNsRFAsY0FBYyxFQUFFO01BQ2xCO0lBQ0Y7RUFDRixDQUFDO0VBR0QsT0FBTztJQUNMNUIsVUFBVSxFQUFWQSxVQUFVO0lBQ1ZTLFNBQVMsRUFBVEEsU0FBUztJQUNUZ0IsYUFBYSxFQUFiQSxhQUFhO0lBQ2JGLFVBQVUsRUFBVkEsVUFBVTtJQUNWQyxjQUFjLEVBQWRBLGNBQWM7SUFDZHJELGFBQWEsRUFBYkEsYUFBYTtJQUNiTixZQUFZLEVBQVpBLFlBQVk7SUFDWnFCLGdCQUFnQixFQUFoQkEsZ0JBQWdCO0lBQ2hCQyxnQkFBZ0IsRUFBaEJBLGdCQUFnQjtJQUNoQkosZ0JBQWdCLEVBQWhCQSxnQkFBZ0I7SUFDaEJLLGNBQWMsRUFBZEEsY0FBYztJQUNkQyxjQUFjLEVBQWRBLGNBQWM7SUFDZEUsT0FBTyxFQUFQQSxPQUFPO0lBQ1BDLE9BQU8sRUFBUEE7RUFDRixDQUFDO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6VHFDO0FBQ0U7QUFDRTtBQUNJO0FBQ0U7QUFDZDtBQUNEO0FBRXpCLFNBQVNpRCxRQUFRLEdBQUc7RUFDekIsSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVMsR0FBUztJQUN0QixJQUFNQyxNQUFNLEdBQUdwSCxRQUFRLENBQUNXLGFBQWEsQ0FBQyxTQUFTLENBQUM7SUFDaEQsSUFBSTBHLE9BQU8sR0FBR3JILFFBQVEsQ0FBQ08sYUFBYSxDQUFDLEtBQUssQ0FBQztJQUMzQzhHLE9BQU8sQ0FBQzdHLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztJQUNuQzRHLE9BQU8sQ0FBQ2pHLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO0lBQ2xDaUcsT0FBTyxDQUFDN0csU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQ2xDNEcsT0FBTyxDQUFDakcsWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUM7SUFDdkNpRyxPQUFPLENBQUNqRyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNqQ2lHLE9BQU8sQ0FBQ0MsR0FBRyxHQUFHVCw2Q0FBSTtJQUNsQlEsT0FBTyxDQUFDRSxHQUFHLEdBQUcsZUFBZTtJQUM3QkgsTUFBTSxDQUFDeEcsV0FBVyxDQUFDeUcsT0FBTyxDQUFDO0lBQzNCO0lBQ0EsSUFBSUcsUUFBUSxHQUFHeEgsUUFBUSxDQUFDTyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQzVDaUgsUUFBUSxDQUFDaEgsU0FBUyxDQUFDQyxHQUFHLENBQUMsWUFBWSxDQUFDO0lBQ3BDK0csUUFBUSxDQUFDaEgsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQ25DK0csUUFBUSxDQUFDcEcsWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUM7SUFDeENvRyxRQUFRLENBQUNwRyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNsQ29HLFFBQVEsQ0FBQ3BHLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO0lBQ3BDb0csUUFBUSxDQUFDRixHQUFHLEdBQUdSLDhDQUFLO0lBQ3BCVSxRQUFRLENBQUNELEdBQUcsR0FBRyxnQkFBZ0I7SUFDL0JILE1BQU0sQ0FBQ3hHLFdBQVcsQ0FBQzRHLFFBQVEsQ0FBQztJQUM1QjtJQUNBLElBQUlDLFdBQVcsR0FBR3pILFFBQVEsQ0FBQ08sYUFBYSxDQUFDLEtBQUssQ0FBQztJQUMvQ2tILFdBQVcsQ0FBQ2pILFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztJQUN2Q2dILFdBQVcsQ0FBQ2pILFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUN0Q2dILFdBQVcsQ0FBQ3JHLFlBQVksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDO0lBQzNDcUcsV0FBVyxDQUFDckcsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDckNxRyxXQUFXLENBQUNyRyxZQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQztJQUMxQ3FHLFdBQVcsQ0FBQ0gsR0FBRyxHQUFHTixpREFBUTtJQUMxQlMsV0FBVyxDQUFDRixHQUFHLEdBQUcsbUJBQW1CO0lBQ3JDSCxNQUFNLENBQUN4RyxXQUFXLENBQUM2RyxXQUFXLENBQUM7SUFDL0I7SUFDQSxJQUFJQyxZQUFZLEdBQUcxSCxRQUFRLENBQUNPLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDaERtSCxZQUFZLENBQUNsSCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxZQUFZLENBQUM7SUFDeENpSCxZQUFZLENBQUNsSCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDdkNpSCxZQUFZLENBQUN0RyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN0Q3NHLFlBQVksQ0FBQ3RHLFlBQVksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDO0lBQzVDc0csWUFBWSxDQUFDdEcsWUFBWSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUM7SUFDNUNzRyxZQUFZLENBQUNKLEdBQUcsR0FBR0wsa0RBQVM7SUFDNUJTLFlBQVksQ0FBQ0gsR0FBRyxHQUFHLG1CQUFtQjtJQUN0Q0gsTUFBTSxDQUFDeEcsV0FBVyxDQUFDOEcsWUFBWSxDQUFDO0VBQ2xDLENBQUM7RUFFRCxJQUFNQyxZQUFZLEdBQUcsU0FBZkEsWUFBWSxHQUFTO0lBQ3pCM0gsUUFBUSxDQUFDNEgsSUFBSSxDQUFDdEcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFdUcsZUFBZSxDQUFDO0lBQzVEN0gsUUFBUSxDQUFDNEgsSUFBSSxDQUFDdEcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFd0csVUFBVSxDQUFDO0lBQ2xEOUgsUUFBUSxDQUFDNEgsSUFBSSxDQUFDdEcsZ0JBQWdCLENBQUMsVUFBVSxFQUFFeUcsVUFBVSxDQUFDO0lBQ3REL0gsUUFBUSxDQUFDNEgsSUFBSSxDQUFDdEcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFMEcsV0FBVyxDQUFDO0lBQ3hEaEksUUFBUSxDQUFDNEgsSUFBSSxDQUFDdEcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFMkcsV0FBVyxDQUFDO0VBQzFELENBQUM7RUFFRCxJQUFNSixlQUFlLEdBQUcsU0FBbEJBLGVBQWUsQ0FBSXRHLEtBQUssRUFBSztJQUNqQyxJQUFJMkcsR0FBRyxHQUFHM0csS0FBSyxDQUFDQyxNQUFNO0lBQ3RCLElBQUksQ0FBQzBHLEdBQUcsQ0FBQ0MsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO0lBQ2hDLElBQUlELEdBQUcsQ0FBQzFILFNBQVMsQ0FBQzRILFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtNQUN2Q0YsR0FBRyxHQUFHQSxHQUFHLENBQUNHLFlBQVksQ0FBQyxRQUFRLENBQUM7SUFDbEM7SUFDQSxJQUFNQyxHQUFHLEdBQUcsSUFBSUMsS0FBSyxFQUFFO0lBQ3ZCRCxHQUFHLENBQUNoQixHQUFHLEdBQUdQLCtDQUFNO0lBQ2hCeEYsS0FBSyxDQUFDaUgsWUFBWSxDQUFDQyxZQUFZLENBQUNILEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzVDL0csS0FBSyxDQUFDaUgsWUFBWSxDQUFDRSxPQUFPLENBQUMsWUFBWSxFQUFFUixHQUFHLENBQUM7RUFDL0MsQ0FBQztFQUVELElBQU1KLFVBQVUsR0FBRyxTQUFiQSxVQUFVLENBQUl2RyxLQUFLLEVBQUs7SUFDNUIsSUFBSW9ILFFBQVEsR0FBR3BILEtBQUssQ0FBQ0MsTUFBTTtJQUMzQixJQUFJM0MsRUFBRSxHQUFHOEosUUFBUSxDQUFDOUosRUFBRTtJQUNwQixJQUFJLENBQUM4SixRQUFRLENBQUNuSSxTQUFTLENBQUM0SCxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7SUFDOUM3RyxLQUFLLENBQUNxSCxjQUFjLEVBQUU7SUFDdEIsSUFBSWxFLFVBQVUsR0FBR25ELEtBQUssQ0FBQ2lILFlBQVksQ0FBQ0ssT0FBTyxDQUFDLFlBQVksQ0FBQztJQUN6RGhKLG9EQUFnQixDQUFDaEIsRUFBRSxFQUFFNkYsVUFBVSxFQUFFLE9BQU8sQ0FBQztFQUMzQyxDQUFDO0VBRUQsSUFBTXFELFVBQVUsR0FBRyxTQUFiQSxVQUFVLENBQUl4RyxLQUFLLEVBQUs7SUFDNUIsSUFBSW9ILFFBQVEsR0FBR3BILEtBQUssQ0FBQ0MsTUFBTTtJQUMzQixJQUFJLENBQUNtSCxRQUFRLENBQUNuSSxTQUFTLENBQUM0SCxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7SUFDOUM3RyxLQUFLLENBQUNxSCxjQUFjLEVBQUU7RUFDeEIsQ0FBQztFQUVELElBQU1aLFdBQVcsR0FBRyxTQUFkQSxXQUFXLENBQUl6RyxLQUFLLEVBQUs7SUFDN0IsSUFBSW9ILFFBQVEsR0FBR3BILEtBQUssQ0FBQ0MsTUFBTTtJQUMzQixJQUFJLENBQUNtSCxRQUFRLENBQUNuSSxTQUFTLENBQUM0SCxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7SUFDOUM3RyxLQUFLLENBQUNxSCxjQUFjLEVBQUU7SUFDdEJELFFBQVEsQ0FBQzFILEtBQUssQ0FBQ1EsZUFBZSxHQUFHLEtBQUs7RUFDeEMsQ0FBQztFQUVELElBQU13RyxXQUFXLEdBQUcsU0FBZEEsV0FBVyxDQUFJMUcsS0FBSyxFQUFLO0lBQzdCLElBQUlvSCxRQUFRLEdBQUdwSCxLQUFLLENBQUNDLE1BQU07SUFDM0IsSUFBSSxDQUFDbUgsUUFBUSxDQUFDbkksU0FBUyxDQUFDNEgsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0lBQzlDN0csS0FBSyxDQUFDcUgsY0FBYyxFQUFFO0lBQ3RCRCxRQUFRLENBQUMxSCxLQUFLLENBQUNRLGVBQWUsR0FBRyxZQUFZO0VBQy9DLENBQUM7RUFFRCxPQUFPO0lBQUUwRixTQUFTLEVBQVRBLFNBQVM7SUFBRVEsWUFBWSxFQUFaQSxZQUFZO0lBQUVFLGVBQWUsRUFBZkEsZUFBZTtJQUFFQyxVQUFVLEVBQVZBO0VBQVcsQ0FBQztBQUNqRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RzZCO0FBQ1M7QUFDRztBQUNSO0FBQ0M7QUFDSDtBQUV4QixJQUFNekUsRUFBRSxHQUFHdkQsMENBQUUsRUFBRTtBQUNmLElBQU1rSixRQUFRLEdBQUc5QixzREFBUSxFQUFFO0FBQzNCLElBQUk3RyxNQUFNLEdBQUcwSSwrQ0FBTSxFQUFFO0FBQ3JCLElBQUlsSixLQUFLLEdBQUcwRCw4Q0FBSyxFQUFFO0FBQ25CLElBQUlELElBQUksR0FBR0YsNENBQUksRUFBRTtBQUN4QkMsRUFBRSxDQUFDbEQsYUFBYSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUM7QUFDMUNrRCxFQUFFLENBQUNsRCxhQUFhLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQztBQUN6Q2tELEVBQUUsQ0FBQ2hDLGNBQWMsRUFBRTtBQUNuQjJILFFBQVEsQ0FBQzdCLFNBQVMsRUFBRTtBQUNwQjZCLFFBQVEsQ0FBQ3JCLFlBQVksRUFBRTtBQUV2QixTQUFTc0IsY0FBYyxHQUFHO0VBQ3hCakosUUFBUSxDQUFDOEIsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUNFLE9BQU8sQ0FBQyxVQUFDbUIsTUFBTTtJQUFBLE9BQ2pEQSxNQUFNLENBQUM3QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQ0MsS0FBSyxFQUFLO01BQzFDLElBQUlDLE1BQU0sR0FBR0QsS0FBSyxDQUFDQyxNQUFNO01BQ3pCM0IsS0FBSyxDQUFDcUcsYUFBYSxDQUFDMUUsTUFBTSxDQUFDM0MsRUFBRSxFQUFFLE9BQU8sQ0FBQztNQUN2Q3FLLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDM0gsTUFBTSxDQUFDM0MsRUFBRSxDQUFDO0lBQ3hCLENBQUMsQ0FBQztFQUFBLEVBQ0g7QUFDSDtBQUNBb0ssY0FBYyxFQUFFO0FBRWhCNUYsRUFBRSxDQUFDM0IsU0FBUyxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzdCYztBQUUxQixTQUFTcUgsTUFBTSxHQUFHO0VBQ3ZCLElBQUlLLGVBQWUsR0FBRyxFQUFFO0VBRXhCLElBQU1DLFdBQVcsR0FBRyxTQUFkQSxXQUFXLEdBQVM7SUFDeEIsSUFBSUMsWUFBWSxHQUFHMUQsWUFBWSxFQUFFO0lBQ2pDckMsd0RBQW1CLENBQUMrRixZQUFZLENBQUM7RUFDbkMsQ0FBQztFQUVELElBQU0xRCxZQUFZLEdBQUcsU0FBZkEsWUFBWSxHQUFTO0lBQ3pCLElBQUk3QixPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFD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O0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDZkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDZkE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcmMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3NyYy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3NyYy8uL3NyYy9VSS5qcyIsIndlYnBhY2s6Ly9zcmMvLi9zcmMvYm9hcmRzLmpzIiwid2VicGFjazovL3NyYy8uL3NyYy9kcmFnZHJvcC5qcyIsIndlYnBhY2s6Ly9zcmMvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3JjLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9zcmMvLi9zcmMvd29ybXMuanMiLCJ3ZWJwYWNrOi8vc3JjLy4vc3JjL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vc3JjLy4vc3JjL3N0eWxlcy5jc3M/NDRiMiIsIndlYnBhY2s6Ly9zcmMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vc3JjLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9zcmMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3JjLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3NyYy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3NyYy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3NyYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zcmMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vc3JjL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zcmMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9zcmMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zcmMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zcmMvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vc3JjL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9zcmMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zcmMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3NyYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsImltcG9ydCB7IGJvYXJkIH0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIFVJKCkge1xuICBjb25zdCBpbnN0cnVjdGlvbkJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5zdHJ1Y3Rpb24tYm94XCIpO1xuICBsZXQgd29ybXNQbGFjZWQgPSBmYWxzZTtcblxuICBjb25zdCBnZW5lcmF0ZVRhYmxlID0gKHRhYmxlSUQsIHBsYXllcikgPT4ge1xuICAgIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICAgIHRhYmxlLmNsYXNzTGlzdC5hZGQoYCR7cGxheWVyfS10YWJsZWApO1xuICAgIGNvbnN0IGJvYXJkRnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhYmxlSUQpO1xuICAgIGJvYXJkRnJhbWUuYXBwZW5kQ2hpbGQodGFibGUpO1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMTA7IHkrKykge1xuICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICAgICAgcm93LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiZHJvcHpvbmVcIik7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImJvYXJkLXNxdWFyZVwiKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKHBsYXllcik7XG4gICAgICAgIHBsYXllciA9PT0gXCJodW1hblwiID8gKGNlbGwuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiKSA6IG51bGw7XG4gICAgICAgIHBsYXllciA9PT0gXCJyb2JvdFwiID8gKGNlbGwuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCIpIDogbnVsbDtcbiAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHt5fSR7eH1gKTtcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgfVxuICAgICAgdGFibGUuYXBwZW5kQ2hpbGQocm93KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVnaXN0ZXJIb3ZlcnMgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnJvYm90LXRhYmxlXCIpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicGlua1wiO1xuICAgICAgfSk7XG5cbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIucm9ib3QtdGFibGVcIilcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0Z3JlZW5cIjtcbiAgICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGdhbWVTdGFydCA9IChib29sKSA9PiB7XG4gICAgaWYgKCFib29sKSB7XG4gICAgICBpbnN0cnVjdGlvbkJveC50ZXh0Q29udGVudCA9XG4gICAgICAgIFwiUGxlYXNlIGRyYWcgYW5kIGRyb3AgdXAgdG8gNCB3b3JtcyBvbiByaWdodC1oYW5kIGJvYXJkLiBXb3JtIGxlbmd0aHMgcnVuIGZyb20gMiB1bml0cyB0byA1IHVuaXRzLCBsZWZ0IHRvIHJpZ2h0XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluc3RydWN0aW9uQm94LnRleHRDb250ZW50ID1cbiAgICAgICAgXCJUbyBzdGFydCBnYW1lLCBjbGljayBhbnkgc3F1YXJlIG9uIHRoZSBsZWZ0LXNpZGUgYm9hcmQuICBSZWQgaW5kaWNhdGVzIGEgaGl0IGFuZCBkYXJrIGdyZWVuIGluZGljYXRlcyBhIG1pc3MuICBUaGUgcm9ib3Qgd2lsbCBtYWtlIGEgbW92ZSBhdXRvbWF0aWNhbGx5IGFmdGVyIHlvdSBjaG9vc2UuICBHb29kIGx1Y2shXCI7XG4gICAgICBjb25zdCByb2JvdENlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yb2JvdFwiKTtcbiAgICAgIGNvbnN0IGh1bWFuQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmh1bWFuXCIpO1xuICAgICAgcm9ib3RDZWxscy5mb3JFYWNoKChjZWxsKSA9PiAoY2VsbC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCIpKTtcbiAgICAgIGh1bWFuQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4gKGNlbGwuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYWxsXCIpKTtcbiAgICAgIGh1bWFuQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4gKGNlbGwuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCIpKTtcbiAgICAgIHdvcm1zUGxhY2VkID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVdvcm1zID0gKHdvcm1Db29yZHMpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcm1Db29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBib3hJRCA9IGAke3dvcm1Db29yZHNbaV19YDtcbiAgICAgIGxldCBib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJvYm90XCIpO1xuICAgICAgYm94LmZvckVhY2goKGJveCkgPT4ge1xuICAgICAgICBpZiAoYm94LmlkID09PSBib3hJRCkge1xuICAgICAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInBpbmtcIjtcbiAgICAgICAgICBib3guc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlU3RhcnRCdXR0b24gPSAod29ybXNPbkJvYXJkKSA9PiB7XG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgaWYgKHdvcm1zT25Cb2FyZC5sZW5ndGggPj0gNCkge1xuICAgICAgbGV0IGltYWdlSG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbWFnZXNcIik7XG4gICAgICB3aGlsZSAoaW1hZ2VIb2xkZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICBpbWFnZUhvbGRlci5yZW1vdmVDaGlsZChpbWFnZUhvbGRlci5maXJzdENoaWxkKTtcbiAgICAgIH1cbiAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1dHRvbi1ob2xkZXJcIik7XG5cbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwic3RhcnQtYnV0dG9uXCIpO1xuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJTdGFydCBHYW1lXCI7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICB9XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBnYW1lU3RhcnQodHJ1ZSk7XG4gICAgICBib2FyZC5yb2JvdFNldFNoaXBzKCk7XG4gICAgICBidXR0b24uc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gY2hhbmdlQ29sb3IocGxheWVyLCBjb29yZHMsIGhpdCkge1xuICAgIGxldCBwbGF5ZXJOYW1lID0gXCIuXCIgKyBwbGF5ZXI7XG4gICAgY29uc3QgSURzcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBsYXllck5hbWUpO1xuICAgIGlmIChoaXQgPT09IFwiaGl0XCIpIHtcbiAgICAgIElEc3F1YXJlLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgICBpZiAoc3F1YXJlLmlkID09PSBjb29yZHMpIHtcbiAgICAgICAgICBzcXVhcmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgICBzcXVhcmUuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgSURzcXVhcmUuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgICAgIGlmIChzcXVhcmUuaWQgPT09IGNvb3Jkcykge1xuICAgICAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImRhcmtncmVlblwiO1xuICAgICAgICAgIHNxdWFyZS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2VuZXJhdGVUYWJsZSxcbiAgICByZWdpc3RlckhvdmVycyxcbiAgICBnYW1lU3RhcnQsXG4gICAgZGlzcGxheVdvcm1zLFxuICAgIGNyZWF0ZVN0YXJ0QnV0dG9uLFxuICAgIGNoYW5nZUNvbG9yLFxuICB9O1xufVxuIiwiaW1wb3J0IHsgV29ybSB9IGZyb20gXCIuL3dvcm1zXCI7XG5pbXBvcnQgeyBVSSB9IGZyb20gXCIuL1VJXCI7XG5pbXBvcnQgeyBwbGF5ZXIsIHVpLCB3b3JtIH0gZnJvbSBcIi4vaW5kZXhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIEJvYXJkKCkge1xuICBjb25zdCB3b3Jtc09uQm9hcmQgPSBbXTtcbiAgY29uc3QgcGxheWVyV29ybUNvb3JkcyA9IFtdO1xuICBjb25zdCByb2JvdFdvcm1Db29yZHMgPSBbXTtcbiAgY29uc3Qgcm9ib3RXb3JtT2JqZWN0cyA9IFtdO1xuICBjb25zdCBtaXNzZWRTaG90c2h1bWFuID0gW107XG4gIGNvbnN0IG1pc3NlZFNob3Rzcm9ib3QgPSBbXTtcbiAgY29uc3QgdG90YWxSb2JvdEhpdHMgPSBbXTtcbiAgY29uc3QgdG90YWxIdW1hbkhpdHMgPSBbXTtcblxuICBsZXQgY2hvaWNlcyA9IFtcbiAgICBcIjAwXCIsXG4gICAgXCIwMVwiLFxuICAgIFwiMDJcIixcbiAgICBcIjAzXCIsXG4gICAgXCIwNFwiLFxuICAgIFwiMDVcIixcbiAgICBcIjA2XCIsXG4gICAgXCIwN1wiLFxuICAgIFwiMDhcIixcbiAgICBcIjA5XCIsXG4gICAgXCIxMFwiLFxuICAgIFwiMTFcIixcbiAgICBcIjEyXCIsXG4gICAgXCIxM1wiLFxuICAgIFwiMTRcIixcbiAgICBcIjE1XCIsXG4gICAgXCIxNlwiLFxuICAgIFwiMTdcIixcbiAgICBcIjE4XCIsXG4gICAgXCIxOVwiLFxuICAgIFwiMjBcIixcbiAgICBcIjIxXCIsXG4gICAgXCIyMlwiLFxuICAgIFwiMjNcIixcbiAgICBcIjI0XCIsXG4gICAgXCIyNVwiLFxuICAgIFwiMjZcIixcbiAgICBcIjI3XCIsXG4gICAgXCIyOFwiLFxuICAgIFwiMjlcIixcbiAgICBcIjMwXCIsXG4gICAgXCIzMVwiLFxuICAgIFwiMzJcIixcbiAgICBcIjMzXCIsXG4gICAgXCIzNFwiLFxuICAgIFwiMzVcIixcbiAgICBcIjM2XCIsXG4gICAgXCIzN1wiLFxuICAgIFwiMzhcIixcbiAgICBcIjM5XCIsXG4gICAgXCI0MFwiLFxuICAgIFwiNDFcIixcbiAgICBcIjQyXCIsXG4gICAgXCI0M1wiLFxuICAgIFwiNDRcIixcbiAgICBcIjQ1XCIsXG4gICAgXCI0NlwiLFxuICAgIFwiNDdcIixcbiAgICBcIjQ4XCIsXG4gICAgXCI0OVwiLFxuICAgIFwiNTBcIixcbiAgICBcIjUxXCIsXG4gICAgXCI1MlwiLFxuICAgIFwiNTNcIixcbiAgICBcIjU0XCIsXG4gICAgXCI1NVwiLFxuICAgIFwiNTZcIixcbiAgICBcIjU3XCIsXG4gICAgXCI1OFwiLFxuICAgIFwiNTlcIixcbiAgICBcIjYwXCIsXG4gICAgXCI2MVwiLFxuICAgIFwiNjJcIixcbiAgICBcIjYzXCIsXG4gICAgXCI2NFwiLFxuICAgIFwiNjVcIixcbiAgICBcIjY2XCIsXG4gICAgXCI2N1wiLFxuICAgIFwiNjhcIixcbiAgICBcIjY5XCIsXG4gICAgXCI3MFwiLFxuICAgIFwiNzFcIixcbiAgICBcIjcyXCIsXG4gICAgXCI3M1wiLFxuICAgIFwiNzRcIixcbiAgICBcIjc1XCIsXG4gICAgXCI3NlwiLFxuICAgIFwiNzdcIixcbiAgICBcIjc4XCIsXG4gICAgXCI3OVwiLFxuICAgIFwiODBcIixcbiAgICBcIjgxXCIsXG4gICAgXCI4MlwiLFxuICAgIFwiODNcIixcbiAgICBcIjg0XCIsXG4gICAgXCI4NVwiLFxuICAgIFwiODZcIixcbiAgICBcIjg3XCIsXG4gICAgXCI4OFwiLFxuICAgIFwiODlcIixcbiAgICBcIjkwXCIsXG4gICAgXCI5MVwiLFxuICAgIFwiOTJcIixcbiAgICBcIjkzXCIsXG4gICAgXCI5NFwiLFxuICAgIFwiOTVcIixcbiAgICBcIjk2XCIsXG4gICAgXCI5N1wiLFxuICAgIFwiOThcIixcbiAgICBcIjk5XCIsXG4gIF07XG5cbiAgbGV0IHBsYXllcjEgPSBcImh1bWFuXCI7XG4gIGxldCBwbGF5ZXIyID0gXCJyb2JvdFwiO1xuXG4gIGZ1bmN0aW9uIHJhbmRvbU51bWJlcihhcnJheSkge1xuICAgIGxldCByYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgIHJldHVybiBhcnJheVtyYW5kb21OdW1iZXJdO1xuICB9XG5cbiAgY29uc3QgZHVwbGljYXRlQ2hlY2tlciA9IChjb29yZHMpID0+IHtcbiAgICBpZiAobWlzc2VkU2hvdHNyb2JvdC5pbmNsdWRlcyhjb29yZHMpIHx8IHRvdGFsSHVtYW5IaXRzLmluY2x1ZGVzKGNvb3JkcykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYWNlV29ybXMgPSAoY29vcmRzLCB3b3JtTGVuZ3RoLCBwbGF5ZXJOYW1lKSA9PiB7XG4gICAgaWYgKHBsYXllck5hbWUgPT09IFwiaHVtYW5cIikge1xuICAgICAgbGV0IHlWYWx1ZSA9IGNvb3Jkcy5jaGFyQXQoMSk7XG4gICAgICBsZXQgdXBwZXJMaW1pdCA9IDEwIC0gd29ybUxlbmd0aDtcbiAgICAgIGlmICh5VmFsdWUgPiB1cHBlckxpbWl0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGdlbmVyYXRlZEFycmF5ID0gZ2VuZXJhdGVDb29yZHNBcnJheShjb29yZHMsIHdvcm1MZW5ndGgpO1xuICAgICAgICBsZXQgd29ybUNoZWNrID0gZmluZENvbW1vbkVsZW1lbnRzKGdlbmVyYXRlZEFycmF5LCBwbGF5ZXJOYW1lKTtcbiAgICAgICAgaWYgKCF3b3JtQ2hlY2spIHtcbiAgICAgICAgICBVSSgpLmRpc3BsYXlXb3JtcyhnZW5lcmF0ZWRBcnJheSk7XG4gICAgICAgICAgaG9sZFdvcm1zKFdvcm0od29ybUxlbmd0aCwgZ2VuZXJhdGVkQXJyYXksIHBsYXllck5hbWUpLCBwbGF5ZXJOYW1lKTtcbiAgICAgICAgfSBlbHNlIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGxheWVyTmFtZSA9PT0gXCJyb2JvdFwiKSB7XG4gICAgICBsZXQgeVZhbHVlID0gU3RyaW5nKGNvb3JkcylbMV07XG4gICAgICBsZXQgdXBwZXJMaW1pdCA9IDEwIC0gd29ybUxlbmd0aDtcbiAgICAgIGlmICh5VmFsdWUgPiB1cHBlckxpbWl0KSB7XG4gICAgICAgIHBsYWNlV29ybXMocmFuZG9tTnVtYmVyKGNob2ljZXMpLCB3b3JtTGVuZ3RoLCBwbGF5ZXJOYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBnZW5lcmF0ZWRBcnJheSA9IGdlbmVyYXRlQ29vcmRzQXJyYXkoY29vcmRzLCB3b3JtTGVuZ3RoKTtcbiAgICAgICAgbGV0IHdvcm1DaGVjayA9IGZpbmRDb21tb25FbGVtZW50cyhnZW5lcmF0ZWRBcnJheSwgcGxheWVyTmFtZSk7XG4gICAgICAgIGlmICghd29ybUNoZWNrKSB7XG4gICAgICAgICAgaG9sZFdvcm1zKFdvcm0od29ybUxlbmd0aCwgZ2VuZXJhdGVkQXJyYXksIHBsYXllck5hbWUpLCBwbGF5ZXJOYW1lKTtcbiAgICAgICAgfSBlbHNlIHBsYWNlV29ybXMocmFuZG9tTnVtYmVyKGNob2ljZXMpLCB3b3JtTGVuZ3RoLCBwbGF5ZXJOYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2VuZXJhdGVDb29yZHNBcnJheSA9IChjb29yZHMsIGxlbmd0aCkgPT4ge1xuICAgIGxldCBuZXdBcnJheSA9IFtdO1xuICAgIGxldCB5VmFsdWUgPSBTdHJpbmcoY29vcmRzKVsxXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgeFZhbHVlID0gU3RyaW5nKGNvb3JkcylbMF07XG4gICAgICBsZXQgeHkgPSB4VmFsdWUgKyB5VmFsdWUrKztcbiAgICAgIG5ld0FycmF5LnB1c2goeHkpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3QXJyYXk7XG4gIH07XG5cbiAgY29uc3QgZmluZENvbW1vbkVsZW1lbnRzID0gKHByb3Bvc2VkQ29vcmRzLCBwbGF5ZXIpID0+IHtcbiAgICBpZiAocGxheWVyID09PSBcImh1bWFuXCIpIHtcbiAgICAgIGNvbnN0IGZsYXRBcnJheSA9IHBsYXllcldvcm1Db29yZHMuZmxhdCgpO1xuICAgICAgcmV0dXJuIGZsYXRBcnJheS5zb21lKChpdGVtKSA9PiBwcm9wb3NlZENvb3Jkcy5pbmNsdWRlcyhpdGVtKSk7XG4gICAgfVxuICAgIGlmIChwbGF5ZXIgPT09IFwicm9ib3RcIikge1xuICAgICAgY29uc3QgZmxhdEFycmF5ID0gcm9ib3RXb3JtQ29vcmRzLmZsYXQoKTtcbiAgICAgIHJldHVybiBmbGF0QXJyYXkuc29tZSgoaXRlbSkgPT4gcHJvcG9zZWRDb29yZHMuaW5jbHVkZXMoaXRlbSkpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBob2xkV29ybXMgPSAod29ybU9iamVjdCwgcGxheWVyKSA9PiB7XG4gICAgaWYgKHBsYXllciA9PT0gXCJodW1hblwiKSB7XG4gICAgICBwbGF5ZXJXb3JtQ29vcmRzLnB1c2god29ybU9iamVjdC5jb29yZHMpO1xuICAgICAgd29ybXNPbkJvYXJkLnB1c2god29ybU9iamVjdCk7XG4gICAgICBVSSgpLmNyZWF0ZVN0YXJ0QnV0dG9uKHdvcm1zT25Cb2FyZCk7XG4gICAgfVxuICAgIGlmIChwbGF5ZXIgPT09IFwicm9ib3RcIikge1xuICAgICAgcm9ib3RXb3JtT2JqZWN0cy5wdXNoKHdvcm1PYmplY3QpO1xuICAgICAgcm9ib3RXb3JtQ29vcmRzLnB1c2god29ybU9iamVjdC5jb29yZHMpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByb2JvdFNldFNoaXBzID0gKCkgPT4ge1xuICAgIHBsYWNlV29ybXMocGxheWVyLnJhbmRvbUNob2ljZSgpLCAyLCBcInJvYm90XCIpO1xuICAgIHBsYWNlV29ybXMocGxheWVyLnJhbmRvbUNob2ljZSgpLCAzLCBcInJvYm90XCIpO1xuICAgIHBsYWNlV29ybXMocGxheWVyLnJhbmRvbUNob2ljZSgpLCA0LCBcInJvYm90XCIpO1xuICAgIHBsYWNlV29ybXMocGxheWVyLnJhbmRvbUNob2ljZSgpLCA1LCBcInJvYm90XCIpO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2tSb2JvdCA9IChjb29yZGluYXRlcykgPT4ge1xuICAgIGlmIChkdXBsaWNhdGVDaGVja2VyKGNvb3JkaW5hdGVzKSkge1xuICAgICAgY29vcmRpbmF0ZXMgPSByYW5kb21OdW1iZXIoY2hvaWNlcyk7XG4gICAgICByZWNlaXZlQXR0YWNrUm9ib3QoY29vcmRpbmF0ZXMsIHBsYXllcjIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocGxheWVyV29ybUNvb3Jkcy5mbGF0KCkuaW5jbHVkZXMoY29vcmRpbmF0ZXMpKSB7XG4gICAgICAgIHJvYm90SGl0KGNvb3JkaW5hdGVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlY29yZE1pc3MoY29vcmRpbmF0ZXMsIHBsYXllcjIpO1xuICAgICAgICBjaGVja0RlYWRXb3JtcyhwbGF5ZXIyKVxuICAgICAgICB1aS5jaGFuZ2VDb2xvcihwbGF5ZXIyLCBjb29yZGluYXRlcywgXCJtaXNzXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCByb2JvdEhpdCA9IChjb29yZGluYXRlcykgPT4ge1xuICAgIHRvdGFsSHVtYW5IaXRzLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgIGNoZWNrRGVhZFdvcm1zKHBsYXllcjIpO1xuICAgIHVpLmNoYW5nZUNvbG9yKHBsYXllcjIsIGNvb3JkaW5hdGVzLCBcImhpdFwiKTtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkaW5hdGVzLCBwbGF5ZXIpID0+IHtcbiAgICBpZiAocGxheWVyID09PSBwbGF5ZXIyKSB7XG4gICAgICByZWNlaXZlQXR0YWNrUm9ib3QoY29vcmRpbmF0ZXMpO1xuICAgIH1cbiAgICBpZiAocGxheWVyID09PSBwbGF5ZXIxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvYm90V29ybU9iamVjdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJvYm90V29ybU9iamVjdHNbal0uY29vcmRzLmluY2x1ZGVzKGNvb3JkaW5hdGVzKSkge1xuICAgICAgICAgIHJvYm90V29ybU9iamVjdHNbal0uaGl0KGNvb3JkaW5hdGVzKTtcbiAgICAgICAgICB0b3RhbFJvYm90SGl0cy5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgICAgICAgICBjaGVja0RlYWRXb3JtcyhwbGF5ZXIxKTtcbiAgICAgICAgICB1aS5jaGFuZ2VDb2xvcihwbGF5ZXIxLCBjb29yZGluYXRlcywgXCJoaXRcIik7XG4gICAgICAgICAgcmV0dXJuIHJlY2VpdmVBdHRhY2tSb2JvdChyYW5kb21OdW1iZXIoY2hvaWNlcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZWNvcmRNaXNzKGNvb3JkaW5hdGVzLCBwbGF5ZXIxKTtcbiAgICAgIHVpLmNoYW5nZUNvbG9yKHBsYXllcjEsIGNvb3JkaW5hdGVzLCBcIm1pc3NcIik7XG4gICAgICBjaGVja0RlYWRXb3JtcyhwbGF5ZXIxKVxuICAgICAgcmVjZWl2ZUF0dGFja1JvYm90KHJhbmRvbU51bWJlcihjaG9pY2VzKSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlY29yZE1pc3MgPSAoY29vcmRpbmF0ZXMsIGN1cnJlbnRQbGF5ZXIpID0+IHtcbiAgICBpZiAoY3VycmVudFBsYXllciA9PT0gcGxheWVyMSkge1xuICAgICAgbWlzc2VkU2hvdHNodW1hbi5pbmNsdWRlcyhjb29yZGluYXRlcylcbiAgICAgICAgPyBudWxsXG4gICAgICAgIDogbWlzc2VkU2hvdHNodW1hbi5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgICAgIHVpLmNoYW5nZUNvbG9yKHBsYXllcjEsIGNvb3JkaW5hdGVzLCBcIm1pc3NcIik7XG4gICAgfVxuICAgIGlmIChjdXJyZW50UGxheWVyID09PSBwbGF5ZXIyKSB7XG4gICAgICBtaXNzZWRTaG90c3JvYm90LmluY2x1ZGVzKGNvb3JkaW5hdGVzKVxuICAgICAgICA/IHJlY2VpdmVBdHRhY2socmFuZG9tTnVtYmVyKGNob2ljZXMpLCBwbGF5ZXIyKVxuICAgICAgICA6IG1pc3NlZFNob3Rzcm9ib3QucHVzaChjb29yZGluYXRlcyk7XG4gICAgICB1aS5jaGFuZ2VDb2xvcihwbGF5ZXIyLCBjb29yZGluYXRlcywgXCJtaXNzXCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjaGVja0RlYWRXb3JtcyA9IChwbGF5ZXIpID0+IHtcbiAgICBmdW5jdGlvbiBhZGRSZXNldEJ1dHRvbigpIHtcbiAgICAgIGNvbnN0IGluc3RydWN0aW9uQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnN0cnVjdGlvbi1ib3hcIik7XG4gICAgICBpbnN0cnVjdGlvbkJveC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgICBpbnN0cnVjdGlvbkJveC5zdHlsZS5mbGV4RGlyZWN0aW9uID0gJ2NvbHVtbidcbiAgICAgIGxldCByZXNldEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICByZXNldEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdyZXNldC1idXR0b24nKVxuICAgICAgcmVzZXRCdXR0b24udGV4dENvbnRlbnQgPSAnUmVzZXQgQm9hcmQnXG4gICAgICBpbnN0cnVjdGlvbkJveC5hcHBlbmRDaGlsZChyZXNldEJ1dHRvbilcbiAgICAgIHJlc2V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVsb2FkLCBmYWxzZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWxvYWQoKSB7cmVsb2FkID0gbG9jYXRpb24ucmVsb2FkKCl9XG5cbiAgICBpZiAocGxheWVyID09PSBwbGF5ZXIxKSB7XG4gICAgICBpZiAodG90YWxIdW1hbkhpdHMubGVuZ3RoID09PSBwbGF5ZXJXb3JtQ29vcmRzLmZsYXQoKS5sZW5ndGgpIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25Cb3gudGV4dENvbnRlbnQgPSBcIkdhbWUgb3ZlciwgUm9ib3Qgd2lucyEhXCI7XG4gICAgICAgIGluc3RydWN0aW9uQm94LnN0eWxlLmZvbnRTaXplID0gJzcwcHgnXG4gICAgICAgIGluc3RydWN0aW9uQm94LnN0eWxlLmZvbnRGYW1pbHkgPSAnQnV0dGVyZmx5IEtpZHMnXG4gICAgICAgIGFkZFJlc2V0QnV0dG9uKClcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBsYXllciA9PT0gcGxheWVyMikge1xuICAgICAgaWYgKHRvdGFsUm9ib3RIaXRzLmxlbmd0aCA9PT0gcm9ib3RXb3JtQ29vcmRzLmZsYXQoKS5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25Cb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluc3RydWN0aW9uLWJveFwiKTtcbiAgICAgICAgaW5zdHJ1Y3Rpb25Cb3gudGV4dENvbnRlbnQgPSBcIkdhbWUgb3ZlciwgeW91IHdpbiEhXCI7XG4gICAgICAgIGluc3RydWN0aW9uQm94LnN0eWxlLmZvbnRTaXplID0gJzcwcHgnXG4gICAgICAgIGluc3RydWN0aW9uQm94LnN0eWxlLmZvbnRGYW1pbHkgPSAnQnV0dGVyZmx5IEtpZHMnXG4gICAgICAgIGFkZFJlc2V0QnV0dG9uKClcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cblxuICByZXR1cm4ge1xuICAgIHBsYWNlV29ybXMsXG4gICAgaG9sZFdvcm1zLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgcmVjb3JkTWlzcyxcbiAgICBjaGVja0RlYWRXb3JtcyxcbiAgICByb2JvdFNldFNoaXBzLFxuICAgIHdvcm1zT25Cb2FyZCxcbiAgICBtaXNzZWRTaG90c2h1bWFuLFxuICAgIG1pc3NlZFNob3Rzcm9ib3QsXG4gICAgcGxheWVyV29ybUNvb3JkcyxcbiAgICB0b3RhbFJvYm90SGl0cyxcbiAgICB0b3RhbEh1bWFuSGl0cyxcbiAgICBwbGF5ZXIxLFxuICAgIHBsYXllcjIsXG4gIH07XG59XG4iLCJpbXBvcnQgZ3J1YiBmcm9tIFwiLi9hc3NldHMvZ3J1Yi5wbmdcIjtcbmltcG9ydCBwdXBhZSBmcm9tIFwiLi9hc3NldHMvcHVwYWUucG5nXCI7XG5pbXBvcnQgc2hvdmVsIGZyb20gXCIuL2Fzc2V0cy9zaG92ZWwucG5nXCI7XG5pbXBvcnQgZmxhdHdvcm0gZnJvbSBcIi4vYXNzZXRzL2ZsYXR3b3JtLnBuZ1wiO1xuaW1wb3J0IGVhcnRod29ybSBmcm9tIFwiLi9hc3NldHMvZWFydGh3b3JtLnBuZ1wiO1xuaW1wb3J0IHsgQm9hcmQgfSBmcm9tIFwiLi9ib2FyZHNcIjtcbmltcG9ydCB7IGJvYXJkIH0gZnJvbSBcIi4vaW5kZXhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIERyYWdkcm9wKCkge1xuICBjb25zdCBjb21wb25lbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbWFnZXNcIik7XG4gICAgbGV0IGdydWJJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGdydWJJbWcuY2xhc3NMaXN0LmFkZChcImJ1Zy1pbWFnZXNcIik7XG4gICAgZ3J1YkltZy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImdydWJcIik7XG4gICAgZ3J1YkltZy5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dhYmxlXCIpO1xuICAgIGdydWJJbWcuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIHRydWUpO1xuICAgIGdydWJJbWcuc2V0QXR0cmlidXRlKFwibGVuZ3RoXCIsIDIpO1xuICAgIGdydWJJbWcuc3JjID0gZ3J1YjtcbiAgICBncnViSW1nLmFsdCA9IFwiaW1hZ2Ugb2YgZ3J1YlwiO1xuICAgIGltYWdlcy5hcHBlbmRDaGlsZChncnViSW1nKTtcbiAgICAvL1xuICAgIGxldCBwdXBhZUltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgcHVwYWVJbWcuY2xhc3NMaXN0LmFkZChcImJ1Zy1pbWFnZXNcIik7XG4gICAgcHVwYWVJbWcuY2xhc3NMaXN0LmFkZChcImRyYWdnYWJsZVwiKTtcbiAgICBwdXBhZUltZy5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgdHJ1ZSk7XG4gICAgcHVwYWVJbWcuc2V0QXR0cmlidXRlKFwibGVuZ3RoXCIsIDMpO1xuICAgIHB1cGFlSW1nLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicHVwYWVcIik7XG4gICAgcHVwYWVJbWcuc3JjID0gcHVwYWU7XG4gICAgcHVwYWVJbWcuYWx0ID0gXCJpbWFnZSBvZiBwdXBhZVwiO1xuICAgIGltYWdlcy5hcHBlbmRDaGlsZChwdXBhZUltZyk7XG4gICAgLy9cbiAgICBsZXQgZmxhdHdvcm1JbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGZsYXR3b3JtSW1nLmNsYXNzTGlzdC5hZGQoXCJidWctaW1hZ2VzXCIpO1xuICAgIGZsYXR3b3JtSW1nLmNsYXNzTGlzdC5hZGQoXCJkcmFnZ2FibGVcIik7XG4gICAgZmxhdHdvcm1JbWcuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIHRydWUpO1xuICAgIGZsYXR3b3JtSW1nLnNldEF0dHJpYnV0ZShcImxlbmd0aFwiLCA0KTtcbiAgICBmbGF0d29ybUltZy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImZsYXR3b3JtXCIpO1xuICAgIGZsYXR3b3JtSW1nLnNyYyA9IGZsYXR3b3JtO1xuICAgIGZsYXR3b3JtSW1nLmFsdCA9IFwiaW1hZ2Ugb2YgZmxhdHdvcm1cIjtcbiAgICBpbWFnZXMuYXBwZW5kQ2hpbGQoZmxhdHdvcm1JbWcpO1xuICAgIC8vXG4gICAgbGV0IGVhcnRod29ybUltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZWFydGh3b3JtSW1nLmNsYXNzTGlzdC5hZGQoXCJidWctaW1hZ2VzXCIpO1xuICAgIGVhcnRod29ybUltZy5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dhYmxlXCIpO1xuICAgIGVhcnRod29ybUltZy5zZXRBdHRyaWJ1dGUoXCJsZW5ndGhcIiwgNSk7XG4gICAgZWFydGh3b3JtSW1nLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCB0cnVlKTtcbiAgICBlYXJ0aHdvcm1JbWcuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJlYXJ0aHdvcm1cIik7XG4gICAgZWFydGh3b3JtSW1nLnNyYyA9IGVhcnRod29ybTtcbiAgICBlYXJ0aHdvcm1JbWcuYWx0ID0gXCJpbWFnZSBvZiBmbGF0d29ybVwiO1xuICAgIGltYWdlcy5hcHBlbmRDaGlsZChlYXJ0aHdvcm1JbWcpO1xuICB9O1xuXG4gIGNvbnN0IGFkZExpc3RlbmVycyA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgaGFuZGxlRHJhZ1N0YXJ0KTtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGhhbmRsZURyb3ApO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGhhbmRsZU92ZXIpO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbnRlclwiLCBoYW5kbGVFbnRlcik7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIGhhbmRsZUxlYXZlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEcmFnU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICBsZXQgb2JqID0gZXZlbnQudGFyZ2V0O1xuICAgIGlmICghb2JqLmNsb3Nlc3QoXCIuZHJhZ2dhYmxlXCIpKSByZXR1cm47XG4gICAgaWYgKG9iai5jbGFzc0xpc3QuY29udGFpbnMoXCJkcmFnZ2FibGVcIikpIHtcbiAgICAgIG9iaiA9IG9iai5nZXRBdHRyaWJ1dGUoXCJsZW5ndGhcIik7XG4gICAgfVxuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5zcmMgPSBzaG92ZWw7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZShpbWcsIDEyMCwgMCk7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsIG9iaik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRHJvcCA9IChldmVudCkgPT4ge1xuICAgIGxldCBkcm9wem9uZSA9IGV2ZW50LnRhcmdldDtcbiAgICBsZXQgaWQgPSBkcm9wem9uZS5pZDtcbiAgICBpZiAoIWRyb3B6b25lLmNsYXNzTGlzdC5jb250YWlucyhcImRyb3B6b25lXCIpKSByZXR1cm47XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgd29ybUxlbmd0aCA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dC9wbGFpblwiKTtcbiAgICBib2FyZC5wbGFjZVdvcm1zKGlkLCB3b3JtTGVuZ3RoLCBcImh1bWFuXCIpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU92ZXIgPSAoZXZlbnQpID0+IHtcbiAgICBsZXQgZHJvcHpvbmUgPSBldmVudC50YXJnZXQ7XG4gICAgaWYgKCFkcm9wem9uZS5jbGFzc0xpc3QuY29udGFpbnMoXCJkcm9wem9uZVwiKSkgcmV0dXJuO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRW50ZXIgPSAoZXZlbnQpID0+IHtcbiAgICBsZXQgZHJvcHpvbmUgPSBldmVudC50YXJnZXQ7XG4gICAgaWYgKCFkcm9wem9uZS5jbGFzc0xpc3QuY29udGFpbnMoXCJkcm9wem9uZVwiKSkgcmV0dXJuO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZHJvcHpvbmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVMZWF2ZSA9IChldmVudCkgPT4ge1xuICAgIGxldCBkcm9wem9uZSA9IGV2ZW50LnRhcmdldDtcbiAgICBpZiAoIWRyb3B6b25lLmNsYXNzTGlzdC5jb250YWlucyhcImRyb3B6b25lXCIpKSByZXR1cm47XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBkcm9wem9uZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0Z3JlZW5cIjtcbiAgfTtcblxuICByZXR1cm4geyBjb21wb25lbnQsIGFkZExpc3RlbmVycywgaGFuZGxlRHJhZ1N0YXJ0LCBoYW5kbGVEcm9wIH07XG59XG4iLCJpbXBvcnQgeyBVSSB9IGZyb20gXCIuL1VJLmpzXCI7XG5pbXBvcnQgc3R5bGVzaGVldCBmcm9tIFwiLi9zdHlsZXMuY3NzXCI7XG5pbXBvcnQgeyBEcmFnZHJvcCB9IGZyb20gXCIuL2RyYWdkcm9wLmpzXCI7XG5pbXBvcnQgeyBCb2FyZCB9IGZyb20gXCIuL2JvYXJkc1wiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBXb3JtIH0gZnJvbSBcIi4vd29ybXNcIjtcblxuZXhwb3J0IGNvbnN0IHVpID0gVUkoKTtcbmV4cG9ydCBjb25zdCBkcmFnZHJvcCA9IERyYWdkcm9wKCk7XG5leHBvcnQgbGV0IHBsYXllciA9IFBsYXllcigpO1xuZXhwb3J0IGxldCBib2FyZCA9IEJvYXJkKCk7XG5leHBvcnQgbGV0IHdvcm0gPSBXb3JtKCk7XG51aS5nZW5lcmF0ZVRhYmxlKFwiI3BsYXllci1ib2FyZFwiLCBcImh1bWFuXCIpO1xudWkuZ2VuZXJhdGVUYWJsZShcIiNyb2JvdC1ib2FyZFwiLCBcInJvYm90XCIpO1xudWkucmVnaXN0ZXJIb3ZlcnMoKTtcbmRyYWdkcm9wLmNvbXBvbmVudCgpO1xuZHJhZ2Ryb3AuYWRkTGlzdGVuZXJzKCk7XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyQ2xpY2tzKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmh1bWFuXCIpLmZvckVhY2goKHNxdWFyZSkgPT5cbiAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2sodGFyZ2V0LmlkLCBcImh1bWFuXCIpO1xuICAgICAgY29uc29sZS5sb2codGFyZ2V0LmlkKTtcbiAgICB9KVxuICApO1xufVxucmVnaXN0ZXJDbGlja3MoKTtcblxudWkuZ2FtZVN0YXJ0KGZhbHNlKTtcbiIsImltcG9ydCB7IEJvYXJkIH0gZnJvbSBcIi4vYm9hcmRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBQbGF5ZXIoKSB7XG4gIGxldCBwcmV2aW91c0Nob2ljZXMgPSBbXTtcbiAgIFxuICBjb25zdCByb2JvdEF0dGFjayA9ICgpID0+IHtcbiAgICBsZXQgcmFuZG9tQXR0YWNrID0gcmFuZG9tQ2hvaWNlKCk7XG4gICAgQm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb21BdHRhY2spO1xuICB9O1xuXG4gIGNvbnN0IHJhbmRvbUNob2ljZSA9ICgpID0+IHtcbiAgICBsZXQgY2hvaWNlcyA9IFtcIjAwXCIsXCIwMVwiLFwiMDJcIixcIjAzXCIsXCIwNFwiLFwiMDVcIixcIjA2XCIsXCIwN1wiLFwiMDhcIixcIjA5XCIsXCIxMFwiLFwiMTFcIixcIjEyXCIsXCIxM1wiLFwiMTRcIixcIjE1XCIsXCIxNlwiLFwiMTdcIixcIjE4XCIsXCIxOVwiLFwiMjBcIixcIjIxXCIsXCIyMlwiLFwiMjNcIixcIjI0XCIsXCIyNVwiLFwiMjZcIixcIjI3XCIsXCIyOFwiLFwiMjlcIixcIjMwXCIsXCIzMVwiLFwiMzJcIixcIjMzXCIsXCIzNFwiLFwiMzVcIixcIjM2XCIsXCIzN1wiLFwiMzhcIixcIjM5XCIsXCI0MFwiLFwiNDFcIixcIjQyXCIsXCI0M1wiLFwiNDRcIixcIjQ1XCIsXCI0NlwiLFwiNDdcIixcIjQ4XCIsXCI0OVwiLFwiNTBcIixcIjUxXCIsXCI1MlwiLFwiNTNcIixcIjU0XCIsXCI1NVwiLFwiNTZcIixcIjU3XCIsXCI1OFwiLFwiNTlcIixcIjYwXCIsXCI2MVwiLFwiNjJcIixcIjYzXCIsXCI2NFwiLFwiNjVcIixcIjY2XCIsXCI2N1wiLFwiNjhcIixcIjY5XCIsXCI3MFwiLFwiNzFcIixcIjcyXCIsXCI3M1wiLFwiNzRcIixcIjc1XCIsXCI3NlwiLFwiNzdcIixcIjc4XCIsXCI3OVwiLFwiODBcIixcIjgxXCIsXCI4MlwiLFwiODNcIixcIjg0XCIsXCI4NVwiLFwiODZcIixcIjg3XCIsXCI4OFwiLFwiODlcIixcIjkwXCIsXCI5MVwiLFwiOTJcIixcIjkzXCIsXCI5NFwiLFwiOTVcIixcIjk2XCIsXCI5N1wiLFwiOThcIixcIjk5XCJdXG4gICAgbGV0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgbGV0IHJhbmRvbVBpY2sgPSBjaG9pY2VzW3JhbmRvbU51bWJlcl07XG4gICAgY29uc29sZS5sb2cocmFuZG9tUGljaylcbiAgICBpZiAocHJldmlvdXNDaG9pY2VzLmluY2x1ZGVzKHJhbmRvbVBpY2spKSB7XG4gICAgICByYW5kb21DaG9pY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldmlvdXNDaG9pY2VzLnB1c2gocmFuZG9tUGljayk7XG4gICAgICByZXR1cm4gcmFuZG9tUGljaztcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtyb2JvdEF0dGFjaywgcmFuZG9tQ2hvaWNlIH07XG59O1xuIiwiY29uc3QgeyBCb2FyZCB9ID0gcmVxdWlyZShcIi4vYm9hcmRzXCIpO1xuXG5jb25zdCBXb3JtID0gKGxlbmd0aCwgY29vcmRzLCBwbGF5ZXIpID0+IHtcbiAgY29uc3QgaGl0cyA9IFtdO1xuICBjb25zdCBkZWFkID0gZmFsc2U7XG5cbiAgY29uc3QgaXNFYXRlbiA9ICgpID0+IHtcbiAgICByZXR1cm4gaGl0cy5zaXplID09PSBsZW5ndGg7XG4gIH07XG5cbiAgY29uc3QgaGl0ID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgcmV0dXJuIGhpdHMucHVzaChjb29yZGluYXRlcyk7XG4gIH07XG5cbiAgY29uc3QgZGVjaWRlV29ybU5hbWUgPSAobGVuZ3RoKSA9PiB7XG4gICAgbGV0IHdvcm1OYW1lO1xuICAgIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHdvcm1OYW1lID0gXCJncnViXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICB3b3JtTmFtZSA9IFwicHVwYWVcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHdvcm1OYW1lID0gXCJmbGF0d29ybVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgd29ybU5hbWUgPSBcImVhcnRod29ybVwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHdvcm1OYW1lID0gXCJ3b3JtXCI7XG4gICAgfVxuICAgIHJldHVybiB3b3JtTmFtZTtcbiAgfTtcblxuICBjb25zdCB3b3JtTmFtZSA9IGRlY2lkZVdvcm1OYW1lKGxlbmd0aCk7XG5cbiAgcmV0dXJuIHtcbiAgICBkZWNpZGVXb3JtTmFtZSxcbiAgICBoaXQsXG4gICAgaXNFYXRlbixcbiAgICBjb29yZHMsXG4gICAgcGxheWVyLFxuICAgIGxlbmd0aCxcbiAgICBoaXRzLFxuICAgIHdvcm1OYW1lLFxuICAgIGRlYWQsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgV29ybSB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuLmNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAxNXB4O1xcbn1cXG5cXG4uYm9hcmQtZnJhbWUge1xcbiAgaGVpZ2h0OiA1MjBweDtcXG4gIHdpZHRoOiA1MjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JlZW47XFxufVxcblxcbi50aXRsZSB7XFxuICBmb250LWZhbWlseTogXFxcIkJ1dHRlcmZseSBLaWRzXFxcIiwgXFxcImN1cnNpdmVcXFwiO1xcbiAgZm9udC1zaXplOiAxMHZoO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG50YWJsZSB7XFxuICBib3JkZXItc3BhY2luZzogMHB4O1xcbn1cXG5cXG4ucm93IHtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi5ib2FyZC1zcXVhcmUge1xcbiAgaGVpZ2h0OiA1MHB4O1xcbiAgd2lkdGg6IDUwcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCBncmV5O1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JlZW47XFxufVxcblxcbi5pbWFnZXMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGhlaWdodDogMjB2aDtcXG59XFxuXFxuLmJ1Zy1pbWFnZXMge1xcbiAgd2lkdGg6IDE1dnc7XFxufVxcblxcbi5vdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IFxcXCJyZWRcXFwiO1xcbn1cXG5cXG4uYnV0dG9uLWhvbGRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uc3RhcnQtYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBtYXJnaW46IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBwaW5rO1xcbiAgYm9yZGVyOiBncmV5O1xcbiAgZm9udC1zaXplOiAzMHB4O1xcbn1cXG5cXG4ucmVzZXQtYnV0dG9uIHtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gIG1hcmdpbjogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHBpbms7XFxuICBib3JkZXI6IGdyZXk7XFxuICBmb250LXNpemU6IDMwcHg7XFxufVxcblxcbmJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHBhbGV2aW9sZXRyZWQ7XFxuICAgIGJvcmRlcjpkYXJrZ3JheTtcXG59XFxuXFxucCB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LWZhbWlseTogR2VvcmdpYSwgXFxcIlRpbWVzIE5ldyBSb21hblxcXCIsIFRpbWVzLCBzZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsU0FBUztFQUNULFVBQVU7QUFDWjs7QUFFQTtFQUNFLGFBQWE7QUFDZjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFlBQVk7RUFDWiw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSx3Q0FBd0M7RUFDeEMsZUFBZTtFQUNmLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixTQUFTO0VBQ1QsVUFBVTtBQUNaOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCxzQkFBc0I7RUFDdEIsVUFBVTtFQUNWLFNBQVM7RUFDVCw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixlQUFlO0FBQ2pCOztBQUVBO0lBQ0ksYUFBYTtFQUNmLFlBQVk7RUFDWixzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGVBQWU7QUFDakI7O0FBRUE7SUFDSSwrQkFBK0I7SUFDL0IsZUFBZTtBQUNuQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixxREFBcUQ7RUFDckQsZUFBZTtFQUNmLGFBQWE7QUFDZlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuLmNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAxNXB4O1xcbn1cXG5cXG4uYm9hcmQtZnJhbWUge1xcbiAgaGVpZ2h0OiA1MjBweDtcXG4gIHdpZHRoOiA1MjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JlZW47XFxufVxcblxcbi50aXRsZSB7XFxuICBmb250LWZhbWlseTogXFxcIkJ1dHRlcmZseSBLaWRzXFxcIiwgXFxcImN1cnNpdmVcXFwiO1xcbiAgZm9udC1zaXplOiAxMHZoO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG50YWJsZSB7XFxuICBib3JkZXItc3BhY2luZzogMHB4O1xcbn1cXG5cXG4ucm93IHtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbi5ib2FyZC1zcXVhcmUge1xcbiAgaGVpZ2h0OiA1MHB4O1xcbiAgd2lkdGg6IDUwcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCBncmV5O1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JlZW47XFxufVxcblxcbi5pbWFnZXMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGhlaWdodDogMjB2aDtcXG59XFxuXFxuLmJ1Zy1pbWFnZXMge1xcbiAgd2lkdGg6IDE1dnc7XFxufVxcblxcbi5vdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IFxcXCJyZWRcXFwiO1xcbn1cXG5cXG4uYnV0dG9uLWhvbGRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uc3RhcnQtYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBtYXJnaW46IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBwaW5rO1xcbiAgYm9yZGVyOiBncmV5O1xcbiAgZm9udC1zaXplOiAzMHB4O1xcbn1cXG5cXG4ucmVzZXQtYnV0dG9uIHtcXG4gICAgcGFkZGluZzogMTBweDtcXG4gIG1hcmdpbjogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHBpbms7XFxuICBib3JkZXI6IGdyZXk7XFxuICBmb250LXNpemU6IDMwcHg7XFxufVxcblxcbmJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHBhbGV2aW9sZXRyZWQ7XFxuICAgIGJvcmRlcjpkYXJrZ3JheTtcXG59XFxuXFxucCB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LWZhbWlseTogR2VvcmdpYSwgXFxcIlRpbWVzIE5ldyBSb21hblxcXCIsIFRpbWVzLCBzZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImNzc1dpdGhNYXBwaW5nVG9TdHJpbmciLCJsaXN0IiwidG9TdHJpbmciLCJtYXAiLCJpdGVtIiwiY29udGVudCIsIm5lZWRMYXllciIsImNvbmNhdCIsImxlbmd0aCIsImpvaW4iLCJpIiwibW9kdWxlcyIsIm1lZGlhIiwiZGVkdXBlIiwic3VwcG9ydHMiLCJsYXllciIsInVuZGVmaW5lZCIsImFscmVhZHlJbXBvcnRlZE1vZHVsZXMiLCJrIiwiaWQiLCJfayIsInB1c2giLCJjc3NNYXBwaW5nIiwiYnRvYSIsImJhc2U2NCIsInVuZXNjYXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiSlNPTiIsInN0cmluZ2lmeSIsImRhdGEiLCJzb3VyY2VNYXBwaW5nIiwic291cmNlVVJMcyIsInNvdXJjZXMiLCJzb3VyY2UiLCJzb3VyY2VSb290IiwiYm9hcmQiLCJVSSIsImluc3RydWN0aW9uQm94IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIndvcm1zUGxhY2VkIiwiZ2VuZXJhdGVUYWJsZSIsInRhYmxlSUQiLCJwbGF5ZXIiLCJ0YWJsZSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJib2FyZEZyYW1lIiwicXVlcnlTZWxlY3RvciIsImFwcGVuZENoaWxkIiwieSIsInJvdyIsIngiLCJjZWxsIiwic3R5bGUiLCJwb2ludGVyRXZlbnRzIiwiY3Vyc29yIiwic2V0QXR0cmlidXRlIiwicmVnaXN0ZXJIb3ZlcnMiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJ0YXJnZXQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJnYW1lU3RhcnQiLCJib29sIiwidGV4dENvbnRlbnQiLCJyb2JvdENlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsImh1bWFuQ2VsbHMiLCJmb3JFYWNoIiwiZGlzcGxheVdvcm1zIiwid29ybUNvb3JkcyIsImJveElEIiwiYm94IiwiY3JlYXRlU3RhcnRCdXR0b24iLCJ3b3Jtc09uQm9hcmQiLCJidXR0b24iLCJpbWFnZUhvbGRlciIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImNvbnRhaW5lciIsInJvYm90U2V0U2hpcHMiLCJ2aXNpYmlsaXR5IiwiY2hhbmdlQ29sb3IiLCJjb29yZHMiLCJoaXQiLCJwbGF5ZXJOYW1lIiwiSURzcXVhcmUiLCJzcXVhcmUiLCJXb3JtIiwidWkiLCJ3b3JtIiwiQm9hcmQiLCJwbGF5ZXJXb3JtQ29vcmRzIiwicm9ib3RXb3JtQ29vcmRzIiwicm9ib3RXb3JtT2JqZWN0cyIsIm1pc3NlZFNob3RzaHVtYW4iLCJtaXNzZWRTaG90c3JvYm90IiwidG90YWxSb2JvdEhpdHMiLCJ0b3RhbEh1bWFuSGl0cyIsImNob2ljZXMiLCJwbGF5ZXIxIiwicGxheWVyMiIsInJhbmRvbU51bWJlciIsImFycmF5IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZHVwbGljYXRlQ2hlY2tlciIsImluY2x1ZGVzIiwicGxhY2VXb3JtcyIsIndvcm1MZW5ndGgiLCJ5VmFsdWUiLCJjaGFyQXQiLCJ1cHBlckxpbWl0IiwiZ2VuZXJhdGVkQXJyYXkiLCJnZW5lcmF0ZUNvb3Jkc0FycmF5Iiwid29ybUNoZWNrIiwiZmluZENvbW1vbkVsZW1lbnRzIiwiaG9sZFdvcm1zIiwiU3RyaW5nIiwibmV3QXJyYXkiLCJ4VmFsdWUiLCJ4eSIsInByb3Bvc2VkQ29vcmRzIiwiZmxhdEFycmF5IiwiZmxhdCIsInNvbWUiLCJ3b3JtT2JqZWN0IiwicmFuZG9tQ2hvaWNlIiwicmVjZWl2ZUF0dGFja1JvYm90IiwiY29vcmRpbmF0ZXMiLCJyb2JvdEhpdCIsInJlY29yZE1pc3MiLCJjaGVja0RlYWRXb3JtcyIsInJlY2VpdmVBdHRhY2siLCJqIiwiY3VycmVudFBsYXllciIsImFkZFJlc2V0QnV0dG9uIiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJyZXNldEJ1dHRvbiIsInJlbG9hZCIsImxvY2F0aW9uIiwiZm9udFNpemUiLCJmb250RmFtaWx5IiwiZ3J1YiIsInB1cGFlIiwic2hvdmVsIiwiZmxhdHdvcm0iLCJlYXJ0aHdvcm0iLCJEcmFnZHJvcCIsImNvbXBvbmVudCIsImltYWdlcyIsImdydWJJbWciLCJzcmMiLCJhbHQiLCJwdXBhZUltZyIsImZsYXR3b3JtSW1nIiwiZWFydGh3b3JtSW1nIiwiYWRkTGlzdGVuZXJzIiwiYm9keSIsImhhbmRsZURyYWdTdGFydCIsImhhbmRsZURyb3AiLCJoYW5kbGVPdmVyIiwiaGFuZGxlRW50ZXIiLCJoYW5kbGVMZWF2ZSIsIm9iaiIsImNsb3Nlc3QiLCJjb250YWlucyIsImdldEF0dHJpYnV0ZSIsImltZyIsIkltYWdlIiwiZGF0YVRyYW5zZmVyIiwic2V0RHJhZ0ltYWdlIiwic2V0RGF0YSIsImRyb3B6b25lIiwicHJldmVudERlZmF1bHQiLCJnZXREYXRhIiwic3R5bGVzaGVldCIsIlBsYXllciIsImRyYWdkcm9wIiwicmVnaXN0ZXJDbGlja3MiLCJjb25zb2xlIiwibG9nIiwicHJldmlvdXNDaG9pY2VzIiwicm9ib3RBdHRhY2siLCJyYW5kb21BdHRhY2siLCJyYW5kb21QaWNrIiwicmVxdWlyZSIsImhpdHMiLCJkZWFkIiwiaXNFYXRlbiIsInNpemUiLCJkZWNpZGVXb3JtTmFtZSIsIndvcm1OYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==