let torchOn = true;

function moveTorch() {
    if (torchOn) {
        var pos = document.documentElement;
        pos.addEventListener('mousemove', e => {pos.style.setProperty('--x',e.clientX + 'px')
        pos.style.setProperty('--y', e.clientY + 'px')});
    }
}

function disableTorch() {
    torchOn = false;
}

function enableTorch() {
    torchOn = true;
}