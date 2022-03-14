const imgOutside = "assets/images/cabin-outside.webp";
const imgInside = "assets/images/cabin-inside.webp";
const imgHatch = "assets/images/cabin-trapdoor.jpg";

const gifDied = "assets/images/You-Died_TEST-GIF.gif";

const audioWind = "assets/sounds/wind.wav";
const audioRain = "assets/sounds/rain_2.wav";

const profHunter = "Hunter";
const profMechanic = "Mechanic";
const profDoctor = "Doctor";
const profVeteran = "Veteran";
const profPriest = "Priest";

// TODO: Add ways to survive/die
// TODO: Only event OR choice should be able to update game state (Or should most of the time, anyway). Which?
const eventOpts = [
	{
		id: "outside",
		choices: [
			{
				desc: "Enter the cabin",
				requiredState: { hasBeenInsideCabin: false },
				stateChanges: { hasBeenInsideCabin: true },
				nextEventId: "initialInsideCabin",
				disableMode: "hidden",
			},
			{
				desc: "Enter the cabin",
				requiredState: { hasBeenInsideCabin: true },
				nextEventId: "insideCabin",
				disableMode: "hidden",
			},
			{
				desc: "Search for firewood",
				requiredState: { hasVisitedFirewood: false },
				stateChanges: { hasVisitedFirewood: true },
				nextEventId: "searchForFirewood",
				disableMode: "hidden",
			},
			{
				desc: "Return the the pile of firewood",
				requiredState: { hasVisitedFirewood: true },
				nextEventId: "visitFirewood",
				disableMode: "hidden",
			},
			{
				desc: "Venture deeper into the forest",
				nextEventId: "visitForestInitial",
				tempChange: -40,
			},
			{
				desc: "Open your map",
			},
			{
				desc: "DEBUG: Increase temp",
				tempChange: "increase",
			},
			{
				desc: "DEBUG: Decrease temp",
				tempChange: "decrease",
			},
		],
	},

	// BEGIN: Firewood
	{
		id: "atFirewood",
		choices: [
			{
				desc: "Ignore the firewood for now and return to the entrance to the cabin",
				nextEventId: "leaveLogs",
			},
			{
				desc: "Take some of the logs",
				requiredState: { hasLargeFirewood: false },
				stateChanges: { hasLargeFirewood: true },
				nextEventId: "takeLargeFirewood",
				disableMode: "hidden",
			},
			{
				desc: "Make some smaller kindling out of the logs using your saw",
				requiredState: { hasSaw: true /* That variable may need renamed */, hasKindling: false },
				// TODO: Inventory?
				stateChanges: { hasKindling: true },
				nextEventId: "makeKindling",
			},
			{
				desc: "Venture out into the woods and see what you can find",
				nextEventId: "visitForestInitial",
				tempChange: -40,
			},
		],
	},
	{
		id: "takingLargeFirewood",
		choices: [
			{
				desc: "Return to the entrance to the cabin with your blocks of firewood",
				nextEventId: "leaveLogs",
			},
		],
	},
	{
		id: "makingKindling",
		choices: [
			{
				desc: "Return to the entrance to the cabin with your kindling",
				nextEventId: "leaveLogs",
			},
			{
				desc: "Return the the entrance to the cabin and take some larger blocks of firewood too",
				nextEventId: "leaveLogs",
				requiredState: { hasLargeFirewood: false },
				stateChanges: { hasLargeFirewood: true },
			},
		],
	},
	// END: Firewood

	// BEGIN: Inside
	{
		id: "inside",
		choices: [
			{
				desc: "Leave the cabin",
				nextEventId: "leaveCabin",
			},
			{
				desc: "Begin searching the cabin",
				nextEventId: "searchingCabin",
				requiredState: { rifledCabin: false },
				stateChanges: { rifledCabin: true },
				disableMode: "hidden",
			},
			{
				desc: "SAFE",
				nextEventId: "openSafe",
				requiredState: { profession: profHunter, rifledCabin: true, openedSafe: false },
				stateChanges: { openedSafe: true },
				disableMode: "hidden",
			},
			{
				desc: "Continue searching the cabin",
				nextEventId: "continueSearchingCabin",
				requiredState: { rifledCabin: true, searchedCabin: false },
				stateChanges: { searchedCabin: true },
				disableMode: "hidden",
			},
			{
				desc: "Thoroughly search the rest of the cabin",
				nextEventId: "thoroughlySearchCabin",
				requiredState: { searchedCabin: true, thoroughlySearchedCabin: false },
				stateChanges: { thoroughlySearchedCabin: true },
				disableMode: "hidden",
			},
			{
				desc: getRandomSearchCabinChoice,
				nextEventId: "randomSearchCabin",
				requiredState: { thoroughlySearchedCabin: true },
				disableMode: "hidden",
			},
			{
				desc: "Take the stack of planks you found earlier",
				nextEventId: "",
				requiredState: { foundPlanks: true, hasPlanks: false },
				stateChanges: { hasPlanks: true },
				disableMode: "hidden",
			},
			{
				desc: "See if any of the furniture can be moved to create a barricade",
				nextEventId: "testBarricadingFurniture",
			},
			{
				desc: "Take a closer look at the hatch in the floor",
				nextEventId: "approachHatch",
			},
		],
	},
	{
		id: "riflingCabin",
		choices: [
			{
				desc: "Continue searching",
				nextEventId: "continueSearchingCabin",
				stateChanges: { searchedCabin: true },
			},
			{
				desc: "SAFE",
				nextEventId: "openSafe",
				requiredState: { profession: profHunter, openedSafe: false },
				stateChanges: { openedSafe: true },
				disableMode: "hidden",
			},
			{
				desc: "Abandon your search for now",
				nextEventId: "insideCabin",
			},
		],
	},
	{
		id: "continuedSearchingCabin",
		choices: [
			{
				desc: "Take the planks and search the cabin for a hammer and nails",
				nextEventId: "thoroughlySearchCabin",
				requiredState: { hasHammer: false, hasNails: false },
				stateChanges: { hasPlanks: true, thoroughlySearchedCabin: true },
				disableMode: "hidden",
			},
			{
				desc: "Take the planks and search the cabin for some nails",
				nextEventId: "thoroughlySearchCabin",
				requiredState: { hasHammer: true, hasNails: false },
				stateChanges: { hasPlanks: true, thoroughlySearchedCabin: true },
				disableMode: "hidden",
			},
			{
				desc: "Take the planks and search the cabin for a hammer",
				nextEventId: "thoroughlySearchCabin",
				requiredState: { hasHammer: false, hasNails: true },
				stateChanges: { hasPlanks: true, thoroughlySearchedCabin: true },
				disableMode: "hidden",
			},
			{
				desc: "Lucky you've already got both! Take the planks and keep searching for anything else that looks useful",
				nextEventId: "thoroughlySearchCabin",
				requiredState: { hasHammer: true, hasNails: true },
				stateChanges: { hasPlanks: true, thoroughlySearchedCabin: true },
				disableMode: "hidden",
			},
			{
				desc: "Ignore the planks for now and continue searching the cabin for anything else useful",
				nextEventId: "thoroughlySearchCabin",
				stateChanges: { foundPlanks: true, thoroughlySearchedCabin: true },
			},
			{
				desc: "Ignore the planks for now and stop searching - you doubt you'll find anything else useful in this place",
				nextEventId: "insideCabin",
				stateChanges: { foundPlanks: true },
			},
		],
	},
	{
		id: "thoroughlySearchingCabin",
		choices: [
			{
				desc: getRandomSearchCabinChoice,
				nextEventId: "randomSearchCabin",
			},
			{
				desc: "You've searched everywhere, there's nothing left to find",
				nextEventId: "insideCabin",
			},
		],
	},
	{
		id: "randomlySearchingCabin",
		choices: [
			{
				desc: getRandomSearchCabinChoice,
				nextEventId: "randomSearchCabin",
			},
			{
				desc: getRandomSearchCabinGiveUp,
				nextEventId: "insideCabin",
			},
		],
	},
	{
		id: "inspectingHatch",
		choices: [
			{
				desc: "Ignore the hatch for now",
				nextEventId: "insideCabin",
			},
			{
				desc: "Use your spare key to open the lock",
				nextEventId: "unlockHatch",
				requiredState: { profession: profHunter },
				stateChanges: { hatchOpen: true },
				disableMode: "hidden",
			},
			{
				desc: "Pick the lock",
				nextEventId: "pickHatchLock",
				requiredState: {
					canLockpick: true /* A bunch of these probably need renamed depending on what other people do */,
				},
				stateChanges: { hatchOpen: true },
			},
			{
				desc: "Cut the lock's shackle using your bolt cutters",
				nextEventId: "cutHatchLockBolts",
				requiredState: { hasBoltCutters: true },
				stateChanges: { hatchOpen: true },
			},
			{
				desc: "Use your crowbar to pry open the hatch",
				nextEventId: "pryOpenHatch",
				requiredState: { hasCrowbar: true },
				stateChanges: { hatchOpen: true },
			},
		],
	},
	{
		id: "openedHatch",
		choices: [
			{
				desc: "Climb down the ladder into the darkness below",
				nextEventId: undefined,
			},
			{
				desc: "Ignore the basement for now",
				nextEventId: "insideCabin",
			},
		],
	},
	// END: Inside

	// BEGIN: Forest
	{
		id: "visitingForestInitial",
		choices: [
			{
				desc: "Try to push yourself out",
				nextEventId: "icyWaterPush",
			},
			{
				desc: "Grasp onto the nearby tree and try to pull yourself out",
				nextEventId: "icyWaterPull",
			},
		],
	},
	// END: Forest

	{
		id: "tempTooLowCall",
		choices: [
			{
				nextEventId: "tempTooLow",
			},
		],
	},
	{
		id: "tempTooHighCall",
		choices: [
			{
				nextEventId: "tempTooHigh",
			},
		],
	},

	{
		id: "gameOver",
		choices: [
			{
				desc: "See statistics",
				nextEventId: goToStatistics,
			},
		],
	},
];

