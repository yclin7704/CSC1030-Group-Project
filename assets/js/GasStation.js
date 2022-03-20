const textElement = document.getElementById('dialogue'); // Dialogue box
const optionButtonsElement = document.getElementById('options'); // Buttons
const inventoryElement = document.getElementById('inventory'); // Inventory
const imageElement = document.getElementById('locationImage');

const profession = sessionStorage.getItem("profession");


// This variable stores the current game state
let state = {};

// This function is called to start the game. The state is emptied and the first text node is shown.

function startGame() {
    console.log(profession);

    switch (profession) {
        case "Mechanic": state = { Mechanic: true }; break;
        case "Doctor": state = { Doctor: true }; break;
        case "Hunter": state = { Hunter: true }; break;
        case "War Veteran": state = { WarVeteran: true }; break;
        case "Priest": state = { Priest: true }; break;
        default: state = {}; break;
    }

    // Displays the inventory
    showInventory();
    // clears the inventory before the game starts
    clearInventory();

    showTextNode(1);

    enableTorch();
}

// Changes the text from the handwritten style to the normal font
function changeText() {
    document.getElementById('handwritten').style.fontFamily = "Roboto Mono", 'monospace';
    document.getElementById('handwritten').style.fontSize = "1.3rem";
}
// Changes the text from the normal font back to the font for handwritten notes / documents
function revertText() {
    document.getElementById('handwritten').style.fontFamily = "Reenie Beanie", 'cursive';
    document.getElementById('handwritten').style.fontSize = "2rem";
}

// This function displays the current text node in the dialogue box. The index of the text node is required as a parameter.

function showTextNode(textNodeIndex) {

    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex); // Finds the text node by comparing to parameter input.
    typeSentence(textNode.text, "dialogue", 15); // Changes the dialogue box to text stored in the text node.
    updateInventory(textNode.inventory);
    inventoryElement.innerHTML = textNode.inventory;
    imageElement.src = textNode.image;
    while (optionButtonsElement.firstChild) {
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
    const nextEventIdNodeId = option.nextEventId;
    if (nextEventIdNodeId <= 0) { // If the text node id is < 0, the game is restarted
        return startGame();
    }
    state = Object.assign(state, option.setState);
    inventory = Object.assign(inventory, option.setInventory);
    showTextNode(nextEventIdNodeId);
    updateInventory(option.setInventory);
}


// The text nodes for the game are below

