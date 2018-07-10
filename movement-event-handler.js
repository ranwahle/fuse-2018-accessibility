(function() {
    const movement = 20
    window.addEventListener('moveUp', () => window.scroll(window.scrollX, window.scrollY - movement))
    window.addEventListener('moveDown', () => window.scroll(window.scrollX, window.scrollY + movement))
    window.addEventListener('moveLeft', () => window.scroll(window.scrollX - movement, window.scrollY))
    window.addEventListener('moveRight', () => window.scroll(window.scrollX + movement, window.scrollY))

}())