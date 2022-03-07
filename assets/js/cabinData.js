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
			{
				desc: "Search for firewood",
				requiredState: { foundFirewood: false },
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
	{
		id: "searchForFirewood",
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
		text: `Following the path deeper into the dark woods, you stumble across a lone cabin.
        It looks to have been recently abandoned, and you can see signs of zombies nearby.
        The windows have been smashed in and the door is hanging off its hinges.
        You might be able to find some wood for a fire here, or with some barricades you might even be able to spend the night here.`,
		img: imgOutside,
		optsId: "outside",
		stateChanges: {},
	},
	{
		id: "searchForFirewood",
		text: `WOOD`,
		optsId: "searchForFirewood",
		stateChanges: { foundFirewood: true },
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
