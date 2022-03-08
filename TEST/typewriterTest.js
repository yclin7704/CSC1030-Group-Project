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
	let isInQuotes = false;
	let hasReachedBackslash = false;

	for (let i = 0; i < letters.length; i++) {
		// Wait before printing each letter
		// TODO: HTML tags are skipped over instantly (takes too long otherwise)
		if (!tag) await waitForMs(delay);

		// If the user has gone on to the next event/location, stop displaying this one
		if (eventId != givenEventId) return;

		// If at the start of a tag
		if (letters[i] === "<") {
			tag += letters[i];
			isInTag = true;
		}
		// If in < these > and not also in " these ", then the next > marks the end of the tag
		else if (isInTag && !isInQuotes && letters[i] === "/") {
			tag += letters[i];
			hasReachedBackslash = true;
		}
		// Allow URLs etc containing `/`
		else if (isInTag && letters[i] === '"') {
			tag += letters[i];
			isInQuotes = !isInQuotes;
		}
		// If at the end of the tag
		else if (letters[i] === ">" && hasReachedBackslash) {
			tag += letters[i];

			// Add the tag (TODO: Currently added instantly)
			dialogueBox.innerHTML += tag;

			// Reset variables
			tag = "";
			isInTag = false;
			hasReachedBackslash = false;
		}
		// Any other `>` that is not the end of the tag
		else if (letters[i] === ">" && !hasReachedBackslash) {
			isInTag = false;
			tag += letters[i];
		}
		// Any other character while constructing the tag
		else if (tag) tag += letters[i];
		// Not constructing a tag
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
