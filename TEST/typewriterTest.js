let eventId;

// Will display the textNode text by printing it in a typewriter like fashion
async function typeSentence(sentence, givenEventId, delay = 10) {
	// Clears the HTML so that it doesn't keep adding on to it
	let dialogueBox = document.getElementById("dialogue");
	dialogueBox.innerHTML = "";
	console.log(`Printing ${givenEventId}`);

	eventId = givenEventId;

	// Split the sentence into a char array
	let letters = sentence.split("");

	let tag = "";
	let isInTag = false;
	let hasReachedBackslash = false;

	for (let i = 0; i < letters.length; i++) {
		// Wait before printing each letter
		if (!tag) await waitForMs(delay);

		// If the user has gone on to the next event/location, stop displaying this one
		if (eventId != givenEventId) return;

		if (letters[i] === "<") {
			tag += letters[i];
			isInTag = true;
		} else if (isInTag && letters[i] === "/") {
			tag += letters[i];
			hasReachedBackslash = true;
			console.log("Backslash");
		} else if (letters[i] === ">" && hasReachedBackslash) {
			tag += letters[i];
			dialogueBox.innerHTML += tag;

			// Reset variables
			tag = "";
			isInTag = false;
			hasReachedBackslash = false;
		} else if (letters[i] === ">" && !hasReachedBackslash) {
			isInTag = false;
			tag += letters[i];
		} else if (tag) tag += letters[i];
		else dialogueBox.innerHTML += letters[i];
	}
}

/**
 * Wait for the given number of milliseconds
 * Note: setTimeout has a minimum delay of 4ms, and is inaccurate
 * @param {number} ms The number of milliseconds to wait for
 * @returns {Promise} A promise that will resolve itself after the given time
 */
function waitForMs(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
