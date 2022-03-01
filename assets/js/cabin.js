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
		choices: ["Choice 1", "Choice 2", "Choice 3"],
		callback: outsideInitialCallback,
	},
	revisitOutside: {
		text: "You return to the cabin. TODO: Mention time of day or current state or something?",
		choices: ["Choice 1", "Choice 2", "Choice 3"],
		callback: outsideInitialCallback,
	},
};

const dialogueHunter = {
	// Hunter has unique text for visiting the cabin as per script
	firstVisitOutside: {
		text: `Following the path you've treaded so many times before, you find yourself outside your cabin in the woods once again. 
                You can still see signs of zombies nearby, and the window of the cabin is smashed.
                TODO Something about things aren't looking good for the rest of your family`,
		choices: ["Choice 1", "Choice 2", "Choice 3"],
		callback: outsideInitialCallback,
	},
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
	profession = profDoctor;

	// Do stuff
	let hasVisitedCabin = getStorage("hasVisitedCabin");
	if (!hasVisitedCabin) {
		// First time visiting cabin

		// Remember that the user has now visited the cabin
		// TODO: This counts the user as revisiting the cabin if they just refresh the page. I don't know if this is actually an issue, but maybe only set this value when leaving?
		//setStorage("hasVisitedCabin");

		let eventData = getEventData("firstVisitOutside");
		console.log(eventData);
		print(eventData.text);

		setChoices(eventData);
	} else {
		// Already visited cabin
		let eventData = getEventData("revisitOutside");
		print(eventData.text);
	}
}

async function outsideInitialCallback(event) {
	console.log(event.target.name);
}

function getEventData(eventName) {
	let profData;
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

	let eventData = profData[eventName];

	if (eventData) return eventData;
	else return dialogue[eventName];
}

async function setChoices(eventData) {
	// TODO: This can probably be done in a better way
	// TODO: Disable already done actions
	const choiceDiv = getDOM("divChoices");
	choiceDiv.innerHTML = "";

	for (let i = 0; i < eventData.choices.length; i++) {
		let btn = document.createElement("button");
		btn.name = i;
		// TODO Do something with eventData.callback
		btn.innerHTML = eventData.choices[i];
		btn.classList = ["buttonChoice"];
		btn.onclick = choiceCallback;
		choiceDiv.appendChild(btn);
	}
}

async function choiceCallback(event) {
	console.log(event);
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