const events = [
	{
		id: "firstVisitOutside",
		text: `Following the path deeper into the dark woods, you stumble across a lone cabin.
        It looks to have been recently abandoned, and you can see signs of zombies nearby.
        The windows have been smashed in and the door is hanging off its hinges.
        You might be able to find some wood for a fire here, or with some barricades you might even be able to spend the night here.`,
		img: imgOutside,
		audio: audioWind,
		optsId: "outside",
	},
	{
		id: "leaveCabin",
		text: `Leaving the shelter of the cabin, you feel the strength of the harsh wind once again. The sky is already beginning to darken - not much longer until night falls.`,
		img: imgOutside,
		audio: audioWind,
		optsId: "outside",
	},
	{
		id: "leaveLogs",
		text: `Leaving the little shelter the side of the cabin provides, you feel the crisp wind hit you again. It seems like it will be a cold night.`,
		img: imgOutside,
		audio: audioWind,
		optsId: "outside",
	},

	// BEGIN: Firewood
	{
		id: "searchForFirewood",
		text: `Walking around the house, you find a large stack of logs. Unfortunately, they're too big to help you start the fire,
        but they'll be useful for keeping it going throughout the night.<br />
        If you had a <strong>saw</strong> of some sort, you could cut some of them up into kindling.<br />
        You might also be able to find some smaller branches out in the forest, but who knows what's out in those dark woods?<br />
        Or you could hope that you find some other kindling before night.`,
		optsId: "atFirewood",
	},
	{
		id: "visitFirewood",
		text: "You return to the stack of logs.",
		optsId: "atFirewood",
	},
	{
		id: "takeLargeFirewood",
		text: `You take some of the wood with you. It's heavy, but you should have enough now to last you the night.<br />
        If you find a saw, you can always return here and make some kindling.`,
		// IDEA: Making kindling when you find the saw from the wood you already have is probably too ambitious, right?
		optsId: "takingLargeFirewood",
	},
	{
		id: "makeKindling",
		text: `You saw some of the logs into smaller peices of kindling. This should be a great help in starting a fire to keep you warm enough to last through tonight.<br />
        Do you want to take some larger blocks of wood too?`,
		optsId: "makingKindling",
	},
	// END: Firewood

	// BEGIN: Inside cabin
	{
		id: "initialInsideCabin",
		text: `Pushing the broken door aside, you enter the cabin. As your eyes adjust to its dark interior, you get a better picture of the state of disrepair the cabin is now in.
        Broken glass from the shattered windows litters the floor, and the room is a mess.<br />
        You also spot a hatch in the floor.`,
		img: imgInside,
		audio: audioRain,
		optsId: "inside",
	},
	{
		id: "insideCabin",
		text: `Returning to the cabin`,
		img: imgInside,
		audio: audioRain,
		optsId: "inside",
	},
	{
		id: "searchingCabin",
		text: `You begin rifling through the cupboards and cabinets in the cabin. They seem mostly empty or filled with junk,
        but you're able to scavenge a few tins of food and a bottle of water. There's also a locked safe hidden at the back of a cabinet, but no signs of a combination anywhere.`,
		// TODO: Anything inside safe, or just note for the hunter?
		// TODO: Image
		optsId: "riflingCabin",
	},
	{
		id: "continueSearchingCabin",
		text: `Continuing your search, you spot a stack of wooden planks shoved under the bed.
        Not what you'd want to build a cabin out of, but good enough to help barricade, if you can find some nails and a hammer.`,
		optsId: "continuedSearchingCabin",
	},
	{
		id: "thoroughlySearchCabin",
		text: `Hidden in a box at the back of a cupboard, you find [TODO]`,
		optsId: "thoroughlySearchingCabin",
	},
	{
		id: "randomSearchCabin",
		text: getRandomSearchCabinDialogue,
		optsId: "randomlySearchingCabin",
	},
	{
		id: "testBarricadingFurniture",
		text: `Barricading`,
	},

	// BEGIN: Hatch
	{
		id: "approachHatch",
		text: `There's a heavy lock on the hatch, and it refuses to budge.<br />
        With a crowbar or some other tool you may be able to wedge the hatch open, or use something else to get past the lock itself.`,
		img: imgHatch,
		optsId: "inspectingHatch",
	},
	{
		id: "unlockHatch",
		text: `It's a good thing you remembered to bring your spare key with you when you returned. The lock is slightly rusted, but still swings open when you turn the key.
        You're very glad your sturdy lock managed to prevent [TODO Haven't decided what's down there yet] from any damage. It also means your family are nowhere to be found here -
        there's no way to lock this from the inside.`,
		optsId: "openedHatch",
	},
	{
		id: "pickHatchLock",
		text: `The lock is beginning to rust, but you're able to get it open without too much effort. This lock was designed more to look impressive than actually protect anything.`,
		optsId: "openedHatch",
	},
	{
		id: "cutHatchLockBolts",
		text: `The bolt cutters slice through the lock's shackles with ease, and you can easily pull away the rest of the lock.
        This lock was designed more to look impressive than actually protect anything.`,
		optsId: "openedHatch",
	},
	{
		id: "pryOpenHatch",
		text: `Wedging one end of the crowbar beneath a gap to the side of the hatch, you push hard against the crowbar.
        To your surprise, the shackle of the lock snaps before the hatch itself does. Looks like the lock isn't as strong as it looked.`,
		optsId: "openedHatch",
	},
	// END: Hatch

	// END: Inside cabin

	// BEGIN: Forest
	{
		id: "visitForestInitial",
		text: `Striding through the thick snow, deeper into the forest, it feels as if the sky is being swallowed up above you,
        the little daylight remaining slowly vanishing as the tree branches thicken. Suddenly, you feel the snow beneath you give way,
        and your leg plunges into an icy-cold pool of water below.`,
		optsId: "visitingForestInitial",
	},
	{
		id: "icyWaterPush",
		text: ``,
	},
	{
		id: "icyWaterPull",
		text: `Grasping onto the root of the tree, you try desperately to pull yourself out of the icy hole. The root holds, and inch by inch, you claw yourself out.`,
	},
	// END: Forest

	// BEGIN: Deaths
	{
		id: "tempTooLow",
		text: `As you are enveloped by the strong winds and harsh cold of the surrounding tundra, you feel yourself becoming weaker and weaker.
        You begin to lose all feeling in your limbs, numbed by cold. With no will left to move, you collapse to the ground and slowly succumb to the wasteland's wintery wrath.
        To build a fire...`,
		img: gifDied,
		optsId: "gameOver",
	},
	{
		id: "tempTooHigh",
		text: "As the flames [TODO]",
		img: gifDied,
		optsId: "gameOver",
	},
	// END: Deaths
];

