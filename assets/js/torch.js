var lamp = document.documentElement;
var torchOn = true;

function torch() {
    if (torchOn) {
        lamp.addEventListener('mousemove', e => {
            lamp.style.setProperty('--y', e.clientY + 'px');
            lamp.style.setProperty('--x', e.clientX + 'px');
        })
    }
}

function disableTorch() {
    torchOn = false;
}
