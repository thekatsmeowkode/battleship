import {UI} from './UI.js'
import stylesheet from './styles.css'
//must add import statement for image files

const ui = UI()
ui.generateTable('#player-board', 'human')
ui.generateTable('#robot-board', 'robot')
ui.registerHovers()
ui.registerClicks()

