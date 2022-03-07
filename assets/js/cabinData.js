const imgOutside = "assets/images/cabin-outside.webp";
const imgInside = "assets/images/cabin-inside.webp";

const eventOpts = [
	{
		id: "outside",
		choices: [
			{
				desc: "Enter the cabin",
				requiredState: {},
				nextEventId: "inside",
				stateChanges: {},
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
];

const events = [
	{
		id: "firstVisitOutside",
		text: `Following the path deeper into the dark woods, you stumble across a lone cabin. There appears to have been signs of a struggle, 
        and it seems there are still zombies nearby. What happened here?`,
		img: imgOutside,
		optsId: "outside",
		stateChanges: {},
	},
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
