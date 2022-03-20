var lamp = document.documentElement;

function enableTorch() {
        lamp.addEventListener('mousemove', e => {
            lamp.style.setProperty('--y', e.clientY + 'px');
            lamp.style.setProperty('--x', e.clientX + 'px');
        })
}

function toggleTorch() {
    var element = document.getElementById('torchId')
    element.classList.toggle('torch');
}
