export const UI = () => {
    const drawBoard = () => {
        for (let i=0; i<10; i++) {
            const newDiv = document.createElement('div')
            const boardFrame = document.querySelector('.board-frame')
            newDiv.classList.add('.board-square')
            for (let j=0; j<10; j++) {
                
            }
        }
    }

    return {drawBoard}
}
