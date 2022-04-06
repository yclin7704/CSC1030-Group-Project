let lamp = document.documentElement;
let isTorchOn = false;

function enableTorch() {
	lamp.addEventListener("mousemove", (e) => {
		lamp.style.setProperty("--y", e.clientY + "px");
		lamp.style.setProperty("--x", e.clientX + "px");
	});
}

function setTorch(value) {
	isTorchOn = value;
	var element = document.getElementById("torchId");
	if (value) element.classList.add("torch");
	else element.classList.remove("torch");
}

function getIsTorchOn() {
	return isTorchOn;
}
