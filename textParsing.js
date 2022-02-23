/**
 * Main function
 */
async function main() {
	get("textEntry").onkeydown = textEntryKeyDown;
	get("submit").onclick = btnSubmitClicked;
}

/**
 * Called whenever text is entered into the text entry box.
 * Used to monitor for the enter key being pressed.
 * @param {KeyboardEvent} event
 */
async function textEntryKeyDown(event) {
	if (event.key === "Enter") {
		textEntered();
	}
}

/**
 * Called whenever the user clicks the "Submit" button to indicate they have finished entering text.
 */
async function btnSubmitClicked() {
	textEntered();
}

async function textEntered() {
	let inputBox = get("textEntry");
	// Get the user's input
	let input = inputBox.value;

	// If the user has entered something
	if (input.length > 0) {
		// Clear the text entry box
		//inputBox.value = "";

		// Create the pattern to match against
		const pattern = [["turn", "switch"], "light", "on"];
		let match = await isMatch(pattern, input);

		// Log the result
		get("output").innerHTML += `Text matches: ${match}<br />`;
	}
}

/**
 * Match the given text against the given pattern
 * @param {Array} pattern The pattern to match against. ["string"] means the text must contain "string",
 * while [ ["string", "rope"] ] means the text must contain "string" or "rope" (Or both)
 * @param {string} textIn The text to check
 * @returns {boolean} true if a match, false if not.
 */
async function isMatch(pattern, textIn) {
	// Assume it matches by default
	let doesMatch = true;

	// Split into seperate words
	let textArr = textIn.toLowerCase().split(" ");

	// Iterate through each item in the pattern
	for (let i = 0; i < pattern.length; i++) {
		if (Array.isArray(pattern[i])) {
			// Contains any of the items in this sub-pattern
			let containsAnyOf = false;
			for (let j = 0; j < pattern[i].length; j++) {
				containsAnyOf = containsAnyOf || textArr.includes(pattern[i][j]);
			}
			doesMatch = doesMatch && containsAnyOf;
		} else {
			// Must contain the item in the pattern
			doesMatch = doesMatch && textArr.includes(pattern[i]);
		}
	}

	// Return the result
	return doesMatch;
}

/**
 * Tries to fetch the doccument element with the given ID
 * @param {string} id The ID of the element to be fetched
 * @returns The element, if found
 */
function get(id) {
	return document.getElementById(id);
}

// Run the main function
main().catch(console.error);
