const imgOutside = "assets/images/cabin-outside.webp";
const imgInside = "assets/images/cabin-inside.webp";
const imgHatch = "assets/images/cabin-trapdoor.jpg";

const gifDied = "assets/images/You-Died_TEST-GIF.gif";

const audioWind = "assets/sounds/wind.wav";
const audioRain = "assets/sounds/rain_2.wav";
const soundTest = "assets/sounds/ZippingBag.mp3";

const profHunter = "Hunter";
const profMechanic = "Mechanic";
const profDoctor = "Doctor";
const profVeteran = "Veteran";
const profPriest = "Priest";

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
				tempChange: "decrease",
				sound: soundTest,
			},
			{
				desc: "Enter the cabin",
				requiredState: { hasBeenInsideCabin: true, zombieInCabin: false },
				nextEventId: "insideCabin",
				disableMode: "hidden",
				tempChange: "decrease",
				sound: soundTest,
			},
			{
				desc: "Enter the cabin",
				requiredState: { zombieInCabin: true },
				nextEventId: "zombieInCabin",
				disableMode: "hidden",
			},
			{
				desc: "Search for firewood",
				requiredState: { hasVisitedFirewood: false },
				stateChanges: { hasVisitedFirewood: true },
				nextEventId: "searchForFirewood",
				disableMode: "hidden",
				tempChange: "decrease",
			},
			{
				desc: "Return the the pile of firewood",
				requiredState: { hasVisitedFirewood: true },
				nextEventId: "visitFirewood",
				disableMode: "hidden",
				tempChange: "decrease",
			},
			{
				desc: "Venture deeper into the forest",
				nextEventId: "visitForestInitial",
				tempChange: -40,
			},
			{
				desc: "Return to the warehouse",
				nextEventId: "warehouse",
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
				tempChange: "decrease",
			},
			{
				desc: "Take some of the logs",
				requiredInventory: { Firewood: false },
				setInventory: { Firewood: true },
				nextEventId: "takeLargeFirewood",
				disableMode: "hidden",
				tempChange: "decrease",
			},
			{
				desc: "Make some smaller kindling out of the logs using your saw",
				requiredInventory: { Saw: true /* That variable may need renamed */, Kindling: false },
				setInventory: { Kindling: true },
				nextEventId: "makeKindling",
				tempChange: "decrease",
			},
			{
				desc: "Venture out into the woods and see what you can find",
				nextEventId: "visitForestInitial",
				tempChange: -40,
				tempChange: "decrease",
			},
		],
	},
	{
		id: "takingLargeFirewood",
		choices: [
			{
				desc: "Return to the entrance to the cabin with your blocks of firewood",
				nextEventId: "leaveLogs",
				tempChange: "decrease",
			},
		],
	},
	{
		id: "makingKindling",
		choices: [
			{
				desc: "Return to the entrance to the cabin with your kindling",
				nextEventId: "leaveLogs",
				tempChange: "decrease",
			},
			{
				desc: "Return the the entrance to the cabin and take some larger blocks of firewood too",
				nextEventId: "leaveLogs",
				requiredInventory: { Firewood: false },
				setInventory: { Firewood: true },
				tempChange: "decrease",
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
				desc: "Take a closer look at the safe",
				nextEventId: "lookAtSafe",
				requiredState: { openedSafe: false, rifledCabin: true },
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
				desc: "See if any of the furniture can be moved to create a barricade",
				nextEventId: "testBarricadingFurniture",
				requiredState: { startedBarricade: false },
				stateChanges: { startedBarricade: true },
				disableMode: "hidden",
			},
			{
				desc: "Continue barricading",
				nextEventId: "continueBarricade",
				requiredState: { startedBarricade: true, returnedToBarricade: false },
				stateChanges: { returnedToBarricade: true },
				disableMode: "hidden",
			},
			{
				desc: "Return to your barricade",
				nextEventId: "addToBarricade",
				requiredState: { returnedToBarricade: true },
				disableMode: "hidden",
			},
			{
				desc: "Take a closer look at the hatch in the floor",
				nextEventId: "approachHatch",
			},
			{
				desc: "Wait until night",
				nextEventId: waitUntilNightId,
			},
		],
	},
	{
		id: "testingBarricadingFurniture",
		choices: [
			{
				desc: "Duck past the zombie",
				nextEventId: "duckPastZombie",
			},
			{
				desc: "Attack the zombie with your crowbar",
				requiredInventory: { Crowbar: true },
				nextEventId: "attackZombieCrowbar",
			},
			{
				desc: "Shoot the zombie with []",
				// TODO
				requiredInventory: {},
				nextEventId: "attackZombieGun",
			},
			{
				desc: "Escape through the window",
				nextEventId: "escapeZombie",
			},
		],
	},
	{
		id: "duckingPastZombie",
		choices: [
			{
				desc: "Dodge left",
				nextEventId: dodgeZombie,
			},
			{
				desc: "Run right at the zombie",
				nextEventId: "runAtZombie",
			},
			{
				desc: "Dodge right",
				nextEventId: dodgeZombie,
			},
		],
	},
	{
		id: "dodgedPastZombie",
		choices: [
			{
				desc: "Phew, that was close!",
				nextEventId: "leaveCabin",
				stateChanges: { zombieInCabin: true },
			},
		],
	},
	{
		id: "escapedZombie",
		choices: [
			{
				desc: "What next?",
				nextEventId: "leaveCabin",
				stateChanges: { zombieInCabin: true },
			},
		],
	},
	{
		id: "zombieInCabin",
		choices: [
			{
				desc: "Yes, you've got a plan",
				nextEventId: "fightZombie",
			},
			{
				desc: "Best to avoid the zombie for now",
				nextEventId: "leaveCabin",
			},
		],
	},
	{
		id: "fightingZombie",
		choices: [
			{
				desc: "Shoot the zombie",
				nextEventId: "attackZombieGun",
				requiredInventory: {},
				stateChanges: { zombieInCabin: false },
			},
			{
				desc: "Attack the zombie with your saw",
				nextEventId: "attackZombieSaw",
				requiredInventory: {},
				stateChanges: { zombieInCabin: false },
			},
			{
				desc: "Attack the zombie with your crowbar",
				nextEventId: "attackZombieCrowbar",
				requiredInventory: { Crowbar: true },
				stateChanges: { zombieInCabin: false },
			},
			{
				desc: "Throw one of the logs you found earlier at the zombie",
				nextEventId: "attackZombieFirewood",
				requiredInventory: { Firewood: true },
				stateChanges: { zombieInCabin: false },
			},
			{
				desc: "Uhh... try punching it?",
				nextEventId: "attackZombiePunch",
			},
		],
	},
	{
		id: "killedZombie",
		choices: [
			{
				desc: "Shove the dead zombie out of the way and get back to barricading the cabin.",
				nextEventId: "insideCabin",
			},
		],
	},
	{
		id: "dyingToZombie",
		choices: [
			{
				desc: "But maybe you can...",
				nextEventId: "diedToZombie",
			},
		],
	},
	{
		id: "addToBarricade",
		choices: [
			{
				desc: "Leave the barricade alone for now",
				nextEventId: "insideCabin",
			},
			{
				desc: "Use some planks to board up the windows",
				nextEventId: "addToBarricade",
				requiredState: { windowsBoarded: false },
				stateChanges: { windowsBoarded: true },
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
				desc: "Take a closer look at the safe",
				nextEventId: "lookAtSafe",
				requiredState: { openedSafe: false },
				disableMode: "hidden",
			},
			{
				desc: "Abandon your search for now",
				nextEventId: "insideCabin",
			},
		],
	},
	{
		id: "lookingAtSafe",
		choices: [
			{
				desc: "Ignore the safe for now",
				nextEventId: "insideCabin",
			},
			{
				desc: "Take a guess at the combination",
				nextEventId: guessCombination,
			},
			{
				desc: "Unlock the safe",
				nextEventId: "unlockSafe",
			},
		],
	},
	{
		id: "continuedSearchingCabin",
		choices: [
			{
				desc: "Continue searching the cabin for anything else useful - there's probably still something left in here.",
				nextEventId: "thoroughlySearchCabin",
				stateChanges: { thoroughlySearchedCabin: true },
			},
			{
				desc: "Stop searching - you doubt you'll find anything else useful in this place",
				nextEventId: "insideCabin",
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
				requiredInventory: { "Bolt Cutters": true },
				stateChanges: { hatchOpen: true },
			},
			{
				desc: "Use your crowbar to pry open the hatch",
				nextEventId: "pryOpenHatch",
				requiredInventory: { Crowbar: true },
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
				tempChange: "decrease",
			},
			{
				desc: "Grasp onto the nearby tree and try to pull yourself out",
				nextEventId: "icyWaterPull",
				tempChange: 10,
			},
		],
	},
	{
		id: "inIcyWater",
		choices: [
			{
				desc: "Grasp onto the nearby tree and try to pull yourself out",
				nextEventId: "icyWaterPull",
				tempChange: 10,
			},
		],
	},
	{
		id: "outOfIcyWater",
		choices: [
			{
				desc: "Continue",
			},
			{
				desc: "Return to the cabin",
			},
		],
	},
	// END: Forest

	// BEGIN: Night
	{
		id: "onDayEnd",
		choices: [
			{
				desc: "Hunker down and wait for the zombies to arrive",
				nextEventId: "nightZombiesAtDoor",
			},
		],
	},
	// END: Night

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
        You might be able to find some wood for a fire here, or with a rudimentary barricade you might even be able to spend the night here.`,
		img: imgOutside,
		audio: audioWind,
		optsId: "outside",
	},
	{
		id: "returnToCabin",
		text: `Following the winding path through the woods once again, you reach the lone cabin.
		The sky is already beginning to darken - night is on its way.`,
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
		text: `Walking around the house, you find a large stack of logs. Some of them are quite large, but there's a few smaller
        ones that'll be useful for keeping a fire going throughout the night.<br />
        If you had a <strong>saw</strong> of some sort, you could cut some of them up into planks.`,
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
		text: `You return to the shelter of the cabin.`,
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
		id: "lookAtSafe",
		text: `Taking a closer look at the safe, you see it is a fairly simple 3-digit combination lock,
        but with no signs of the combination being written down nearby this doesn't help you much. You wish you'd learnt how to pick a lock...`,
		optsId: "lookingAtSafe",
	},
	{
		id: "unlockSafe",
		text: `UNLOCKED SAFE`,
		optsId: undefined,
	},
	{
		id: "continueSearchingCabin",
		text: `You continue your search, but still find nothing of intrest more than a few spiderwebs.`,
		optsId: "continuedSearchingCabin",
	},
	{
		id: "thoroughlySearchCabin",
		text: `Hidden in a box at the back of a cupboard, you find a red crowbar. It might be useful on that hatch you found earlier, or could help you take down a few zombies.`,
		optsId: "thoroughlySearchingCabin",
		setInventory: { Crowbar: true },
	},
	{
		id: "randomSearchCabin",
		text: getRandomSearchCabinDialogue,
		optsId: "randomlySearchingCabin",
	},

	// BEGIN: Barricading setup
	{
		id: "testBarricadingFurniture",
		text: `As you begin to see what furniture you can push around to help your makeshift barricade, you hear the floorboards creak as a zombie stubles through 
        the open door behind you, probably attracted by the noise.<br />Luckily you spotted it as it came in, and it's shambling quite slowly, but it's got you cornered.`,
		optsId: "testingBarricadingFurniture",
	},

	// BEGIN: Fighting zombie
	{
		id: "duckPastZombie",
		text: `The zombie already knows you're here, so there's no hope in sneaking past it. Taking a few steps for a run up, you try to sprint past the zombie right in front of you.`,
		optsId: "duckingPastZombie",
	},
	{
		id: "runAtZombie",
		text: `You run straight at it, hoping you can shove it out of your way. You realise too late this leaves you no chance of dodging the zombie,
        which is already beginning to lunge towards you. <br />The zombie was heavier than you expected, and as its full weight dives towards you you realise you've got no chance against it like this.`,
		optsId: "dyingToZombie",
	},
	{
		id: "failedDodgeZombie",
		text: `As you try to leap past the zombie, you realise you were too late. It had already begun to lunge towards you,
        and you see you won't have time to get up before it lands on top of you.`,
		optsId: "dyingToZombie",
	},
	{
		id: "dodgedPastZombie",
		text: `As you leap past the zombie, it begins to lunge towards you, but you manage to scramble to your feet quickly enough and escape out the door.`,
		optsId: "dodgedPastZombie",
		img: imgOutside,
	},
	{
		id: "escapeZombie",
		text: `You scrable out the window, trying not to get caught on any of the shards of glass still hanging in the frame.
        The zombie won't be able to follow you through the window, but that still leaves it stuck in the cabin.`,
		optsId: "escapedZombie",
		img: imgOutside,
	},
	{
		id: "zombieInCabin",
		text: `You're sure you want to do that? The zombie you escaped earlier is still in there.`,
		optsId: "zombieInCabin",
	},
	{
		id: "fightZombie",
		text: `You sneak quietly into the room, avoiding the creaky floorboards that alterted you to the zombie in the first place. What next?`,
		optsId: "fightingZombie",
	},
	{
		id: "attackZombieGun",
		text: `Taking aim at the zombie, you shoot it in the head. It keels over, dead. Hopefully the sound of the gunshot didn't attract any more zombies.`,
		optsId: "killedZombie",
	},
	{
		id: "attackZombieSaw",
		text: `Sneaking up behind the zombie, you swing your saw around and strike the zombie in the back of the neck.
        You were lucky enough to have hit something important, as it only struggles briefly before keeling over, dead.`,
		optsId: "killedZombie",
	},
	{
		id: "attackZombieCrowbar",
		text: `Sneaking up behind the zombie, you swing and whack it across the head with the heavy crowbar. You hear a <em>crack</em> as the hit connects,
        and the zombie slumps to the ground, dead.`,
		optsId: "killedZombie",
	},
	{
		id: "attackZombieFirewood",
		text: `Taking as big a peice of the firewood as you can reasonably throw, you aim for the head. Luckily, your aim is better than you thought,
        and the log scores a hit directly on the back of the zombie's head. It collapses to the floor, dead.`,
		optsId: "killedZombie",
	},
	{
		id: "attackZombiePunch",
		text: `You're not really sure what you're doing, but you're going to see what you can do.<br />
        Sneaking up behind the zombie, you try to kick it. It stumles slightly, but doesn't fall over. It turns around and lunges at you.
        You try to dodge past it, but it lands directly on top of you, clawing at your leg. You try to push it off...`,
		optsId: "dyingToZombie",
	},
	// END: Fighting zombie

	{
		id: "continueBarricade",
		text: `Getting back to the barricade, you shuffle around all the furniture that's not nailed down to make a makeshift barricade.
        This probably won't be enough to survive the whole night, but it'll definitely help a lot.<br />
        There's still a few more preparations you can make.`,
		optsId: "addToBarricade",
	},
	{
		id: "addToBarricade",
		text: `Returning to your barricade, you look at what you can still add to it.`,
		optsId: "addToBarricade",
	},

	// END: Barricading setup

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
		text: `As you desperately try to push yourself out, the snow crumbles around you and you slip deeper into the freezing water.`,
		optsId: "inIcyWater",
	},
	{
		id: "icyWaterPull",
		text: `Grasping onto the root of the tree, you try desperately to pull yourself out of the icy hole. The root holds, and inch by inch, you claw yourself out.
        Should you turn back now, or push on and see what you can find?`,
		optsId: "outOfIcyWater",
	},
	// END: Forest

	// BEGIN: Night
	{
		id: "onDayEnd",
		text: `As the sun slowly sinks below the horizon, you feel your dread beginning to grow as you prepare yourself in the cabin.<br />
        Hopefully you've made enough preparations to allow you to survive through the night.`,
		img: imgInside,
		optsId: "onDayEnd",
	},
	// END: Night

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
		text: `As the flames [TODO]`,
		img: gifDied,
		optsId: "gameOver",
	},
	{
		id: "diedToZombie",
		text: `As the zombie lands on top of you, you try your best to push it off. It's no use, and you cry out in pain as you feel the zombie's teeth sink into your arm.
        TODO: Could probably expand even further on this`,
		img: gifDied,
		optsId: "gameOver",
	},
	{
		id: "alreadyDead",
		text: `You're already dead, and refreshing the page can't fix that.`,
		img: gifDied,
		optsId: "gameOver",
	},
	{
		id: "onNightEnd",
		text: `As day dawns over your failed defence from the zombie horde, you lie bleeding out on the ground, too exhausted to move. You won't make it to the next night.`,
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

function guessCombination() {
	if (!gameState.combination) {
		gameState.combination = getRandom(0, 999);
		gameState.combinationGuesses = [];
	}
	let guess = getRandom(0, 999);

	while (gameState.combinationGuesses.indexOf(guess) !== -1) guess = getRandom(0, 999);
	gameState.combinationGuesses.push(guess);

	if (guess === gameState.combination) {
		runEvent("unlockSafe");
	} else print(`You try ${padCombination(guess)} at random. It doesn't budge.`);
}

function padCombination(num) {
	if (num < 10) return "00" + num;
	else if (num < 100) return "0" + num;
	else return num;
}

function dodgeZombie() {
	if (getRandom(0, 50) < 2) runEvent("dodgedPastZombie");
	else runEvent("failedDodgeZombie");
}

function waitUntilNightId() {
	waitUntilNight();
}
// END: Logic for determining some data
