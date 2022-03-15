const textElement = document.getElementById('dialogue'); // Dialogue box
const optionButtonsElement = document.getElementById('options'); // Buttons
const inventoryElement = document.getElementById('inventory'); // Inventory
const imageElement = document.getElementById('locationImage');

let profession = sessionStorage.getItem("profession");


// This variable stores the current game state
let state = {};

let inventory = {};

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
    inventory = {};
    showTextNode(1);
}

// This function displays the current text node in the dialogue box. The index of the text node is required as a parameter.

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex); // Finds the text node by comparing to parameter input.
    typeSentence(textNode.text, "dialogue", 15); // Changes the dialogue box to text stored in the text node.
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
            button.addEventListener('click', () => showInventory());
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

function showInventory() {
    for (let [key, value] of Object.entries(inventory)) {
        if (value === true) {
            document.getElementById('inventory').innerHTML += "<br>" + key;
        }
    }
}

// The text nodes for the game are below

const textNodes = [
    {
        id: 1,
        text: 'You find what appears to be an empty gas station. There are no signs of zombies being here, and the area seems to already be fenced off.'
            + 'Maybe it was closed before the outbreak developed... It could be the perfect place to spend the night.',
        inventory: '',
        image: '/assets/images/GasStation.jpg',
        options: [
            {
                text: 'Go inside to look for food and supplies',
                setInventory: {Gasoline: false},
                nextText: 2
            },
            {
                text: 'Look around outside for supplies',
                nextText: 3
            }
        ]
    },
    {
        id: 2,
        text: 'You quietly open the door of the gas station and a bell above the door rings. This alarms you, but there does not seem to be anybody inside.'
            + 'You find an old newspaper lying on the ground.',
        inventory: '',
        image: '/assets/images/gas-station-inside.jpg',
        options: [
            {
                text: 'Continue searching for food and supplies',
                nextText: 4,
            },
            {
                text: 'Pick up and read the newspaper',
                nextText: 5,
            },
            {
                text: 'Look for spark plugs',
                nextText: 9,
                requiredState: (currentState) => currentState.Mechanic === true
            }
        ]
    }
    ,
    {
        id: 3,
        text: 'You walk around to the back of the gas station and find an old car.',
        inventory: '',
        image: '/assets/images/car.jpg',
        options: [
            {
                text: 'Search for supplies in the car',
                nextText: 6
            },
            {
                text: 'Try to start the car',
                requiredState: (currentState) => currentState.Mechanic === true,
                nextText: 7
            }
        ]
    },
    {
        id: 4,
        text: 'You walk through each aisle of the gas station in search of supplies, but to no avail.' +
            'It looks like the place has been looted already.',
        inventory: '',
        image: '/assets/images/gas-station-inside.jpg',
        options: [
            {
                text: 'Search for supplies in the stock room',
                nextText: 8
            },
            {
                text: 'Go back outside to search for supplies',
                requiredState: (currentState) => currentState.Gasoline === false,
                nextText: 3
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
        inventory: '',
        image: '/assets/images/gas-station-inside.jpg',
        options: [
            {
                text: 'Continue searching for food and supplies',
                nextText: 4
            }
        ]
    },
    {
        id: 6,
        text: 'You find a can of petrol in the boot of the car. It is only half-full, however, night time is approaching, and it may be useful to light a fire.',
        inventory: '',
        image: '/assets/images/car.jpg',
        options: [
            {
                text: 'Take the can of gasoline and go inside',
                setInventory: { Gasoline: true },
                inventory: 'Gasoline',
                nextText: 2
            },
            {
                text: 'Leave the can of gasoline and go inside',
                setInventory: { Gasoline: false },
                nextText: 2
            }
        ]
    },
    {
        id: 7,
        text: 'Your skills as a former Mechanic allow you to make an attempt at hotwiring the car. The car fails to start so you lift up the bonnet and inspect the engine. '
            + 'It looks like the spark plugs are damaged.',
        inventory: '',
        image: '/assets/images/car.jpg',
        options: [
            {
                text: 'Go inside the gas station',
                nextText: 2
            }
        ]
    },
    {
        id: 8,
        text: 'You find yourself in the stock room of the gas station. You are searching for supplies when you hear a noise at the back of the stock room.',
        inventory: '',
        image: '',
        options: [
            {
                text: 'Investigate the noise',
                nextText: 10
            },
            {
                text: 'Continue searching for supplies',
                nextText: 9
            }
        ]
    },
    {
        id: 9,
        text: 'You fail to find anything that could be useful to you in the stock room except for an old lighter lying underneath one of the shelves. Night time is approaching' +
            ' and it may be useful for lighting a fire.',
        inventory: '',
        image: '',
        options: [
            {
                text: 'Take the old lighter and search the back of the stock room',
                nextText: 10,
                setState: { Lighter: true }
            },
            {
                text: 'Leave the old lighter and search the back of the stock room',
                nextText: 10,
                setState: { Lighter: false }
            }
        ]
    },
    {
        id: 10,
        text: 'You find a survivor searching for supplies. He approaches you slowly with his hands in the air, exclaiming to you that he is trying to' +
            'fix his car so that he can leave.',
        inventory: '',
        image: '',
        options: [
            {
                text: 'Offer to help the man fix his car',
                requiredState: (currentState) => currentState.Mechanic,
                nextText: 14
            },
            {
                text: 'Ask him if he has any spare food or supplies',
                requiredState: (currentState) => currentState.Priest,
                nextText: 13
            },
            {
                text: 'Leave the man alone',
                nextText: 11
            },
            {
                text: 'Attack the man to steal his food and supplies',
                nextText: 12
            }
        ]
    },
    {
        id: 11,
        text: 'The man goes outside to fix his car. It is almost night time and you need to find somewhere to sleep. ' +
            'Barricade the doors or windows to prevent zombies from attacking you.',
        inventory: '',
        image: '',
        options: [
            {
                text: ''
            }
        ]
    },
    {
        /*
        Bad ending 1: In an attempt to attack a survivor for supplies, he stabs you in self defence and you bleed to death. 
        */

        id: 12,
        text: 'The man panics and stabs you with a piece of glass from one of the broken windows. He leaves and you bleed out and die.'
    }

]

startGame(); // Function call to start the game