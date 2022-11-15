const { Worm } = require("../worms.js");

describe('Worm', () => {
    const worm = Worm({length:4})

    test('worm has length', () => {
        expect(worm.length).toBe(4)
    })

    test()
})