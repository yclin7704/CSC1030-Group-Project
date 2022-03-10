// Create the first audio source (Should always loop)
const audio0 = document.createElement("audio");
audio0.loop = true;
// Create the second audio source (Should always loop)
const audio1 = document.createElement("audio");
audio1.loop = true;
// Keep track of which one is currently being played
let audioTrack = 0;

const wind = "../assets/sounds/wind.wav";
const rain = "Rain_Light.wav";

/**
 * Crossfade between the current audio track and the next one
 * @param {string} newSource The location of the new audio source
 */
async function fadeAudio(newSource) {
	const fadeInTime = 2000;
	const fadeInStep = 0.1;

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

	if (newSource) {
		audioIn.volume = 0;
		audioIn.src = newSource;
		audioIn.play();

		let fadeIn = setInterval(function () {
			// Only fade if not at zero already
			if (audioIn.volume < 0.999 - fadeInStep) {
				audioIn.volume += fadeInStep;
			} else {
				// When volume at 1 stop
				clearInterval(fadeIn);
				audioIn.volume = 1;
			}
		}, fadeInTime * fadeInStep);
	}

	let fadeOut = setInterval(function () {
		// Only fade if not at zero already
		if (audioOut.volume > fadeInStep) {
			audioOut.volume -= fadeInStep;
		} else {
			// When volume at zero stop
			clearInterval(fadeOut);
			audioOut.volume = 0;
		}
	}, fadeInTime * fadeInStep);
}

async function onClick() {
	console.log(audioTrack);
	if (audioTrack === 0) fadeAudio(wind);
	else fadeAudio(rain);
}

fadeAudio(wind);

document.getElementById("btn").onclick = onClick;