const textNodes = [
    {
        id: 1,
        text: 'You find what appears to be an empty gas station. There are no signs of zombies being here, and the area seems to already be fenced off.'
            + 'You spot an old car parked around the side, however, it appears too old and beaten up to be driven anywhere. There may be some supplies in it.',
        image: '',
        options: [
            {
                text: 'Go inside to look for food and supplies',
                nextEventId: 2,
                setState: {FlashOn:true}
            },
            {
                text: 'Look around outside for supplies',
                requiredInventory: (currentInventory) => currentInventory.Gasoline === false,
                nextEventId: 3
            }
        ]
    },
    {
        id: 2,
        text: 'You quietly open the door of the gas station and a bell above the door rings. This alarms you, but there does not seem to be anybody inside.'
        + ' It\'s dark inside and the light switches don\'t seem to be working. Maybe there is a backup generator to bring the power back. ',
        image: '/assets/images/gas-station-inside.jpg',
        options: [
            {
                text: 'Begin searching for food and supplies',
                nextEventId: 4,
            },
            {
                text: 'Look for a backup generator',
                nextEventId: 28,
            }
        ]
    },
    {
        id: 28,
        text: 'You look behind the counter and find what appears to be a backup generator. You try switching it on but nothing'
        + ' happens. Upon further inspection, it looks like either a fuse is blown or the circuit breaker has tripped.',
        image: '/assets/images/gas-station-inside.jpg',
        options: [
            {
                text: 'Reset the breaker',
                nextEventId: 27
            },
            {
                text: 'Replace the fuse',
                nextEventId: 26,
                requiredInventory: (currentInventory) => currentInventory.Fuse
            },
            {
                text: 'Search for a new fuse',
                nextEventId: 25,
                requiredInventory: (currentInventory) => currentInventory.Fuse === false
            }
        ]
    },
    {
        id: 27,
        text: 'You reset the circuit breaker and try to start the generator. Nothing happens. It looks like the fuse needs replaced.',
        image: '',
        options: [
            {
                text: 'Replace the fuse',
                requiredInventory: (currentInventory) => currentInventory.Fuse,
                nextEventId: 26
            },
            {
                text: 'Search for a new fuse',
                nextEventId: 4,
                requiredInventory: (currentInventory) => currentInventory.Fuse === false
            }
        ]
    },
    {
        id: 25,
        text: ''
    },
    {
        id: 3,
        text: 'You walk around to the side of the gas station and find an old car. You cannot find the key anywhere. Maybe it was abandoned.',
        image: '/assets/images/car.jpg',
        options: [
            {
                text: 'Search for supplies in the car',
                nextEventId: 6
            },
            {
                text: 'Go inside the gas station',
                nextEventId: 2
            }
        ]
    },
    {
        id: 4,
        text: 'You continue to search through each aisle of the gas station for supplies and you find some <strong>spare parts</strong> and a <strong>fuse</strong> on one of the shelves.' +
            'It looks like the place has been looted, as you are unable to find anything else.',
        image: '/assets/images/gas-station-inside.jpg',
        options: [
            {
                text: 'Take the spare parts',
                nextEventId: 4,
                requiredInventory: (currentInventory) => currentInventory.Parts === false,
                setInventory: { Parts: true },

            },
            {
                text: 'Take the fuse',
                nextEventId: 4,
                setInventory: {Fuse: true},
                requiredInventory: (currentInventory) => currentInventory.Fuse === false,
            },
            {
                text: 'Continue to search the stock room',
                nextEventId: 8,
            },
            {
                text: 'Go back to fix the generator',
                nextEventId: 28,
            },
            {
                text: 'Go back outside to search for supplies',
                setState: { FlashOff: true },
                requiredInventory: (currentInventory) => currentInventory.Gasoline === false,
                nextEventId: 3
            }
        ]

    },
    {
        id: 5,
        text: 'The newspaper dates back 4 weeks ago, the 24th February, 1999. The article on the front page reads...<br>: ' +
            "<button onClick=\"changeText();\" class=\"changeText\">Change Text</button> <button onClick=\"revertText();\" class=\"changeText\">Revert Text</button>" +
            " <span class=\"handwritten\" id=\"handwritten\">BREAKING NEWS - First case of a new virus discovered in Alaska!!<br>An unknown virus has been discovered " +
            "in a young man - aged 32, here in Alaska. The origin of the virus is currently unknown, however, symptoms appear to include increased aggression, cognitive decline " +
            " ,foaming at the mouth and a desire to bite. Those infected are deemed to be dangerous. Currently, advice from our government is to continue as normal until more information " +
            "on the virus can be provided and to remain calm. Some people have started to panic buy essential products and fuel, which has caused a spike in fuel prices. </span>",
        image: '/assets/images/gas-station-inside.jpg',
        options: [
            {
                text: 'Continue searching for food and supplies',
                nextEventId: 4
            }
        ]
    },
    {
        id: 6,
        text: 'You find a can of petrol in the boot of the car. It is only half-full, however, night time is approaching, and it may be useful to light a fire.',
        image: '/assets/images/car.jpg',
        options: [
            {
                text: 'Take the can of gasoline and go inside',
                setInventory: { Gasoline: true },
                inventory: 'Gasoline',
                nextEventId: 2
            },
            {
                text: 'Leave the can of gasoline and go inside',
                setInventory: { Gasoline: false },
                nextEventId: 2
            }
        ]
    },
    {
        id: 8,
        text: 'You enter the stock room and feel a sudden drop in temperature. You are searching for '
            + 'supplies when you hear a noise at the back of the stock room.',
        image: '',
        options: [
            {
                text: 'Investigate the noise',
                nextEventId: 10
            },
        ]
    },
    {
        id: 10,
        text: 'You find a survivor searching for spare parts. He approaches you slowly with his hands in the air, exclaiming to you that he is trying to' +
            'fix his car so that he can leave.',
        image: '',
        options: [
            {
                text: 'Offer to help the man fix his car',
                requiredState: (currentState) => currentState.Mechanic,
                nextEventId: 14
            },
            {
                text: 'Ask him if he has any spare food or supplies',
                requiredState: (currentState) => currentState.Priest,
                nextEventId: 13
            },
            {
                text: 'Give the man the spare parts you found',
                requiredInventory: (currentInventory) => currentInventory.Parts,
                nextEventId: 11
            },
            {
                text: 'Leave the man alone',
                nextEventId: 21
            },
            {
                text: 'Attack the man to steal his food and supplies',
                nextEventId: 12
            }
        ]
    },
    {
        id: 11,
        text: 'You give the man the spare parts you found previously and he is grateful. He gives you a lighter in return. Night time is'
        + ' soon approaching, and this may be useful for lighting a fire.',
        image: '',
        options: [
            {
                text: ''
            }
        ]
    },
    {
        id: 14,
        text: 'You offer the man to help fix his car and he is grateful. He tells you he will give you a lift out of the area if you can'
            + ' get the car driving again. He gives you the key to try and start the vehicle.',
        image: '/assets/images/car.jpg',
        options: [
            {
                text: 'Try start the vehicle',
                nextEventId: 15
            },
        ]
    },
    {
        id: 15,
        text: 'You turn the key and the car fails to start.',
        image: '/assets/images/car.jpg',
        options: [
            {
                text: 'Open the bonnet',
                nextEventId: 16
            },
            {
                text: 'Check the fuel tank',
                nextEventId: 17
            }
        ]
    },
    {
        id: 16,
        text: 'You open the bonnet of a car and check the levels of all the fluids. Everything appears to be fine. It could be the'
            + ' fuel injectors or the spark plugs.',
        image: '/assets/images/car.jpg',
        options: [
            {
                text: 'Check the spark plugs',
                nextEventId: 18
            },
            {
                text: 'Check the fuel injectors',
                nextEventId: 19
            }
        ]
    },
    {
        id: 17,
        text: 'You check the fuel tank of the car and there appears to be some petrol left. This does not look to be the problem.',
        image: '/assets/images/car.jpg',
        options: [
            {
                text: 'Open the bonnet',
                nextEventId: 16
            }
        ]
    },
    {
        id: 18,
        text: 'You pull out one of the spark plugs and it appears corroded. This could be what is preventing the car from starting. ',
        image: '/assets/images/car.jpg',
        options: [
            {
                text: 'Replace the spark plugs',
                requiredInventory: (currentInventory) => currentInventory.Parts,
                nextEventId: 20
            },
            {
                text: 'Look for spare parts inside',
                nextEventId: 4
            },
            {
                text: 'Check the fuel injectors',
                nextEventId: 19
            }
        ]
    },
    {
        id: 19,
        text: 'You check the fuel injectors and they do not appear to be corroded or damaged. You give them a clean and try to start '
            + 'the car again. The car fails to start, therefore this is not the problem.',
        image: '/assets/images/car.jpg',
        options: [
            {
                text: 'Check the spark plugs',
                nextEventId: 18
            }
        ]
    },
    {
        id: 20,
        text: 'You install the new spark plugs you found inside the gas station and turn the key to start the vehicle. Although a '
            + 'struggle, the car starts. The man sticks to his word and offers you a ride.',
        image: '/assets/images/car.jpg',
        options: [
            {
                text: 'Go with him in the vehicle',
                nextEventId: 21
            },
            {
                text: 'Stay at the gas station',
                nextEventId: 22
            },
            {
                text: 'Attempt to steal the vehicle',
                nextEventId: 23
            }
        ]
    },

    /* Bad ending 2: The man you helped to fix his car betrays you and leaves youfor dead on a highway. */

    {
        id: 21,
        text: 'As you are driving along the highway, the man suddenly brakes the car and attacks you. He pushes you out of the car and drives off.'
        + 'You are attacked by zombies and killed.',
        image: '/assets/images/You-Died_TEST-GIF.gif'
    },

    /* Good ending 1: You survive the night and escape in a car. */

    {
        id: 23,
        text: 'You push the man to the ground and drive away in his car. You look in the rear view mirror and see him getting attacked'
            + ' by zombies. You survive the night and escape.'
    },

    {
        id: 22,
        text: 'You decide to stay at the gas station and the man leaves in his car.',
        image: '',
        options: [
            {
                text: 'Prepare for the night',
                nextEventId: 29
            }
        ]
    },
    {
        id: 29,
        text: 'It is almost night time and you need to find somewhere to sleep. ' +
            'Barricade the doors or windows to prevent zombies from attacking you.',
        image: '',
        options: [
            {
                text: 'Break up the shelves for wood',
                nextEventId: 30,
                setInventory: { Wood: true }
            },
            {
                text: 'Barricade the windows using wood from the shelves',
                nextEventId: 31,
                setState: { Windows: true },
                requiredInventory: (currentInventory) => currentInventory.Wood
            },
            {
                text: 'Barricade the doors using wood from the shelves',
                nextEventId: 32,
                setState: { Doors: true },
                requiredInventory: (currentInventory) => currentInventory.Wood
            },
            {
                text: 'Prepare a fire using wood from the shelves and the gasoline',
                nextEventId: 33,
                setState: { Fire: true },
                requiredInventory: (currentInventory) => currentInventory.Gasoline,
                requiredInventory: (currentInventory) => currentInventory.Wood
            },
            {
                text: 'Light the fire using the lighter',
                nextEventId: 34,
                setState: { FireLit: true },
                requiredInventory: (currentInventory) => currentInventory.Lighter
            },
            {
                text: 'Finish preparation',
                nextEventId: 35,
                setState: { Finished: true },
            }
        ]
    },
    {
        id: 30,
        text: 'You pull the shelves apart into planks of wood. Maybe this can be used to barricade the area or to build a fire.',

        image: '',
        options: [
            {
                text: 'Continue preparation',
                nextEventId: 29
            },
            {
                text: 'Finish preparation',
                nextEventId: 35,
                setState: { Finished: true }
            }
        ]
    },
    {
        id: 31,
        text: 'You use the planks from the shelves to barricade the windows to prevent zombies from entering during the night.',
        image: '',
        options: [
            {
                text: 'Continue preparation',
                nextEventId: 29
            },
            {
                text: 'Finish preparation',
                nextEventId: 35,
                setState: { Finished: true }
            }
        ]
    },
    {
        id: 32,
        text: 'You use the planks from the shelves to barricade the doors to prevent zombies from entering during the night.',
        image: '',
        options: [
            {
                text: 'Continue preparation',
                nextEventId: 29
            },
            {
                text: 'Finish preparation',
                nextEventId: 35,
                setState: { Finished: true }
            }
        ]
    },
    {
        id: 33,
        text: 'You set up for a fire using the planks from the shelves and pour gasoline over them. You need something to start the fire with.',
        image: '',
        options: [
            {
                text: 'Use the lighter',
                requiredInventory: (currentInventory) => currentInventory.Lighter,
                nextEventId: 34
            },
            {
                text: 'Look for a lighter',
                requiredState: (currentState) => currentState.LighterMissing,
                nextEventId: 9
            }
        ]
    },
    {
        id: 34,
        text: 'You manage to get the fire going, and the temperature starts to rise again.',
        image: '',
        options: [
            {
                text: 'Continue preparation',
                nextEventId: 29
            },
            {
                text: 'Finish preparation',
                nextEventId: 35
            }
        ]
    },
    {
        /*
        Bad ending 1: In an attempt to attack a survivor for supplies, he stabs you in self defence and you bleed to death. 
        */

        id: 12,
        text: 'The man panics and stabs you with a piece of glass from one of the broken windows. He leaves and you bleed out and die.',
        image: '/assets/images/You-Died_TEST-GIF.gif',
        options: []
    }

]

startGame(); // Function call to start the game