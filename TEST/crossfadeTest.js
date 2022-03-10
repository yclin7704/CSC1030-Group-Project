const audio0 = document.createElement("audio");
audio0.loop = true;
const audio1 = document.createElement("audio");
audio1.loop = true;
let audioTrack = 0;

const wind = "../assets/sounds/wind.wav";
const rain = "Rain_Light.wav";

async function fadeAudio(newSource) {
	console.log(newSource);
	if (!newSource) return;

	let audioIn;
	let audioOut;

	if (audioTrack === 0) {
		audioIn = audio0;
		audioOut = audio1;
		audioTrack = 1;
	} else {
		audioIn = audio1;
		audioOut = audio0;
		audioTrack = 0;
	}

	audioOut.volume = 1;
	audioIn.volume = 0;
	audioIn.src = newSource;
	audioIn.play();

	let fadeIn = setInterval(function () {
		// Only fade if not at zero already
		if (audioIn.volume < 0.9) {
			audioIn.volume += 0.1;
		}
		// When volume at zero stop
		if (audioIn.volume > 0.9) {
			clearInterval(fadeIn);
			audioIn.volume = 1;
		}
	}, 200);

	let fadeOut = setInterval(function () {
		// Only fade if not at zero already
		if (audioOut.volume > 0.1) {
			audioOut.volume -= 0.1;
		}
		// When volume at zero stop
		if (audioOut.volume < 0.1) {
			clearInterval(fadeOut);
			audioOut.volume = 0;
			audioOut.pause();
		}
	}, 200);
}

async function onClick() {
	console.log(audioTrack);
	if (audioTrack === 0) fadeAudio(wind);
	else fadeAudio(rain);
}

audio0.src = rain;
audio0.play();

fadeAudio(wind);

document.getElementById("btn").onclick = onClick;
