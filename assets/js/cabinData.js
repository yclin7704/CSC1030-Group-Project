const imgOutside = "assets/images/cabin-outside.webp";
const imgInside = "assets/images/cabin-inside.webp";

// TODO: Only event OR choice should be able to update game state (Or should most of the time, anyway). Which?
const eventOpts = [
	{
		id: "outside",
		choices: [
			{
				desc: "Enter the cabin",
				nextEventId: "inside",
			},
			{
				desc: "Search for firewood",
				requiredState: { hasLargeFirewood: false },
				nextEventId: "searchForFirewood",
			},
		],
	},
	{
		id: "inside",
		choices: [
			{
				desc: "Leave the cabin",
				nextEventId: "firstVisitOutside",
			},
		],
	},

	// BEGIN: Firewood
	{
		id: "searchForFirewood",
		choices: [
			{
				desc: "Ignore the firewood for now and return to the entrance to the cabin",
				nextEventId: "firstVisitOutside",
			},
			{
				desc: "Take some of the logs",
				requiredState: { hasLargeFirewood: false },
				stateChanges: { hasLargeFirewood: true },
				nextEventId: "takeLargeFirewood",
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
				nextEventId: undefined,
			},
		],
	},
	{
		id: "takingLargeFirewood",
		choices: [
			{
				desc: "Return to the entrance to the cabin with your blocks of firewood",
				nextEventId: "firstVisitOutside",
			},
		],
	},
	{
		id: "makingKindling",
		choices: [
			{
				desc: "Return to the entrance to the cabin with your kindling",
				nextEventId: "firstVisitOutside",
			},
			{
				desc: "Return the the entrance to the cabin and take some larger blocks of firewood too",
				nextEventId: "firstVisitOutside",
				requiredState: { hasLargeFirewood: false },
				stateChanges: { hasLargeFirewood: true },
			},
		],
	},
	// END: Firewood
];

const events = [
	{
		id: "firstVisitOutside",
		text: `Following the path deeper into the dark woods, you stumble across a lone cabin.
        It looks to have been recently abandoned, and you can see signs of zombies nearby.
        The windows have been smashed in and the door is hanging off its hinges.
        You might be able to find some wood for a fire here, or with some barricades you might even be able to spend the night here.`,
		img: imgOutside,
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
		optsId: "searchForFirewood",
		stateChanges: { visitedFirewood: true },
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

	{
		id: "inside",
		text: `Inside the cabin`,
		img: imgInside,
		optsId: "inside",
	},
];

const eventsHunter = [
	{
		id: "firstVisitOutside",
		text: `Following the path you've treaded so many times before, you find yourself outside your cabin in the woods once again. 
        You can still see signs of zombies nearby, and the window of the cabin is smashed.
        TODO Something about things aren't looking good for the rest of your family`,
	},
];
const eventsMechanic = [];
const eventsDoctor = [];
const eventsVeteran = [];
const eventsPriest = [];
