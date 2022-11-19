import { UI } from "./UI.js";
import stylesheet from "./styles.css";
import { Dragdrop } from "./dragdrop.js";
import { Board } from "./boards";
import {Player} from'./player'

const ui = UI();
const dragdrop = Dragdrop();
UI()
Dragdrop()
Board()
Player()
ui.generateTable("#player-board", "human");
ui.generateTable("#robot-board", "robot");
ui.registerHovers();
ui.registerClicks();
dragdrop.component();
dragdrop.addListeners();


ui.gameStart(false);

