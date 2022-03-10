// Create the first audio source (Should always loop)
const audio0 = document.createElement("audio");
audio0.loop = true;
// Create the second audio source (Should always loop)
const audio1 = document.createElement("audio");
audio1.loop = true;
// Keep track of which one is currently being played
let audioTrack = 0;

/**
 * Linear crossfade between the current audio track and the next one
 * @param {string} newSource The location of the new audio source
 */
async function crossfadeAudio(newSource) {
	// The length of the fade, in ms
	const fadeInTime = 2000;
	// The size each step to take should be (0.1 = 10%)
	const fadeInStep = 0.05;

	// Figure which track we're fading in and which we're fading out
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

	// Set output volume to 1 to avoid issues if user clicks too quickly
	audioOut.volume = 1;

	// Fade out the old track on an interval
	let fadeOut = setInterval(function () {
		// Only fade if not at zero already
		if (audioOut.volume > fadeInStep) {
			audioOut.volume -= fadeInStep;
		} else {
			// Stop when volume is near-zero
			clearInterval(fadeOut);
			audioOut.volume = 0;
		}
	}, fadeInTime * fadeInStep);

	audioIn.volume = 0;
	audioIn.src = newSource;
	if (newSource) {
		audioIn.play();

		// If a new source is provided, fade into it on an interval
		let fadeIn = setInterval(function () {
			// Only fade if not at one already
			if (audioIn.volume < 0.999 - fadeInStep) {
				audioIn.volume += fadeInStep;
			} else {
				// Stop when volume is near-one
				clearInterval(fadeIn);
				audioIn.volume = 1;
			}
		}, fadeInTime * fadeInStep);
	}
}
