const imgOutside = "assets/images/cabin-outside.webp";
const imgInside = "assets/images/cabin-inside.webp";

const eventOpts = [
	{
		id: "outside",
		choices: [
			{
				desc: "Enter the cabin",
				requiredState: {},
				nextEventId: "outside",
				stateChanges: {},
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
		stateChanges: {},
	},
];
