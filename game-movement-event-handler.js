(function () {
    const movement = 20
    const positions = {
        left: 'left',
        right: 'right',
        up: 'up',
        down: 'down'
    }
    let prevPos = ''
    window.addEventListener('facePosition', (evt) => {
        switch (evt.detail.position) {
            
            case positions.down: {
                
                // if (prevPos !== positions.down) {
                    console.log('down')
                    movedown()
                    prevPos = positions.down;
                // }
                break;
            }
            case positions.up: {
                
                // if (prevPos !== positions.up) {
                    console.log('up')
                    moveup()
                    prevPos = positions.up;
                // }
                break;
            }
            case positions.left: {
                
                // if (prevPos !== positions.left) {
                    console.log('left')
                    moveleft()
                    prevPos = positions.left;
                // }
                break;
            }
            case positions.right: {
                
                // if (prevPos !== positions.right) {
                    console.log('right')
                    moveright()
                    prevPos = positions.right;
                // }
                break;
            }
            default: {
                clearmove()
                console.log('stop')
                break;
            }

        }
    })


}())