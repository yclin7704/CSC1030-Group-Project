let profession;

const profHunter = "Hunter";
const profMechanic = "Mechanic";
const profDoctor = "Doctor";
const profVeteran = "Veteran";
const profPriest = "Priest";

let gameState = {};

/**
 * Main function
 */
async function main() {
	// TODO: Inventory
	// TODO: Returning to cabin
	// TODO: Actually test any of this code

	// TODO: Get profession properly
	profession = profMechanic;

	runEvent("firstVisitOutside");
}

async function runEvent(eventId) {
	let eventData = getEventData(eventId);
	updateGameState(eventData.stateChanges);
	print(eventData.text);
	setImg(eventData.img);
	setChoices(eventData.optsId);
}

function getEventData(eventId) {
	let eventData = events.find((event) => event.id === eventId);
	let profEventData = getProfEventData().find((event) => event.id === eventId);

	if (profEventData === undefined) return eventData;
	else {
		let data = {};

		for (let key in eventData) {
			data[key] = eventData[key];
		}

		for (let key in profEventData) {
			data[key] = profEventData[key];
		}

		return data;
	}
}

function getProfEventData() {
	switch (profession) {
		case profHunter:
			return eventsHunter;
		case profMechanic:
			return eventsMechanic;
		case profDoctor:
			return eventsDoctor;
		case profVeteran:
			return eventsVeteran;
		case profPriest:
			return eventsPriest;
	}
}

function updateGameState(changes) {
	for (let key in changes) {
		gameState[key] = changes[key];
	}
}

async function setChoices(optsId) {
	const choiceDiv = getDOM("divChoices");
	// Clear previous options
	choiceDiv.innerHTML = "";

	let opts = eventOpts.find((opts) => opts.id === optsId);

	for (let i = 0; i < opts.choices.length; i++) {
		let opt = opts.choices[i];
		let btn = document.createElement("button");

		btn.innerHTML = opt.desc;
		// TODO: Disable button, or hide it? Or both - option decides
		btn.disabled = !areReqsMet(opt.requiredState);

		btn.classList = ["buttonChoice"];

		btn.addEventListener("click", () => selectOption(opt));
		choiceDiv.appendChild(btn);
	}
}

async function selectOption(opt) {
	updateGameState(opt.stateChanges);
	let nextEventId = opt.nextEventId;
	runEvent(nextEventId);
}

function areReqsMet(reqs) {
	let allMet = true;
	for (let key in reqs) {
		allMet = allMet && (reqs[key] === gameState[key] || (!reqs[key] && !gameState[key]));
	}
	return allMet;
}

/**
 * Display the given dialogue to the user
 * @param {string} text The text to display
 */
async function print(text) {
	let dialogueBox = getDOM("dialogue");
	dialogueBox.innerHTML = text;
}

async function setImg(src) {
	getDOM("imgLocation").src = src;
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
