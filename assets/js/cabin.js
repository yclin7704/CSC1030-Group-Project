let gameState = {
	// TODO: Get profession properly with sessionStorage.getItem("profession");
	profession: profDoctor,
};
sessionStorage.setItem("profession", "Hunter");

/**
 * Main function
 */
async function main() {
	// TODO: Inventory
	// TODO: Returning to cabin
	// TODO: Save game state to sesion storage on leaving cabin

	StartTimer();

	setTemperatureData(runEvent, tempTooLow, tempTooHigh);

	checkIfDead();

	if (gameState.isDead) runEvent("alreadyDead");
	else runEvent("firstVisitOutside");
}

function checkIfDead() {
	changeTemp(0);
	if (gameState.tempTooHigh || gameState.tempTooLow) gameState.isDead = true;
}

/**
 * Run the event with the given ID
 * @param {string} eventId The event ID
 */
async function runEvent(eventId) {
	if (typeof eventId === "function") eventId();
	else if (eventId) {
		if (eventId.optsId === "gameOver") stopTimer();

		let eventData = getEventData(eventId);
		// Update the game's state, if needed
		updateGameState(eventData.stateChanges);
		// Display the event text
		print(eventData.text, eventId);
		// Update the setting image
		setImg(eventData.img);
		// Crossfade audio
		// DEBUG: Re-enable audio
		//crossfadeAudio(eventData.audio);
		// Show the user's options
		setChoices(eventData.optsId);
		// Change temperature
		changeTemp(eventData.tempChange);
	}
}

/**
 *
 * @param {string} eventId The event ID
 * @returns The event data, partially overriden by the profession event data if applicable
 */
function getEventData(eventId) {
	// Get the matching base event data
	let eventData = events.find((event) => event.id === eventId);
	// Get the matching profession event data, if it exists
	let profEventData = getProfEventData().find((event) => event.id === eventId);

	// If the profession data doesn't exist, then you can just return the base data
	if (profEventData === undefined) return eventData;
	else {
		let data = {};

		for (let key in eventData) {
			data[key] = eventData[key];
		}

		// Override the base data with any existing profession event data
		for (let key in profEventData) {
			data[key] = profEventData[key];
		}

		// Return the result
		return data;
	}
}

/**
 * Get the override event data for the current profession
 * @returns The event data for the current profession
 */
function getProfEventData() {
	switch (gameState.profession) {
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

/**
 * Update the game state with the given changes
 * @param {JSON} changes Changes to be made
 */
function updateGameState(changes) {
	for (let key in changes) {
		gameState[key] = changes[key];
	}
}

/**
 * Display the options from the given set
 * @param {string} optsId The ID of the set of options to display
 */
async function setChoices(optsId) {
	const choiceDiv = getDOM("divChoices");
	// Clear previous options
	choiceDiv.innerHTML = "";

	let opts = getOptsById(optsId);

	for (let i = 0; i < opts.choices.length; i++) {
		let opt = opts.choices[i];
		let btn = document.createElement("button");

		let requirementsMet = areReqsMet(opt.requiredState);
		let isHidden = !requirementsMet && opt.disableMode === "hidden";

		btn.disabled = !requirementsMet;
		btn.classList = ["buttonChoice"];

		if (typeof opt.desc === "string") btn.innerHTML = opt.desc;
		else if (typeof opt.desc === "function") btn.innerHTML = opt.desc();

		btn.addEventListener("click", () => selectOption(opt));

		if (!isHidden) choiceDiv.appendChild(btn);
	}
}

function getOptsById(optsId) {
	return eventOpts.find((opts) => opts.id === optsId);
}

/**
 * Called when the user picks an option by clicking on the corresponding button
 * @param {JSON} opt The chosen option's data
 */
async function selectOption(opt) {
	if (!gameState.isDead) {
		if (gameState.tempTooLow || gameState.tempTooHigh) gameState.isDead = true;
		if (gameState.tempTooLow) opt = getOptsById("tempTooLowCall").choices[0];
		else if (gameState.tempTooHigh) opt = getOptsById("tempTooHighCall").choices[0];
	}

	// Update game state if needed
	updateGameState(opt.stateChanges);
	// Change temperature
	changeTemp(opt.tempChange);

	// Continue to the next event
	let nextEventId = opt.nextEventId;

	runEvent(nextEventId);
}

/**
 * Check if all the given requirements are met
 * @todo Any way of doing (A OR B)?
 * @param {JSON} reqs The requirements to check
 * @returns True if all requirements are met, false if not
 */
function areReqsMet(reqs) {
	// Assume all requirements are met by default
	let allMet = true;
	// Iterate through the requirements
	for (let key in reqs) {
		// If all previous requirements were met, and
		// (the current requirement is explicitly met OR the value is supposed to be false and has not yet been defined in gameState)
		allMet = allMet && (reqs[key] === gameState[key] || (!reqs[key] && !gameState[key]));
	}
	return allMet;
}

/**
 * Display the given dialogue to the user
 * @todo Some fancy ttyping effect maybe?
 * @param {string} text The text to display
 */
async function print(text) {
	let dialogue;
	if (typeof text === "string") dialogue = text;
	else if (typeof text === "function") dialogue = text();
	// TODO: Decrease speed slightly?
	typeSentence(dialogue, "dialogue", 15);
}

/**
 * Sets the location image
 * @param {string} src The location of the image file
 */
async function setImg(src) {
	if (!src) return;
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

async function tempTooLow() {
	gameState.tempTooLow = true;
	// TODO: Add extra text to end of current text
}

async function tempTooHigh() {
	gameState.tempTooHigh = true;
}

// Run the main function
main().catch(console.error);
