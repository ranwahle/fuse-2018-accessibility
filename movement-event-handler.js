(function () {
    const movement = 20
    const positions = {
        left: 'left',
        right: 'right',
        up: 'up',
        down: 'down'
    }
    window.addEventListener('facePosition', (evt) => {
        switch (evt.detail) {
            case positions.down: {
                window.scroll(window.scrollX, window.scrollY + movement)
                break;
            }
            case positions.up: {
                window.scroll(window.scrollX, window.scrollY - movement)
                break;
            }
            case positions.left: {
                window.scroll(window.scrollX - movement, window.scrollY)
                break;
            }
            case positions.right: {
                window.scroll(window.scrollX + movement, window.scrollY)
                break;
            }

        }
        window.scroll(window.scrollX, window.scrollY - movement)
    })


}())