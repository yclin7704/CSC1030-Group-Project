/**
 * Main function
 */
async function main() {
	// Do stuff
	let hasVisitedCabin = getStorage("hasVisitedCabin");
	if (!hasVisitedCabin) {
		// First time visiting cabin

		// Remember that the user has now visited the cabin
		setStorage("hasVisitedCabin");

		print("Following the path into the dark woods, you stumble across a lone cabin. Something something sign of struggle");
	} else {
		// Already visited cabin
		print("You return to the cabin. TODO: Mention time of day or something?");
	}
}

function getStorage(key) {
	return window.localStorage.getItem(key);
}

function setStorage(key, value = 1) {
	window.localStorage.setItem(key, value);
}

async function print(text) {
	let dialogueBox = document.getElementById("dialogue");
	dialogueBox.innerHTML = text;
}

// Run the main function
main().catch(console.error);
