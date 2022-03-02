let profession;

const profHunter = "Hunter";
const profMechanic = "Mechanic";
const profDoctor = "Doctor";
const profVeteran = "Veteran";
const profPriest = "Priest";

const dialogue = {
	firstVisitOutside: {
		text: `Following the path deeper into the dark woods, you stumble across a lone cabin. There appears to have been signs of a struggle, 
                and it seems there are still zombies nearby. What happened here?`,
		choices: ["Enter the cabin", "Choice 1", "Choice 2", "Choice 3", "Wait"],
		callback: outsideInitialCallback,
	},
	revisitOutside: {
		text: "You return to the cabin. TODO: Mention time of day or current state or something?",
		choices: ["Enter the cabin", "Choice 1", "Choice 2", "Choice 3", "Wait"],
		callback: outsideInitialCallback,
	},
	firstVisitInside: {
		text: "INSIDE CABIN",
		choices: ["Leave the cabin", "Choice 1", "Choice 2", "Choice 3", "Choice 4", "Choice 5", "Choice 6", "Wait"],
		callback: insideInitialCallback,
	},
	revisitInside: {
		text: "INSIDE CABIN",
		choices: ["Leave the cabin", "Choice 1", "Choice 2", "Choice 3", "Choice 4", "Choice 5", "Choice 6", "Wait"],
		callback: insideInitialCallback,
	},
	insideEvent1: {
		text: "Event 1",
		choices: ["Go back", "Wait"],
		callback: insideInitialCallback,
	},
	firstLeaveCabin: {
		text: "LEAVE CABIN",
		choices: ["Enter the cabin", "Choice 1", "Choice 2", "Choice 3", "Wait"],
		callback: outsideInitialCallback,
	},
};

const dialogueHunter = {
	// Hunter has unique text for visiting the cabin as per script
	firstVisitOutside: {
		text: `Following the path you've treaded so many times before, you find yourself outside your cabin in the woods once again. 
                You can still see signs of zombies nearby, and the window of the cabin is smashed.
                TODO Something about things aren't looking good for the rest of your family`,
		choices: dialogue.firstVisitOutside.choices,
		callback: outsideInitialCallback,
	},
	//firstVisitInside: {},
};

const dialogueMechanic = {};

const dialogueDoctor = {};

const dialogueVeteran = {};

const dialoguePriest = {};

/**
 * Main function
 */
async function main() {
	// profession = getStorage("profession"); TODO: Or wherever we decide to store the player's profession
	// In the meantime,
	profession = profHunter;

	let eventData;
	let hasVisitedCabin = getStorage("hasVisitedCabin");
	if (!hasVisitedCabin) {
		// First time visiting cabin

		eventData = getEventData("firstVisitOutside");
	} else {
		// Already visited cabin
		eventData = getEventData("revisitOutside");
	}
	print(eventData.text);
	setChoices(eventData);
}

async function outsideInitialCallback(event) {
	let index = callbackToIndex(event);

	switch (index) {
		case 0:
			// Enter the cabin
			enterCabin();
			break;
	}
}

async function insideInitialCallback(event) {
	let index = callbackToIndex(event);

	switch (index) {
		case 0:
			// Leave the cabin
			leaveCabin();
			break;
		case 1:
			event1();
			break;
	}
}

async function event1() {
	let eventData = getEventData("insideEvent1");
	print(eventData.text);
	setChoices(eventData);
}

async function enterCabin() {
	let imgLocation = getDOM("imgLocation");
	imgLocation.src = "assets/images/cabin-inside.webp";

	let eventData;

	let hasVisitedCabin = getStorage("hasVisitedCabin");
	if (!hasVisitedCabin) eventData = getEventData("firstVisitInside");
	else eventData = getEventData("revisitInside");

	print(eventData.text);
	setChoices(eventData);
}

async function leaveCabin() {
	let imgLocation = getDOM("imgLocation");
	imgLocation.src = "assets/images/cabin-outside.webp";

	let eventData;

	let hasVisitedCabin = getStorage("hasVisitedCabin");
	if (!hasVisitedCabin) {
		// Remember that the user has now visited the cabin
		// TODO: This counts the user as revisiting the cabin if they just refresh the page. I don't know if this is actually an issue, but maybe only set this value when leaving?
		//setStorage("hasVisitedCabin");
		eventData = getEventData("firstLeaveCabin");
	} else eventData = getEventData("leaveCabin");

	print(eventData.text);
	setChoices(eventData);
}

/**
 * Get data related to the given event, taking the current profession into account
 * @param {string} eventName The name of the event
 * @returns The event's data
 */
function getEventData(eventName) {
	let profData;

	// Get all event data for the current profession
	switch (profession) {
		case profHunter:
			profData = dialogueHunter;
			break;
		case profMechanic:
			profData = dialogueMechanic;
			break;
		case profDoctor:
			profData = dialogueDoctor;
			break;
		case profVeteran:
			profData = dialogueVeteran;
			break;
		case profPriest:
			profData = dialoguePriest;
			break;
	}

	// Try to get data for the given event for the specific profession
	let eventData = profData[eventName];

	// If it exists, return it
	if (eventData) return eventData;
	// Otherwise, fall back to the generic data for the event
	else return dialogue[eventName];
}

async function setChoices(eventData) {
	// TODO: This can probably be done in a better way
	// TODO: Disable already done actions
	const choiceDiv = getDOM("divChoices");
	// Clear previous options
	choiceDiv.innerHTML = "";

	for (let i = 0; i < eventData.choices.length; i++) {
		let btn = document.createElement("button");
		btn.name = i;
		btn.innerHTML = eventData.choices[i];
		btn.classList = ["buttonChoice"];
		btn.onclick = eventData.callback;
		choiceDiv.appendChild(btn);
	}
}

function callbackToIndex(event) {
	return parseInt(event.target.name);
}

/**
 * Get the value stored under the given key in localStorage
 * @param {string} key The key to search for
 * @returns The value, if found
 */
function getStorage(key) {
	return window.localStorage.getItem(key);
}

/**
 * Store the given value under the given key in localStorage
 * @param {string} key The key to store the data under
 * @param {*} value The value to be stored
 */
function setStorage(key, value = 1) {
	window.localStorage.setItem(key, value);
}

/**
 * Display the given dialogue to the user
 * @param {string} text The text to display
 */
async function print(text) {
	let dialogueBox = getDOM("dialogue");
	dialogueBox.innerHTML = text;
}

/**
 * Get the element from the page with the given ID
 * @param {string} id The ID of the element to be fetched
 * @returns The element, if found
 */
function getDOM(id) {
	return document.getElementById(id);
}

// Run the main function
main().catch(console.error);
