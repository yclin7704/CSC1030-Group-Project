let profession;

const profHunter = "Hunter";
const profMechanic = "Mechanic";
const profDoctor = "Doctor";
const profVeteran = "Veteran";
const profPriest = "Priest";

let gameState = {};

const imgOutside = "assets/images/cabin-outside.webp";
const imgInside = "assets/images/cabin-inside.webp";

const eventOpts = [
	{
		id: "outside",
		choices: [
			{
				desc: "Enter the cabin",
				stateChange: {},
				requiredState: {},
				nextEvent: "outside",
			},
		],
	},
];

const events = [
	{
		id: "firstVisitOutside",
		text: `Following the path you've treaded so many times before, you find yourself outside your cabin in the woods once again. 
                You can still see signs of zombies nearby, and the window of the cabin is smashed.
                TODO Something about things aren't looking good for the rest of your family`,
		img: imgOutside,
		optsId: "outside",
	},
];

/**
 * Main function
 */
async function main() {
	runEvent("firstVisitOutside");
}

async function runEvent(eventId) {
	let eventData = events.find((event) => event.id === eventId);
	print(eventData.text);
	setImg(eventData.img);
	setChoices(eventData.optsId);
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
		btn.disabled = !areReqsMet(opt.requiredState);

		btn.classList = ["buttonChoice"];

		btn.addEventListener("click", () => selectOption(opt));
		choiceDiv.appendChild(btn);
	}
}

function selectOption(opt) {
	console.log(opt);
}

function areReqsMet(reqs) {
	let allMet = true;
	for (let key in reqs) {
		allMet = allMet && reqs[key] === gameState[key];
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
