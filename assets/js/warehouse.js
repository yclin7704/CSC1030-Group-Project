const textElement = document.getElementById('warehouseText'); // Lab Text 
const optionButtonsElement = document.getElementById('options'); // Buttoms for the user
const inventoryElement = document.getElementById('inventory'); // Inventory
const imageElement = document.getElementById('locationImage'); //Location
const profession = sessionStorage.getItem("profession"); //Profession
const playerName = sessionStorage.getItem("playerName");

// This variable stores the current game state

let state = getGameState();

function getGameState() {
	let savedData = sessionStorage.getItem("WarehouseGameState");
	console.log(savedData);
	if (savedData) return JSON.parse(savedData);
	else
		return {
			// TODO: Get profession properly with sessionStorage.getItem("profession");
			profession: "Hunter",
		};
}

function displayPlayerName() {
	document.getElementById("playerSpan").innerHTML = sessionStorage.getItem("playerName") + "<br>";
}

// Starting the game

function startGame()
{
    //Setting to the profession chosen
    switch(profession){
        case "Mechanic": state["Mechanic"] = true; break;
        case "Doctor": state["Doctor"] = true; break;
        case "Hunter": state["Hunter"] = true; break;
        case "War Veteran": state["WarVeteran"] = true; break;
        case "Priest": state["Priest"] = true; break;
    }

    // Displays the inventory
    showInventory();

    // Displays Player's Name
    displayPlayerName()

    // This will take the player to the appropriate Text Node when day ends, and when night ends
    setTimerData(showTextNode, "camp", 5.1);

	// This will take the player to the appropriate Text Node if they die of frostbite or heat stroke
    setTemperatureData(showTextNode, 6.1, 6.2);
    
    // Will display the first text node (id=1)
    showTextNode(1);
}

// This function displays the current text node in the dialogue box. The index of the text node is required as a parameter.

function showTextNode(textNodeIndex){
    if (textNodeIndex === "Hospital"){
        window.location.href = "Hospital.html";
    }
    else if (textNodeIndex === "GasStation"){
        window.location.href = "GasStation.html";
    }
    else if (textNodeIndex === "Cabin"){
        window.location.href = "Cabin.html";
    }
    else if (textNodeIndex === "Lab"){
        window.location.href = "Lab.html";
    }
    else if (textNodeIndex === "FarmHouse"){
        window.location.href = "FarmHouse.html";
    }
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex); // Finds the text node by comparing to parameter input.
    typeSentence(textNode.text, "warehouseText"); // Changes the dialogue box to text stored in the text node.
    updateInventory(textNode.inventory);
    crossfadeAudio(textNode.sound);
    playSound(textNode.sound2);
    imageElement.src = textNode.image;
    while(optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button'); // Creates a button.
            button.innerText = option.text; // Button text is changed to the option text.
            button.classList.add('buttonChoice'); // Sets the button class for styling.
            button.addEventListener('click', () => selectOption(option)); // Adds event listener
            optionButtonsElement.appendChild(button); 
            sessionStorage.setItem("WarehouseGameState", JSON.stringify(state));
        }
    })
}

// This function shows the current option selected

function showOption(option) {
    return (option.requiredState == null || option.requiredState(state)) && meetsInventoryRequirements(option.requiredInventory);
}


function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) { // If the text node id is < 0, the game is restarted
        return startGame();
    }
    state = Object.assign(state, option.setState);
    updateInventory(option.setInventory);
    showTextNode(nextTextNodeId);
    changeTemp(option.tempChange);
}

// The text nodes for the game are below

