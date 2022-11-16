const { Worm } = require("../worms.js")
const { Board } = require("../boards.js")

describe('Board', () => {
    const board = Board()

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

    test('When valid horizontal worm [12, 13, 14, 15] proposed, board returns an object', () => {
        expect(board.placeWorms([12, 13, 14, 15], 'horizontal')).toBeDefined()
    })
})