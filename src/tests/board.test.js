const { Worm } = require("../worms.js")
const { Board } = require("../boards.js")

describe('Board', () => {
    const board = Board()
    const testWorm = Worm(4, ['00', '01', '02', '03'], 'horizontal')
    const testWorm2 = Worm(2, ["74", "75"], 'horizontal')
    board.holdWorms(testWorm)
    board.holdWorms(testWorm2)
    board.receiveAttack("74")
    board.receiveAttack("99")

    test('Board creation function exists', () => {
        expect(board.createBoard()).toBeDefined()
    })

    test('Board array contains 100 values', () => {
        expect(board.createBoard().length).toEqual(100)
    })

    test('Board returns null value if coords provided are [07, 08, 09, 010] when horizontal worm proposed', () => {
        expect(board.placeWorms(['07', '08', '09', '010'], "horizontal")).toBeNull()
    })

    test('When vertical worm proposed, board returns null value if coords provided are [70, 80, 90, 100]', () => {
        expect(board.placeWorms([70, 80, 90, 100], 'vertical')).toBeNull()
    })

    test('Test worm exists', () => {
        expect(testWorm).toBeDefined()
    })

    // test('receiveAttack returns true when coordinates passed into function matches a coordinate that contains a worm', () => {
    //     expect(board.receiveAttack('03')).toBeTruthy()
    // })

    // test('receiveAttack returns false when coordinates passed into function does not match a coordinate that contains a worm', () => {
    //     expect(board.receiveAttack('62')).toBe(false)
    // })

    test('when 2 worms created, the wormsOnBoard contains 2 items', () => {
        expect(board.wormsOnBoard.length).toBe(2)
    })

    test('holdWorms works', () => {
        expect(board.wormsOnBoard[1]).toBeDefined()
    })

    test('view contents of wormsOnBoard', () => {
        expect(board.wormsOnBoard[1].hits).toEqual(["74"])
    })

    test('missed shot is logged by recordMiss', () => {
        expect(board.missedShots).toEqual(["99"])
    })
})