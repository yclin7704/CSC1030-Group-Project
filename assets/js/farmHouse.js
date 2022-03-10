const textElement = document.getElementById('dialogue'); // Dialogue box
const noteItem = document.getElementById('handwritten'); //Notes you find in the game
const optionButtonsElement = document.getElementById('options'); // Buttons
const inventoryElement = document.getElementById('inventory'); // Inventory
const imageElement = document.getElementById('locationImage'); // Image
const soundElement = document.createElement('audio'); //Sound
const profession = getProfession();


// This variable stores the current game state

let state = {};

// This function is called to start the game. The state is emptied and the first text node is shown.

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
    showTextNode(1);
}

// This function displays the current text node in the dialogue box. The index of the text node is required as a parameter.

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex); // Finds the text node by comparing to parameter input.
    typeSentence(textNode.text, "dialogue"); // Changes the dialogue box to text stored in the text node.
    inventoryElement.innerHTML = textNode.inventory;
    imageElement.src = textNode.image;
    noteItem.innerHTML = textNode.note;
    crossfadeAudio(textNode.sound);
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
    showTextNode(nextTextNodeId);

}

// Change the handwritten text
function changeText(){
   document.getElementById('handwritten').style.fontFamily = "Roboto Mono", 'monospace';
   document.getElementById('handwritten').style.fontSize = "1rem";
}
function revertText(){
    document.getElementById('handwritten').style.fontFamily = "Reenie Beanie", 'cursive';
    document.getElementById('handwritten').style.fontSize = "2rem";
}


// The text nodes for the game are below

