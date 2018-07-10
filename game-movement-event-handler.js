(function () {
    const movement = 20
    const positions = {
        left: 'left',
        right: 'right',
        up: 'up',
        down: 'down'
    }
    window.addEventListener('facePosition', (evt) => {
        switch (evt.detail.position) {
            case positions.down: {
                console.log('down')
                movedown()
                break;
            }
            case positions.up: {
                console.log('up')
                moveup()
                break;
            }
            case positions.left: {
                console.log('left')
                moveleft()
                break;
            }
            case positions.right: {
                console.log('right')
                moveright()
                break;
            }

        }
    })


}())