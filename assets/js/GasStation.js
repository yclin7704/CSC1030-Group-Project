const textElement = document.getElementById('dialogue'); // Dialogue box
const optionButtonsElement = document.getElementById('options'); // Buttons
const inventoryElement = document.getElementById('inventory'); // Inventory
const imageElement = document.getElementById('locationImage');
const profession = getProfession();

var myTimer;
var duration;


// This variable stores the current game state

let state = {};

let inventory = {};

// This function is called to start the game. The state is emptied and the first text node is shown.

function startTimer() {
    myTimer = setInterval('countdown()', 1000)
}

function stopTimer() {
    clearInterval(myTimer);
}

function countdown(seconds) {
    console.log('The zombies are attacking... run!')
    duration = seconds;
    duration --;
    if (duration >= 0) {
    document.getElementById('timer').innerHTML = duration;
    } else {
        stopTimer();
    }
}

function startGame(){
    if (profession === 'Mechanic') {
        state = {Mechanic:true}
    }
    else if (profession === 'Medic') {
        state = {Medic:true};
    }
    else if (profession === 'Hunter') {
        state = {Hunter:true};
    }
    else if (profession === 'War Veteran') {
        state = {WarVeteran:true}
    }
    else if (profession === 'Priest') {
        state = {Priest:true}
    }
    else {
        state = {};
    }
    inventory = {};
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
        text: 'You find what appears to be an empty gas station. However, the building is surrounded by fences, which creates suspicion that someone may be inside...',
        inventory: '',
        image: 'assets/images/GasStation.jpg',
        options: [
            {
                text: 'Cut the fence',
                requiredInventory: (currentInventory) => currentInventory.boltcutters,
                nextText: 2
            },
            {
                text: 'Hop the fence',
                nextText: 6
            }
        ]
    },
    {
        id: 2,
        text: 'You need a tool to cut the fence. You see a shed around the side of the petrol station. Maybe you can find something to use in there.',
        inventory: '',
        image: 'assets/images/GasStation.jpg',
        options: [
            {
                text: 'Look in the shed',
                setState: {
                    attack:true
                },
                nextText: 3,
            },
            {
                text: 'Hop the fence',
                nextText: 6
            }
        ]
    },
    {
        id: 3,
        text: 'You open the door of the shed and knock over a shovel leaning against a wall. It makes a loud noise which alerts zombies nearby. You have to think fast.',
        image: 'assets/images/shed-inside.jpg',
        options: [
            {
                text: 'Open the drawers'
            },
            {
                text: 'Look under the table'
            }
        ]
    }


]

startGame(); // Function call to start the game