import { UI } from "./UI.js";
import stylesheet from "./styles.css";
import { Dragdrop } from "./dragdrop.js";
import { Board } from "./boards";
import {Player} from'./player'

export let board = Board()
export const ui = UI();
export const dragdrop = Dragdrop();
export let player = Player()
// UI()
// Dragdrop()
// Player()
ui.generateTable("#player-board", "human");
ui.generateTable("#robot-board", "robot");
ui.registerHovers()
dragdrop.component();
dragdrop.addListeners();

function registerClicks() {
    document.querySelectorAll('.human').forEach(square => 
        square.addEventListener("click", (event) => {
        let target = event.target;
        board.turnChecker(target.id)
      }))
    }
registerClicks()



ui.gameStart(false);

