import { UI } from "./UI.js";
import stylesheet from "./styles.css";
import { Dragdrop } from "./dragdrop.js";
import { Board } from "./boards";
import { Player } from "./player";
import { Worm } from "./worms";

export const ui = UI();
export const dragdrop = Dragdrop();
export let player = Player();
export let board = Board();
export let worm = Worm();
ui.generateTable("#player-board", "human");
ui.generateTable("#robot-board", "robot");
ui.registerHovers();
dragdrop.component();
dragdrop.addListeners();

function registerClicks() {
  document.querySelectorAll(".human").forEach((square) =>
    square.addEventListener("click", (event) => {
      let target = event.target;
      board.receiveAttack(target.id, "human");
      console.log(target.id);
    })
  );
}
registerClicks();

ui.gameStart(false);
