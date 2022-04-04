const textElement = document.getElementById('warehouseText'); // Lab Text 
const optionButtonsElement = document.getElementById('options'); // Buttoms for the user
const inventoryElement = document.getElementById('inventory'); // Inventory
const imageElement = document.getElementById('locationImage'); //Location
const profession = sessionStorage.getItem("profession"); //Profession

// This variable stores the current game state

let state = {};

// Starting the game

function startGame()
{
    switch(profession) //Setting to the profession chosen
    { 
        case "Mechanic": state = {Mechanic: true}; 
        break;
        case "Doctor": state = {Doctor: true}; 
        break;
        case "Hunter": state = {Hunter: true}; 
        break;
        case "War Veteran": state = {WarVeteran: true}; 
        break;
        case "Priest": state = {Priest: true}; 
        break;
        default: state = {}; 
        break;
    }

    // Displays the inventory
    showInventory();

    // clears the inventory before the game starts
    //clearInventory();

	// This will take the player to the appropriate Text Node if they die of frostbite or heat stroke
    //setTemperatureData(showTextNode, coldid, hotid);
    
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
    inventory = Object.assign(inventory, option.setInventory);
    updateInventory(option.setInventory);
    showTextNode(nextTextNodeId);
}

// The text nodes for the game are below

const textNodes = [
    {
        id: 1,
        text: `After pondering your thoughts for a while, you hear static near you. A old rustic radio spoke out "Survivors, if any of you are still out there please ensure that you're ready tonight as the zombies will be more agitated than normal and a snow storm will arrive tonight. This will wipe out the zombie bu-" before it could finish it cuts out. Seems like it ran out of batteries.`,
        inventory: '',
        image: '',
        options: [
            {
                text: 'Look around the warehouse',
                nextText: 2
            },
        ]
    },
    {
        id: 2,
        text: `You take your time to analyse the abandoned warehouse you're in, The room itself is quite spacious which seems like a bad thing when the zombies are out to get you and the impending snow, it would difficult to survive here but possible. There are some large planks of wood on the floor along with a burnt out campfire from the previous occupant and a recharagable torch.`,
        inventory: '',
        image: '',
        options: [
            {
                text: 'Take the large planks',
                requiredInventory: { 'largePlanks': false },
                setInventory: { largePlanks: true },
                setState: { plankTaken : true },
                requiredState: (currentState) => !currentState.plankTaken,
                nextText: 2
            },
            {
                text: 'Take the torch',
                requiredInventory: { 'torch': false },
                setInventory: { torch: true },
                nextText: 2
            },
            {
                text: 'Fuel the campfire',
                nextText: 2.1
            },
            {
                text: 'Barricade the door',
                requiredState: (currentState) => !currentState.barricated,
                nextText: 2.2
            },
            {
                text: 'Setup Camp',
                setState: { warehouseInside : true },
                nextText: "camp"
            },
            {
                text: 'Leave the building',
                requiredState: (currentState) => !currentState.barricated,
                nextText: 3
            },
        ]
    },
    {
        id: 2.1,
        text: `You look at the campfire left by the previous occupant, you're going to need some way to light the campfire and have something to burn it with.`,
        inventory: '',
        image: '',
        options: [
            {
                text: 'Put in wood',
                requiredInventory: { 'firewood': true },
                setInventory: { firewood: false },
                setState: { haveWood : true },
                requiredState: (currentState) => !currentState.haveWood,
                nextText: 2
            },
            {
                text: 'Put in wood',
                requiredInventory: { 'wood': true },
                setInventory: { wood: false },
                setState: { haveWood : true },
                requiredState: (currentState) => !currentState.haveWood,
                nextText: 2
            },
            {
                text: 'Put in wood',
                requiredInventory: { 'Fire Wood': true },
                setInventory: { 'Fire Wood': false },
                setState: { haveWood : true },
                requiredState: (currentState) => !currentState.haveWood,
                nextText: 2
            },
            {
                text: 'Put in wood',
                requiredInventory: { 'Firewood': true },
                setInventory: { 'Firewood': false },
                setState: { haveWood : true },
                requiredState: (currentState) => !currentState.haveWood,
                nextText: 2
            },
            {
                text: 'Light Campfire with matches',
                requiredInventory: { 'matches': true },
                requiredState: (currentState) => !currentState.haveWood,
                setState: { fireLit : true },
                nextText: 2
            },
            {
                text: 'Light Campfire with matches',
                requiredInventory: { 'Matches': true },
                requiredState: (currentState) => !currentState.haveWood,
                setState: { fireLit : true },
                nextText: 2
            },
            {
                text: 'Light Campfire with the lighter',
                requiredInventory: { 'Lighter': true },
                requiredState: (currentState) => !currentState.haveWood,
                setState: { fireLit : true },
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
        image: '',
        options: [
            {
                text: 'Barricade the door with planks',
                setInventory: { largePlanks: false },
                setState: { barricated : true },
                nextText: 2
            },
            {
                text: 'Decide not to barricade the door',
                nextText: 2
            },
        ]
    },
    {
        id: 3,
        text: `After leaving the warehouse, you notice that the warehouse is surrounded by a fence however there are holes almost everywhere, maybe if you patch it up it can be of some use. You can also decide to leave and visit the other areas you have heard of.`,
        inventory: '',
        image: '',
        options: [
            {
                text: 'Go back inside',
                nextText: 2
            },
            {
                text: 'Inspect the fence',
                requiredState: (currentState) => !currentState.fenceFixed,
                nextText: 3.1
            },
            {
                text: 'Inspect the fence',
                requiredState: (currentState) => !currentState.fenceFixed,
                nextText: 3.2
            },
            {
                text: 'Go to a different location',
                nextText: 4
            },
        ]
    },
    {
        id: 3.1,
        text: `The fence while have many holes, can easily be repaired if there are some barbed wires and something like a bolt cutter for you to use.`,
        inventory: '',
        image: '',
        options: [
            {
                text: 'Fix the fence',
                requiredInventory: { 'barbedWire': true },
                requiredInventory: { 'cutter': true },
                setState: { fenceFixed : true },
                nextText: 3.2
            },
            {
                text: 'Leave for now',
                nextText: 3
            },
        ]
    },
    {
        id: 3.1,
        text: `The fence is fixed and should hold back the zombie for a period of time but you should still be wary.`,
        inventory: '',
        image: '',
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
        image: '',
        options: [
            {
                text: 'Go to the gas station',
                nextText: "GasStation"
            },
            {
                text: 'Go to the farm house',
                nextText: "FarmHouse"
            },
            {
                text: 'Go to the testing centre',
                nextText: "Lab"
            },
            {
                text: 'Go to the cabin',
                nextText: "Cabin"
            },
            {
                text: 'Go to the hospital',
                nextText: "Hospital"
            },
            {
                text: 'Decide not to go anywhere',
                nextText: 3
            },
        ]
    },
    
]

startGame(); // Function call to start the game