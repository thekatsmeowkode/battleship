const { Worm } = require("../worms.js");

describe('Worm', () => {
    const worm = Worm(4)

    test('worm has length', () => {
        expect(worm.length).toBe(4)
    })
    
    test('worm has hits set', () => {
        expect(worm.hits).toBeDefined()
    })

    // test('worm registers isEaten when eaten', () => {
    //     expect(worm.isEaten).toBeTruthy()
    // })

    test('when worm length is 4, name flatworm is returned', () => {
        expect(worm.decideWormName(4)).toBe('flatworm')
    })
})