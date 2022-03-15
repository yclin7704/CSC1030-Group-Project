const textElement = document.getElementById('labText'); // Lab Text 
const optionButtonsElement = document.getElementById('options'); // Buttoms for the user
const inventoryElement = document.getElementById('inventory'); // Inventory
const imageElement = document.getElementById('locationImage'); //Location
const profession = getProfession(); //Getting Profession

// This variable stores the current game state

let state = {};
let inventory = {};

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
    showTextNode(1);
}

// This function displays the current text node in the dialogue box. The index of the text node is required as a parameter.

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex); // Finds the text node by comparing to parameter input.
    textElement.innerHTML = textNode.text; // Changes the dialogue box to text stored in the text node.
    inventoryElement.innerHTML = textNode.inventory;
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
    return option.requiredState == null || option.requiredState(state);
}


function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) { // If the text node id is < 0, the game is restarted
        return startGame();
    }
    state = Object.assign(state, option.setState);
    inventory = Object.assign(inventory, option.setInventory);
    showTextNode(nextTextNodeId);

}

// The text nodes for the game are below

const textNodes = [
    {
        id: 1,
        text: "After traveling for what felt like an eternity, you arrived to a medical testing zone. From what you could remember people use to come here to take part in clinical trials" +
        "for some quick cash. The medical centre seems to be abandoned and is surrounded by relatively sturdy concrete walls however the gate is completely busted and definitely won't hold against" +
        "the horde tonight without some repairs. You see a smaller building in the distance almost like a makeshift next to the building, while it won't make a good place for the night it might contain" +
        "Some equipment and loot that can help you get through the night.",
        inventory: '',
        image: '',
        options: [
            {
                text: 'Enter through the fence',
                nextText: 2
            },
            {
                text: 'Take a detour to the smaller building',
                nextText: 20
            },
            {
                text: 'Setup traps outside the gate',
                nextText: 30
            },
        ]
    },
    {
        id: 2,
        text: "You enter through the gate, you see before you a massive medical centre with a double door that seems to have been previously barricaded however is now broken through" +
        "most likely due to a zombie horde, it's unclear if there is any survivors here but having the door busted makes your life easier getting inside the building. There are big" +
        "window panes however they are very opaque, concluding that it's most likely one way only. There seems to be some wierd red and blue fungus growing on the side of the building" +
        "with the red one smelling sweet and blue one smelling...salty?",
        inventory: '',
        image: '',
        options: [
            {
                text: 'Go inside the building through the front door',
                nextText: 3
            },
            {
                text: 'Break the window',
                nextText: 4
            },
            {
                text: 'Interact with the blue fungus',
                nextText: 5
            },
            {
                text: 'Interact with the red fungus',
                nextText: 6
            },
            {
                text: 'Barricade the gate',
                requiredInventory: (currentInventory) => currentInventory.planks,
                nextText: 7
            }
        ]
    },



]

startGame(); // Function call to start the game