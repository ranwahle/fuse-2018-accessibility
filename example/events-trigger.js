document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnMoveUp').onclick = () => {
        window.dispatchEvent(new CustomEvent('moveUp'))
    }
    document.getElementById('btnMoveDown').onclick = () => {
        window.dispatchEvent(new CustomEvent('moveDown'))
    }
    document.getElementById('btnMoveLeft').onclick = () => {
        window.dispatchEvent(new CustomEvent('moveLeft'))
    }
    document.getElementById('btnMoveRight').onclick = () => {
        window.dispatchEvent(new CustomEvent('moveRight'))
    }
})