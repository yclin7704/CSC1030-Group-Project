let torchOn = true;
let torch = document.getElementById('torch');
let pos = document.documentElement;

function torch() {
    pos.addEventListener('mousemove', e => {pos.style.setProperty('--x',e.clientX + 'px')
    pos.style.setProperty('--y', e.clientY + 'px')});

}

function disableTorch() {
    torchOn = false;
}

function enableTorch() {
    torchOn = true;
}