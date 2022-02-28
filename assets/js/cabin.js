let profession;

const hunter = "Hunter";
const mechanic = "Mechanic";
const doctor = "Doctor";
const veteran = "Veteran";
const priest = "Priest";

/**
 * Main function
 */
async function main() {
	// profession = getStorage("profession"); TODO: Or wherever we decide to store the player's profession
	// In the meantime,
	profession = "Hunter";

	// Do stuff
	let hasVisitedCabin = getStorage("hasVisitedCabin");
	if (!hasVisitedCabin) {
		// First time visiting cabin

		// Remember that the user has now visited the cabin
		//setStorage("hasVisitedCabin");

		// Hunter has unique text for visiting the cabin as per script
		// TODO: Some better way of doing this?
		if (profession === "Hunter")
			print(
				`Following the path you've treaded so many times before, you find yourself outside your cabin in the woods once again. 
                You can still see signs of zombies nearby, and the window of the cabin is smashed.
                TODO Something about things aren't looking good for the rest of your family`
			);
		else
			print(
				`Following the path into the dark woods, you stumble across a lone cabin. There appears to have been signs of a struggle,
                and it seems there are still zombies nearby. What happened here?`
			);

		setChoices(["Choice 1", "Choice 2", "Choice 3"]);
	} else {
		// Already visited cabin
		print("You return to the cabin. TODO: Mention time of day or current state or something?");
	}
}

async function setChoices(choices) {
	// TODO: This can probably be done in a better way
	const choiceDiv = getDOM("divChoices");
	choiceDiv.innerHTML = "";
	for (let i = 0; i < choices.length; i++) {
		let btn = document.createElement("button");
		btn.name = i;
		btn.innerHTML = choices[i];
		btn.classList = ["buttonChoice"];
		btn.onclick = choiceCallback;
		choiceDiv.appendChild(btn);
	}
}

async function choiceCallback(event) {
	console.log(event.target.name);
}

function getStorage(key) {
	return window.localStorage.getItem(key);
}

function setStorage(key, value = 1) {
	window.localStorage.setItem(key, value);
}

async function print(text) {
	let dialogueBox = getDOM("dialogue");
	dialogueBox.innerHTML = text;
}

function getDOM(id) {
	return document.getElementById(id);
}

// Run the main function
main().catch(console.error);
