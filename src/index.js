import {UI} from './UI.js'
import stylesheet from './styles.css'
import {Dragdrop} from './dragdrop.js'

const ui = UI()
const dragdrop = Dragdrop()
ui.generateTable('#player-board', 'human')
ui.generateTable('#robot-board', 'robot')
ui.registerHovers()
ui.registerClicks()
dragdrop.component()
dragdrop.addListeners()

let wormsPlaced = false
ui.gameStart(wormsPlaced)
