import grub from './assets/grub.png'
import pupae from './assets/pupae.png'

export const Dragdrop = () => {
    const component = () => {
        const images = document.querySelector('.images')
        let grubImg = document.createElement('img')
        grubImg.classList.add('bug-images')
        grubImg.classList.add('draggable')
        grubImg.setAttribute('draggable', true)
        grubImg.setAttribute('length', 2)
        grubImg.src=grub
        grubImg.alt='image of grub'
        images.appendChild(grubImg)
        //
        let pupaeImg = document.createElement('img')
        pupaeImg.classList.add('bug-images')
        pupaeImg.classList.add('draggable')
        pupaeImg.setAttribute('draggable', true)
        pupaeImg.setAttribute('length', 3)
        pupaeImg.src=pupae
        pupaeImg.alt='image of pupae'
        images.appendChild(pupaeImg)
        // 
        let flatwormImg = document.createElement('img')
        flatwormImg.classList.add('bug-images')
        flatwormImg.classList.add('draggable')
        flatwormImg.setAttribute('draggable', true)
        flatwormImg.setAttribute('length', 4)
        flatwormImg.src=pupae
        flatwormImg.alt='image of flatworm'
        images.appendChild(flatwormImg)
        //
        let earthwormImg = document.createElement('img')
        earthwormImg.classList.add('bug-images')
        earthwormImg.classList.add('draggable')
        earthwormImg.setAttribute('length', 5)
        earthwormImg.setAttribute('draggable', true)

        earthwormImg.src=grub
        earthwormImg.alt='image of flatworm'
        images.appendChild(earthwormImg)
    }

    const addListeners = () => {
        document.body.addEventListener('dragstart', handleDragStart)
        document.body.addEventListener('drop', handleDrop)
        document.body.addEventListener('dragenter', handleOver)
        document.body.addEventListener('dragleave', handleLeave)
    }

    const handleDragStart = (event) => {
        let obj = event.target
        if (!obj.closest('.draggable')) return;
        if (obj.classList.contains('draggable')) {
            obj = obj.getAttribute('length')
        }
        event.dataTransfer.setData('text/plain', obj)
    }

    const handleDrop = (event) => {
        let dropzone = event.target
        if (!dropzone.classList.contains('dropzone')) return;
        event.preventDefault()
        let data = event.dataTransfer.getData('text/plain')
        console.log(data)
        dropzone.classList.remove('over')
    }

    const handleOver = (event) => {
        let dropzone = event.target
        if (!dropzone.classList.contains('dropzone')) return;
        event.preventDefault()
        dropzone.style.backgroundColor = 'red'
    }

    const handleLeave = (event) => {
        let dropzone = event.target
        if (!dropzone.classList.contains('dropzone')) return;
        event.preventDefault()
        dropzone.style.backgroundColor = 'lightgreen'
    }

    return {component, addListeners, handleDragStart, handleDrop}
}
