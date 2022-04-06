let gameState = getGameState();
sessionStorage.setItem("profession", "Hunter");

/**
 * Main function
 */
async function main() {
	StartTimer();

	setTemperatureData(runEvent, tempTooLow, tempTooHigh);
	setTimerData(runEvent, "onDayEnd", "onNightEnd");

	checkIfDead();

	showInventory();

	displayPlayerName();

	// On first visit
	if (!gameState.eventId) gameState.eventId = "firstVisitOutside";
	else if (gameState.leftLocation) {
		gameState.leftLocation = false;
		gameState.eventId = "returnToCabin";
	}

	if (gameState.isDead) runEvent("alreadyDead");
	else runEvent(gameState.eventId);
}

function checkIfDead() {
	changeTemp(0);
	if (gameState.tempTooHigh || gameState.tempTooLow || isTimeOut()) gameState.isDead = true;
}

function getGameState() {
	let savedData = sessionStorage.getItem("cabinGameState");
	if (savedData) return JSON.parse(savedData);
	else
		return {
			// TODO: Get profession properly with sessionStorage.getItem("profession");
			profession: profHunter,
		};
}

function displayPlayerName() {
	document.getElementById("playerSpan").innerHTML = sessionStorage.getItem("playerName") + "<br>";
}

/**
 * Run the event with the given ID
 * @param {string} eventId The event ID
 */
async function runEvent(eventId) {
	// Allow the player to return to the warehouse
	if (eventId === "warehouse") {
		gameState.leftLocation = true;
		// Save the current game state to session storage
		sessionStorage.setItem("cabinGameState", JSON.stringify(gameState));

		window.location.href = "Warehouse.html";
		return;
	}

	// Keep track of the current event ID
	gameState.eventId = eventId;

	// Save the current game state to session storage
	sessionStorage.setItem("cabinGameState", JSON.stringify(gameState));

	if (typeof eventId === "function") eventId();
	else if (eventId) {
		let eventData = getEventData(eventId);

		if (eventData.optsId === "gameOver") stopTimer();
		if (eventId === "tempTooLow" && getTemp() > -22) {
			setTemp(-22);
			gameState.isDead = true;
		} else if (eventId === "tempTooHigh" && getTemp() < 41) {
			setTemp(41);
			gameState.isDead = true;
		}

		// Update the game's state, if needed
		updateGameState(eventData.stateChanges);
		// Display the event text
		print(eventData.text);
		// Update the setting image
		setImg(eventData.img);
		// Crossfade audio
		// DEBUG: Re-enable audio
		//crossfadeAudio(eventData.audio);
		// Update the player's inventory
		updateInventory(eventData.setInventory);
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

		let requirementsMet = areReqsMet(opt.requiredState) && meetsInventoryRequirements(opt.requiredInventory);
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
	// Update the player's inventory
	updateInventory(opt.setInventory);
	// Play the sound associated with the given choice
	playSound(opt.sound);

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
	typeSentence(dialogue, "dialogue");
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
}

async function tempTooHigh() {
	gameState.tempTooHigh = true;
}

// Run the main function
main().catch(console.error);