const eventsHunter = [
	{
		id: "firstVisitOutside",
		text: `Following the path you've treaded so many times before, you find yourself outside your cabin in the woods once again. 
        You can still see signs of zombies nearby, and the window of the cabin is smashed.
        TODO Something about things aren't looking good for the rest of your family`,
	},
	{
		id: "searchingCabin",
		text: `You begin rifling through the cupboards and cabinets in the cabin. They seem mostly empty or filled with junk,
        but you're able to scavenge a few tins of food and a bottle of water. There's also a locked safe hidden at the back of a cabinet -
        If the password hasn't been changed, you should be able to get it open.`,
		optsId: "riflingCabin",
	},
];
const eventsMechanic = [];
const eventsDoctor = [];
const eventsVeteran = [];
const eventsPriest = [];

// BEGIN: Logic for determining some data
function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomSearchCabinChoice() {
	const choices = [
		"Continue your search",
		"Keep searching",
		"Hmmm, you don't know if you searched in there yet...",
		"Is there anything else for you to find?",
		"You're not done searching yet...",
		"You're not giving up yet.",
		"Look for anything else to search",
		"There's got to be something else to find",
	];
	return choices[getRandom(0, choices.length)];
}

function getRandomSearchCabinGiveUp() {
	const choices = [
		"You feel like there's nothing left to find",
		"Abandon your search",
		"Give up",
		"You feel like you've searched everything",
		"Finish searching",
		"Stop your search",
		"You're done searching",
		"This search has to end eventually",
		"Leave your search for now",
		"You should probably stop searching now",
	];
	return choices[getRandom(0, choices.length)];
}

function getRandomSearchCabinDialogue() {
	const choices = [
		"You found: Nothing",
		"You spot a hastily scrawled note, but it's unreadable.",
		"You found an empty drawer! It's useless.",
		"You thought you'd found something, but it was just some dust.",
		"Dust, dust, and more dust in the wind",
		"Is that... no wait, it's not.",
		"It's a blank piece of paper",
		"You stood on a bent nail. Ouch!",
		"Does that push away to reveal a secret? Nope, it still doesn't budge.",
	];
	return choices[getRandom(0, choices.length)];
}

function goToStatistics() {
	window.location.href = "EndStatistics.html";
}
// END: Logic for determining some data