const textNodes = [
    {
        id: 1,
        text: `After pondering your thoughts for a while, you hear static near you. A old rustic radio spoke out "Survivors, if any of you are still out there please ensure that you're ready tonight as the zombies will be more agitated than normal and a snow storm will arrive tonight. This will wipe out the zombie bu-" before it could finish it cuts out. Seems like it ran out of batteries.`,
        inventory: '',
        image: 'assets/images/Warehouse.jpg',
        sound: 'assets/sounds/winterStorm.wav',
        options: [
            {
                text: 'Look around the warehouse',
                tempChange: -1,
                nextText: 2
            },
        ]
    },
    {
        id: 2,
        text: `You take your time to analyse the abandoned warehouse you're in, The room itself is quite spacious which seems like a bad thing when the zombies are out to get you and the impending snow, it would difficult to survive here but possible. There are some large planks of wood on the floor along with a burnt out campfire from the previous occupant and a recharagable torch.`,
        inventory: '',
        image: 'assets/images/Warehouse.jpg',
        sound: 'assets/sounds/winterStorm.wav',
        options: [
            {
                text: 'Take the large planks',
                requiredInventory: { 'Wood Planks': false },
                setInventory: { 'Wood Planks': true },
                requiredState: (currentState) => !currentState.warehouseWood,
                setState: { warehouseWood : true },
                tempChange: -1,
                nextText: 2
            },
            {
                text: 'Take the torch',
                requiredInventory: { 'Torch': false },
                setInventory: { 'Torch': true },
                tempChange: -1,
                nextText: 2
            },
            {
                text: 'Fuel the campfire',
                requiredInventory: { 'Wood Planks': true },
                tempChange: -1,
                nextText: 2.1
            },
            {
                text: 'Sit by campfire',
                requiredState: (currentState) => currentState.fireLit,
                tempChange: "increase",
                nextText: 2.3
            },
            {
                text: 'Barricade the door',
                requiredState: (currentState) => !currentState.barricaded,
                tempChange: -1,
                nextText: 2.2
            },
            {
                text: 'Setup Camp',
                setState: { warehouseInside : true },
                tempChange: -1,
                nextText: "camp"
            },
            {
                text: 'Leave the building',
                requiredState: (currentState) => !currentState.barricaded,
                tempChange: -1,
                nextText: 3
            },
        ]
    },
    {
        id: 2.1,
        text: `You look at the campfire outside left by the previous occupant, which seems to have a lot of weeds and grass growing around it through cracks in the now barely visible floor. To use it you're going to need some way to light the campfire and have something to burn.`,
        inventory: '',
        image: 'assets/images/Hospital/AbandonedCampfire.jpg',
        sound: 'assets/sounds/winterStorm.wav',
        options: [
            {
                text: 'Put in wood',
                setInventory: { 'Wood Planks': false },
                requiredState: (currentState) => !currentState.haveWood,
                setState: { haveWood : true },
                tempChange: -1,
                nextText: 2
            },
            {
                text: 'Light Campfire with matches',
                requiredInventory: { 'Matches': true },
                requiredState: (currentState) => !currentState.firelit,
                setState: { fireLit : true },
                setInventory: {'Matches': false},
                tempChange: -1,
                nextText: 2
            },
            {
                text: 'Go back',
                nextText: 2
            },
        ]
    },
    {
        id: 2.2,
        text: `You can choose to barricade off the front door while this will provide you will some defences for the night, it might not be completely enough and you can no longer leave the room.`,
        inventory: '',
        image: 'assets/images/Warehouse.jpg',
        sound: 'assets/sounds/winterStorm.wav',
        options: [
            {
                text: 'Barricade the door with planks',
                setInventory: { 'Wood Planks': false },
                setState: { barricaded : true },
                tempChange: -1,
                nextText: 2
            },
            {
                text: 'Decide not to barricade the door',
                nextText: 2
            },
        ]
    },
    {
        id: 2.3,
        text: 'You decide to sit down and rest by the warm campfire and gather your strength. As you do so the cold winds can be heard from outside and you start a shiver' +
            'you stand up again',
        inventory: '',
        image: 'assets/images/Warehouse.jpg',
        sound: 'assets/sounds/winterStorm.wav',
        options: [
            {
                text: 'Go back',
                nextText: 2
            }
        ]
    },
    {
        id: 3,
        text: `After leaving the warehouse, you notice that the warehouse is surrounded by a fence however there are holes almost everywhere, maybe if you patch it up it can be of some use. You can also decide to leave and visit the other areas you have heard of.`,
        inventory: '',
        image: 'assets/images/Warehouse.jpg',
        sound: 'assets/sounds/winterStorm.wav',
        options: [
            {
                text: 'Go back inside',
                tempChange: -1,
                nextText: 2
            },
            {
                text: 'Inspect the fence',
                requiredState: (currentState) => !currentState.fenceFixed,
                tempChange: -1,
                nextText: 3.1
            },
            {
                text: 'Inspect the fence',
                requiredState: (currentState) => currentState.fenceFixed,
                tempChange: -1,
                nextText: 3.2
            },
            {
                text: 'Go to a different location',
                tempChange: -1,
                nextText: 4
            },
        ]
    },
    {
        id: 3.1,
        text: `The fence, which does have a lot of holes, can be easily repaired if there was some barbed wires and then something like bolt cutters for you to use.`,
        inventory: '',
        image: 'assets/images/BarbedFence.jpg',
        sound: 'assets/sounds/winterStorm.wav',
        options: [
            {
                text: 'Fix the fence',
                requiredInventory: {'Barbed Wire': true, "Bolt Cutters": true},
                setState: { fenceFixed : true },
                setInventory: {'Barbed Wire': false, "Bolt Cutters": false},
                tempChange: -1,
                nextText: 3.2
            },
            {
                text: 'Leave for now',
                nextText: 3
            },
        ]
    },
    {
        id: 3.2,
        text: `The fence is fixed and should hold back the zombie for a period of time but you should still be wary.`,
        inventory: '',
        image: 'assets/images/BarbedFence.jpg',
        sound: 'assets/sounds/winterStorm.wav',
        options: [
            {
                text: 'Go back',
                nextText: 3
            },
        ]
    },
    {
        id: 4,
        text: `You decided it may be best to try your luck at scavaging or holding out at a different location.`,
        inventory: '',
        image: 'assets/images/Warehouse.jpg',
        sound: 'assets/sounds/winterStorm.wav',
        options: [
            {
                text: 'Go to the gas station',
                tempChange: -1,
                nextText: "GasStation"
            },
            {
                text: 'Go to the farm house',
                tempChange: -1,
                nextText: "FarmHouse"
            },
            {
                text: 'Go to the testing centre',
                tempChange: -1,
                nextText: "Lab"
            },
            {
                text: 'Go to the cabin',
                tempChange: -1,
                nextText: "Cabin"
            },
            {
                text: 'Go to the hospital',
                tempChange: -1,
                nextText: "Hospital"
            },
            {
                text: 'Decide not to go anywhere',
                tempChange: -1,
                nextText: 3
            },
        ]
    },
    {
        id: "camp",
        text: "You decide to start preparing yourself for the night, you make refuge in an old bunker that was hidden away underneath the Warehouse, and wait" +
            "patiently for the night to fall...",
        inventory: '',
        image: 'assets/images/Bunker.jpg',
        sound: 'assets/sounds/winterStorm.wav',
        options: [
            {
                text: "Start the Night",
                requiredState: (currentState) => !currentState.fenceFixed && !currentState.barricaded,
                tempChange: -1,
                nextText: 5.1
            },
            {
                text: "Start the Night",
                requiredState: (currentState) => currentState.fenceFixed && !currentState.barricaded,
                tempChange: -1,
                nextText: 5.2
            },
            {
                text: "Start the Night",
                requiredState: (currentState) => !currentState.fenceFixed && currentState.barricaded,
                tempChange: -1,
                nextText: 5.3
            },
            {
                text: "Start the Night",
                requiredState: (currentState) => currentState.fenceFixed && currentState.barricaded,
                tempChange: -1,
                nextText: 5.4
            }
        ]
    },
    {
        id: 5.1,
        text: "You decided to wait patiently for the night to fall over the abandoned Warehouse. However, as the hours went by you could start to hear the shrieks of the" +
            " Zombies from outside get louder and louder as the slowly approached the Warehouse. Unfortunately, because you weren't able to fix the fence and because you didn't" +
            " barricade the front door to the Warehouse, there was little opposition for the zombies that were able got through the gap in the fence and so as they broke down" +
            " the door to your Bunker, you were completely overwhelmed and with no escape route, you accepted your fate..." +
            "<b><em>You Died!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>",
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
        options: []
    },
    {
        id: 5.2,
        text: "You decided to wait patiently for the night to fall over the abandoned Warehouse, and as you did, the faint piercing screeches of the Zombies in the distance" +
            " got louder and louder as they approached the Warehouse. Thankfully because you fixed the fence the Zombies had a hard time getting over. However, the Zombies" +
            "started to pile on top of each other to enable a small amount of Zombies to get over the fence, and because you didn't barricade the front door the small amount" +
            " of Zombies eventually found their way down to your Bunker and broke down the door. You were able to defend yourself for a short time, but your efforts were in vain" +
            ". The zombies had you..." +
            "<b><em>You Died!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>",
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
        options: []
    },
    {
        id: 5.3,
        text: "You decided to wait patiently for the night to cover the Warehouse in darkness, and as you did you could hear the blood curdling screams of not only the Zombies" +
            "but of some other people as they were attacked. However, as the Zombies grew closer and closer you felt confident in the fact that you were able to successfully" +
            " barricade the front door to the Warehouse because the wood was sturdy and strong, and thankfully there were no other entrances into the Warehouse. As the Zombies" +
            " apparoached, although it wasn't fixed, the fence managed to still pose as an obstacle to the Zombies as only some of them were able to get through the gap completely" +
            " unharmed, but your defences on the door were able to hold off the few that did make it through..." +
            "<b><em>You Survived!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>",
        inventory: '',
        image: 'assets/images/Victory2_TEST-GIF.gif',
        options: []
    },
    {
        id: 5.4,
        text: "After having fixed the fence outside the Warehouse and barricaded the front door to the Warehouse, you were confident in the fact that these defences should hold off" +
        "the oncoming Zombies. As the hours passed by, you could hear the shrill shrieks of the Zombies as they arrived at the Warehouse, but because you fixed the fence the Zombies" +
        "weren't able to get passed it as easily. However, they did start to pile on top of each other to allow a few Zombies to get over the fence, but their efforts were in vain as" +
        " the strength of the few Zombies that did get over wasn't enough to break down the barricaded door to the Warehouse..." +
        "<b><em>You Survived!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>",
        inventory: '',
        image: 'assets/images/Victory2_TEST-GIF.gif',
        options: []
    },
    {
        id: 6.1,
        text: "As the harsh colds and strong winds of the tundra surround you, you can feel your body becoming weaker and weaker by the second, to the point that you can't" +
            " even feel anything, numbed by the cold. With no will left to move, you sit there slowly but surely succumbing to the frozen wasteland's wrath, and eventually..." +
            "You succumb of Frostbite...<b><em>You Died!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>",
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
        options: []
    },
    {
        id: 6.2,
        text: "In your attempt to warm yourself up, you became too warm and without any adequate treatmnent to help you, you unfortunately succumbed to heat stroke..." +
            "<b><em>You Died!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>",
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
        options: []
    }
]

startGame(); // Function call to start the game