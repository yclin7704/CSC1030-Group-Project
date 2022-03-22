var torch = document.documentElement;

function enableTorch() {
        torch.addEventListener('mousemove', e => {
            torch.style.setProperty('--y', e.clientY + 'px');
            torch.style.setProperty('--x', e.clientX + 'px');
        })
}

function toggleTorch() {
    var element = document.getElementById('torchId')
    element.classList.toggle('torch');
}