const textNodes = [
    //First visit to outside of the farm house
    {
        id: 1,
        text: "Moving away from the infected city, you have stumbled upon what looks like to be and old, damaged farm house that hasn't been occupied in years. You walk toward the garden or what could have once been a lovely rose garden was now a deserted wasteland...",
        note: '',
        inventory: "",
        image: 'assets/images/farm-house-outside.jpg',
        sound: 'assets/sounds/wind.wav',
        options: [
            {
                text: 'Go in',
                nextText: 2
            }
        ]
    },
    //Outside of the farm house
    {
        id: 2,
        text: 'You look around the vicinity and you see a <u><strong>wheel barrow</strong></u>, <u><strong>a suspicious flower pot</strong></u>, <u><strong>a dirty welcome mat</strong></u> and at the side of the farm house you see what looks to be <u><strong>a shelter of some sort</strong></u>.',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-outside.jpg',
        sound: 'assets/sounds/wind.wav',
        options: [
            {
                text: 'Walk up to the door',
                nextText: 8
            },
            {
                text: 'Search the wheel barrow',
                nextText: 3
            },
            {
                text: 'Search the flower pot',
                nextText: 4
            },
            {
                text: 'Look under the welcome mat',
                nextText: 5
            },
            {
                text: 'Go inside the shelter',
                nextText: 6
            }
        ]
    },
    //Look inside the wheel barrow
    {
        id: 3,
        text: 'You look inside the wheel barrow',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-outside.jpg',
        options: [
            {
                text: 'Take torch',
                requiredState: (currentState) => !currentState.torch,
                setState: {torch:true},
                nextText: 2
            },
            {
                text: 'Leave the torch',
                requiredState: (currentState) => !currentState.torch,
                nextText: 2
            },
            {
                text: 'You have already picked up the torch',
                requiredState: (currentState) => currentState.torch,
                nextText: 2
            }
        ]
    },
    //Look inside the flower pot
    {
        id: 4,
        text: 'You look inside the flower pot and find a note',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-outside.jpg',
        options: [
            {
                text: 'Read Note',
                nextText: 7
            },
            {
                text: 'Ignore the note',
                nextText: 2
            }
        ]
    },
    //Look under the door mat
    {
        id: 5,
        text: 'You look under the welcome mat and found a key',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-outside.jpg',
        options: [
            {
                text: 'Take key',
                requiredState: (currentState) => !currentState.key,
                setState: {key:true},
                nextText: 2
            },
            {
                text: 'Ignore the key',
                requiredState: (currentState) => !currentState.key,
                nextText: 2
            },
            {
                text: 'U have already picked up the key',
                requiredState: (currentState) => currentState.key,
                nextText: 2
            }
        ]
    },
    {
        id: 6,
        text: "You go into the shelter and it is completely dark and you can't see anything down here. Maybe you need to find a light source?",
        note: '',
        inventory: '',
        iamge: '',
        options: [
            {
                text: 'Turn on torch',
                requiredState: (currentState) => currentState.torch,
                nextText: 1
            },
            {
                text: 'Go back',
                nextText: 2
            }
        ]

    },
    //reading the note
    {
        id: 7,
        text: 'You read the note and it says: <br><button onClick="changeText();" class="changeText">Change Text</button> <button onClick="revertText();" class="changeText">Revert Text</button>',
        note: "I've been in this dark place for what it feels like days. It seems like the group that has captured me is planning some cultist acts. One day, the group brought me out of the room that I was being held captive and forced me to create some sort of.... They called themselves the 'bad boys' which is really childish considering these people are like in their 40s. I hope this note reaches to the authorities to save me from this cult.",
        inventory: '',
        image: 'assets/images/farm-house-outside.jpg',
        sound: "",
        options: [
            {
                text: 'Back',
                setState: {note1:true},
                nextText: 2
            }
        ]
    },
    //Walk up to the front door
    {
        id: 8,
        text: "You walk up to the door and found out that it's locked, There is probably a key somewhere",
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-outside.jpg',
        options: [
            {
                text: 'Open the door',
                requiredState: (currentState) => currentState.key,
                nextText: 9
            },
            {
                text: 'Pick lock the door',
                requiredState: (currentState) => currentState.Mechanic,
                nextText: 9
            },
            {
                text: 'Shoot the lock off',
                requiredState: (currentState) => currentState.Hunter, //need to get gun from inventory
                nextText: 9
            },
            {
                text: 'back',
                nextText: 2
            }
        ]
    },
    //First time inside the house
    {
        id: 9,
        text: 'Upon entering the farm house, you see that it is in ruins, wallpaper discoloured. You wondered what could have possibly happened here to create this mess. Around you, there is a table on your left, a painting that has been tilted on the wall, a small fireplace beside the kitchen door, what seems like a bedroom in front of you and the kitchen to your left.',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-inside.jpg',
        options: [
            {
                text: 'Go to Bedroom',
                nextText: 0
            },
            {
                text: 'Look on the table',
                nextText: 0
            },
            {
                text: 'Look at the painting',
                nextText: 0
            },
            {
                text: 'Look inside the fireplace',
                nextText: 0
            },
            {
                text: 'Go to the kitchen',
                nextText: 0
            },
            {
                text: 'Go back outside',
                nextText: 0
            },
            {
                text: 'Wait',
                nextText: 0
            }
        ]
    },
    //inside after first time
    {
        id: 10,
        text: 'Returning back to the living room, Around you, there is a table on your left, a painting that has been tilted on the wall, a small fireplace beside the kitchen door, what seems like a bedroom in front of you and the kitchen to your left.',
        inventory: '',
        image: 'assets/images/farm-house-inside.jpg',
        options: [
            {
                text: 'Go to Bedroom',
                nextText: 0
            },
            {
                text: 'Look on the table',
                nextText: 0
            },
            {
                text: 'Look at the painting',
                nextText: 0
            },
            {
                text: 'Look inside the fireplace',
                nextText: 0
            },
            {
                text: 'Go to the kitchen',
                nextText: 0
            },
            {
                text: 'Go back outside',
                nextText: 0
            },
            {
                text: 'Wait',
                nextText: 0
            }
        ]
    },
    //Bedroom
    {
        id: 11,
        text: '',
        
    },
    //Look on the table
    {
        id: 12,
        text: ''
    },
    //Look at the painting
    {
        id: 13,
    },
    //Look inside the fireplace
    {
        id: 14,
    },
    //Go to the kitchen
    {
        id: 15,
    },
    //Go back outside
    {
        id: 16,
        text: ''
    },
    //The closet inside the bedroom
    {
        id: 17,
        text: '',
    },
    //Turn on the torch in the basement
    {
        id: 1,
        text: '',
    }
]


startGame(); // Function call to start the game