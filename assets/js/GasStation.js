const textElement = document.getElementById('dialogue'); // Dialogue box
const optionButtonsElement = document.getElementById('options'); // Buttons
const inventoryElement = document.getElementById('inventory'); // Inventory
const imageElement = document.getElementById('locationImage');
const soundElement = document.createElement("audio");
const profession = sessionStorage.getItem("profession");
const playerName = sessionStorage.getItem("playerName");


let state = getGameState();                                    

function getGameState() {
	let savedData = sessionStorage.getItem("GasStationGameState");
	console.log(savedData);
	if (savedData) return JSON.parse(savedData);
	else
		return {
			profession: profession
		};
}
// This function is called to start the game. The state is emptied and the first text node is shown.

function startGame() {
    console.log(profession);
    console.log(playerName);

    switch(profession){
        case "Mechanic": state["Mechanic"] = true; break;
        case "Doctor": state["Doctor"] = true; break;
        case "Hunter": state["Hunter"] = true; break;
        case "War Veteran": state["WarVeteran"] = true; break;
        case "Priest": state["Priest"] = true; break;
    }

    // Displays the inventory
    showInventory();
    // clears the inventory before the game starts
    clearInventory();
    
    showTextNode(1);

    displayPlayerName();

    setTimerData(showTextNode, 29, 35);

    setTemperatureData(showTextNode, 37, 37);
}

function displayPlayerName() {
    document.getElementById('playerSpan').innerHTML = playerName + '<br>';
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
    if (textNodeIndex === "warehouse") {
        state.leftLocation = true;
        // Save the current game state to session storage
        sessionStorage.setItem("GasStationGameState", JSON.stringify(state));
    
        window.location.href = "./Warehouse.html";
    }

    const torchOn = [2, 26];

    for (i = 0; i < torchOn.length; i++) {
        if (textNodeIndex === torchOn[i]) {
            setTorch(!getIsTorchOn());
            break;
        }
    }
    if (!state.LightsOff) setTorch(false);

    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex); // Finds the text node by comparing to parameter input.
    typeSentence(textNode.text, "dialogue", 15); // Changes the dialogue box to text stored in the text node.
    updateInventory(textNode.inventory);
    playSound(textNode.sound);
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
            sessionStorage.setItem("GasStationGameState", JSON.stringify(state));
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
    updateInventory(option.setInventory);
    showTextNode(nextEventIdNodeId);
    changeTemp(option.tempChange);
}

// The text nodes for the game are below

const textNodes = [
    {
        id: 1,
        text: 'You make it out of the woods and stumble across an old gas station at the side of the road. The area is fenced'
            + ' off and you notice a car parked outside, however, it looks too old and beaten up to be driven anywhere. There is a message'
            + ' sprayed on the wall: <i><strong>"Don\'t trust anybody!"</strong></i>. You find a gap in the fence and stand outside the front entrance.'
            + ' There are some wood planks lying around the windows.',
        image: './assets/images/gas-station.jpg',
        inventory: '',
        options: [
            {
                text: 'Go inside',
                nextEventId: 2,
                setInventory: { Gasoline: false },
                setState: { LightsOff: true }
            },
            {
                text: 'Look around outside',
                tempChange: 'decrease',
                nextEventId: 3
            },
            {
                text: 'Take the wood planks',
                setInventory: {'Wood Planks':true},
                requiredState: (currentState) => !currentState.WoodPlanks,
                setState: {WoodPlanks:true},
                tempChange: 'decrease',
                nextEventId: 1.2
            },
            {
                text: 'Return to warehouse',
                nextEventId: 'warehouse',
                tempChange: 'decrease',
            }
        ]
    },
    {
        id: 1.2,
        text: 'You take the wood planks.',
        image: './assets/images/gas-station.jpg',
        inventory: '',
        options: [
            {
                text: 'Go inside',
                nextEventId: 2,
                setInventory: { Gasoline: false },
                setState: { LightsOff: true }
            },
            {
                text: 'Look around outside',
                tempChange: 'decrease',
                nextEventId: 3
            },
        ]
    },
    {
        id: 1.5,
        text: 'You make it back to the old gas station at the side of the road. You go back through the gap in the fence and  '
        + 'stand outside the front entrance.',
        image: './assets/images/gas-station.jpg',
        inventory: '',
        options: [
            {
                text: 'Go inside',
                nextEventId: 2,
                setInventory: { Gasoline: false },
                setState: { LightsOff: true }
            },
            {
                text: 'Look around outside',
                tempChange: 'decrease',
                nextEventId: 3
            },
            {
                text: 'Take the wood planks',
                setInventory: {'Wood Planks':true},
                requiredState: (currentState) => !currentState.WoodPlanks,
                setState: {WoodPlanks:true},
                tempChange: 'decrease',
                nextEventId: 1.2
            },
            {
                text: 'Return to warehouse',
                nextEventId: 'warehouse',
                tempChange: 'decrease',
            }
        ]
    },
    {
        id: 2,
        text: 'You slowly open the door and it creaks loudly. This startles you, but there does not seem to be any zombies inside or nearby... not yet at least.'
            + ' It\'s dark inside and the light switches don\'t seem to be working. You have a flashlight, but maybe there is a backup generator to bring the power back. ',
        image: './assets/images/gas-station_inside.jpg',
        sound: './assets/sounds/door.wav',
        inventory: '',
        options: [
            {
                text: 'Search for supplies',
                setState:{Generator:false},
                nextEventId: 4,
            },
            {
                text: 'Look for a backup generator',
                setState: { Breaker: true, Generator:true },
                nextEventId: 28,
            }
        ]
    },
    {
        id: 28,
        text: 'You look behind the counter and find a backup generator. You try switching it on but nothing'
            + ' happens. Upon further inspection, it looks like either a fuse has blown or the circuit breaker has tripped. There'
            + ' might be some spare fuses on one of the shelves.',
        image: './assets/images/gas-station_inside.jpg',
        inventory: '',
        options: [
            {
                text: 'Reset the breaker',
                nextEventId: 27
            },
            {
                text: 'Replace the fuse',
                nextEventId: 26,
                requiredInventory: { 'Fuse': true },
                setInventory: { Fuse: false},
                setState: { LightsOff: false }
            },
            {
                text: 'Search for a new fuse',
                nextEventId: 4,
                requiredInventory: { 'Fuse': false },
                setState:{Generator:true}
            }
        ]
    },
    {
        id: 27,
        text: 'You reset the circuit breaker in the generator and try switching it on...\nNothing happens. It looks like the fuse needs replaced'
            + ' There might be some spare fuses on one of the shelves.',
        image: './assets/images/gas-station_inside.jpg',
        inventory: '',
        sound: "/assets/sounds/breaker.wav",
        options: [
            {
                text: 'Replace the fuse',
                requiredInventory: { 'Fuse': true },
                setInventory: {Fuse : false},
                setState: { LightsOff: false },
                nextEventId: 26
            },
            {
                text: 'Search for a new fuse',
                nextEventId: 4,
                requiredInventory: { 'Fuse': false }
            }
        ]
    },
    {
        id: 26,
        text: 'You replace the fuse in the generator and try switching it on...\nThe lights come back on and the electricity is restored.'
            + ' You start to look for supplies when you notice an old <strong>newspaper</strong> lying on the ground.',
        image: './assets/images/gas-station_inside.jpg',
        inventory: '',
        sound: './assets/sounds/lightswitch.wav',
        options: [
            {
                text: 'Pick up and read the newspaper',
                nextEventId: 5
            },
            {
                text: 'Search the stock room',
                tempChange: 'decrease',
                nextEventId: 8
            }
        ]
    },
    {
        id: 3,
        text: 'You approach the car you found earlier in the hope that you can find some useful supplies inside. You open the glovebox and'
            + ' find a <strong>matches</strong> inside. You open the boot and find a can of <strong>gasoline</strong>. These items could be useful'
            + ' for lighting a fire to keep warm.',
        image: './assets/images/car.jpg',
        inventory: '',
        sound: './assets/sounds/carboot.wav',
        options: [
            {
                text: 'Take the matches',
                nextEventId: 39,
                tempChange: 'decrease',
                requiredInventory: { 'Matches': false },
                setInventory: { Matches: true }
            },
            {
                text: 'Take the gasoline',
                nextEventId: 40,
                tempChange: 'decrease',
                requiredInventory: { 'Gasoline': false },
                setInventory: { Gasoline: true }
            },
            {
                text: 'Go inside',
                nextEventId: 2,
                setState: { LightsOff: true }
            }
        ]
    },
    {
        id: 39,
        text: 'You take the <strong>Matches</strong>.',
        image: './assets/images/car.jpg',
        inventory: '',
        options: [
            {
                text: 'Take the gasoline',
                nextEventId: 40,
                tempChange: 'decrease',
                requiredInventory: { 'Gasoline': false },
                setInventory: { Gasoline: true }
            },
            {
                text: 'Go inside',
                nextEventId: 2,
                setState: { LightsOff: true }
            }
        ]
    },
    {
        id: 40,
        text: 'You take the <strong>gasoline</strong>.',
        image: './assets/images/car.jpg',
        inventory: '',
        options: [
            {
                text: 'Take the matches',
                nextEventId: 39,
                tempChange: 'decrease',
                requiredInventory: { 'Matches': false },
                setInventory: { Matches: true }
            },
            {
                text: 'Go inside',
                nextEventId: 2,
                setState: { LightsOff: true }
            }
        ]
    },
    {
        id: 4,
        text: 'You wander through each aisle of the gas station and you find some spare <strong>parts</strong> and a <strong>fuse</strong>.'
            + ' You tear the place apart and fail to find anything else. The stock room may have some useful'
            + ' supplies.',
        image: './assets/images/gas-station_inside.jpg',
        inventory: '',
        options: [
            {
                text: 'Take the parts',
                nextEventId: 45,
                requiredInventory: { 'Parts': false },
                setInventory: { Parts: true },

            },
            {
                text: 'Take the fuse',
                nextEventId: 41,
                setInventory: { Fuse: true },
                requiredInventory: { Fuse: false }
            },
            {
                text: 'Search the stock room',
                tempChange: 'decrease',
                nextEventId: 8,
            },
            {
                text: 'Go back to fix the generator',
                nextEventId: 28,
                requiredState: (currentState) => currentState.LightsOff && currentState.Generator,
            },
            {
                text: 'Look for a backup generator',
                nextEventId: 28,
                requiredState: (currentState) => !currentState.Generator
            }
        ]

    },
    {
        id: 45,
        text: 'You take the parts.',
        image: './assets/images/gas-station_inside.jpg',
        inventory: '',
        options: [
            {
                text: 'Take the fuse',
                nextEventId: 41,
                requiredInventory: { Fuse: false },
                setInventory: { Fuse: true },
                requiredState: (currentState) => !currentState.SearchParts
            },
            {
                text: 'Search the stock room',
                nextEventId: 8,
                setState: { SearchSupplies: false },
                tempChange: 'decrease',
                requiredState: (currentState) => !currentState.SearchParts
            },
            {
                text: 'Go back and fix the generator',
                nextEventId: 28,
                requiredState: (currentState) => currentState.LightsOff && !currentState.SearchParts,
            },
            {
                text: 'Give the man the parts you found',
                nextEventId: 11,
                tempChange: 'decrease',
                setInventory:{ Parts:false },
                requiredState: (currentState) => currentState.SearchParts
            }
        ]
    },
    {
        id: 41,
        text: 'You take the fuse.',
        image: './assets/images/gas-station_inside.jpg',
        inventory: '',
        options: [
            {
                text: 'Take the parts',
                nextEventId: 45,
                requiredInventory: { 'Parts': false }
            },
            {
                text: 'Search the stock room',
                tempChange: 'decrease',
                setState: { SearchSupplies: false },
                nextEventId: 8
            },
            {
                text: 'Go back and fix the generator',
                nextEventId: 28,
                requiredState: (currentState) => currentState.LightsOff
            }
        ]
    },
    {
        id: 42,
        text: 'You return back to the shop floor to search for the parts. You find some spare <strong>parts</strong> lying'
            + ' amongst the rubble.',
        image: './assets/images/gas-station_inside.jpg',
        inventory: '',
        options: [
            {
                text: 'Take the parts and return to the stranger',
                nextEventId: 45,
                setInventory:{Parts:true},
                requiredState: (currentState) => !currentState.SparkPlugs
            },
            {
                text: 'Take the parts and return to fix the car',
                nextEventId: 18,
                setInventory:{Parts:true},
                requiredState: (currentState) => currentState.SparkPlugs
            }
        ]
    },
    {
        id: 5,
        text: 'The newspaper dates back 4 weeks ago, the 24th February, 1999. The article on the front page reads...<br>: ' +
            '<button onClick=\"changeText();\" class=\"changeText\">Change Text</button> <button onClick=\"revertText();\" class=\"changeText\">Revert Text</button>' +
            ' <span class=\"handwritten\" id=\"handwritten\">BREAKING NEWS - First case of a new virus discovered in Alaska!!<br>An unknown virus has been discovered ' +
            ' in a young man - aged 32, here in Alaska. The origin of the virus is currently unknown, however, symptoms appear to include increased aggression, cognitive decline ' +
            ' ,foaming at the mouth and a desire to bite. Those infected are deemed to be dangerous. Currently, advice from our government is to continue as normal until more information ' +
            ' on the virus can be provided and to remain calm. Some people have started to panic buy essential products and fuel, which has caused a spike in fuel prices. </span>',
        image: './assets/images/gas-station_inside.jpg',
        inventory: '',
        sound: './assets/sounds/newspaper.wav',
        options: [
            {
                text: 'Continue searching for food and supplies',
                nextEventId: 4,
                requiredInventory: { 'Parts': false, 'Fuse': false },
            },
            {
                text: 'Search the stock room',
                tempChange: 'decrease',
                nextEventId: 8
            }
        ]
    },
    {
        id: 8,
        text: 'You barge through the jammed door of the stock room and feel the temperature suddenly drop. You look for supplies, but'
            + ' everything seems to have been taken. This could be a safe location to spend the night with a bit of preparation.'
            + ' You hear a noise coming from outside...',
        image: './assets/images/gas-station_stock-room.jpg',
        inventory: '',
        sound: './assets/sounds/pennydrop.wav',
        options: [
            {
                text: 'Investigate the noise',
                tempChange: 'decrease',
                nextEventId: 10
            },
            {
                text: 'Prepare for the night',
                tempChange: 'decrease',
                nextEventId: 29
            }
        ]
    },
    {
        id: 10,
        text: 'You find another survivor searching for supplies. You approach him slowly and he says: '
            + '\n<i>"I don\'t mean you any harm. I\'m trying to fix my car so I came here in the hope I could find some parts, but '
            + 'I haven\'t been able to find anything. Can you help me find the parts I need?"</i>',
        image: './assets/images/gas-station_stock-room.jpg',
        inventory: '',
        options: [
            {
                text: 'Offer to help fix his car',
                requiredState: (currentState) => currentState.Mechanic,
                nextEventId: 14
            },
            {
                text: 'Give him the parts you found',
                requiredInventory: { 'Parts': true },
                setInventory: { Parts: false },
                setInventory:{Knife:true},
                tempChange: 'decrease',
                nextEventId: 11
            },
            {
                text: 'Help him search for the parts',
                requiredInventory: {'Parts':false},
                setState: { SearchParts: true },
                tempChange: 'decrease',
                nextEventId: 42
            },
            {
                text: 'Attack him and steal his supplies',
                nextEventId: 12
            }
        ]
    },
    {
        id: 11,
        text: '<i>"Thank you! I\'ve been searching everywhere for these. Take this <strong>knife</strong> to protect yourself from the zombies."</i>',
        image: './assets/images/gas-station_stock-room.jpg',
        inventory: '',
        sound: './assets/sounds/knifeholster.wav',
        options: [
            {
                text: 'Prepare for the night',
                nextEventId: 29
            },
            {
                text: 'Offer to help fix his car',
                requiredState: (currentState) => currentState.Mechanic,
                setState: {FixCar:true},
                nextEventId: 14
            },
            {
                text: 'Attack him and steal his supplies',
                nextEventId: 12
            }
        ]
    },
    {
        id: 14,
        text: 'You tell the man you\'re a mechanic and offer to help him fix his car. He says:'
            + '\n<i>"Really?! I\'d really appreciate that. If you can get her driving again, I\'ll take you anywhere you need to go."</i>',
        image: './assets/images/car.jpg',
        inventory: '',
        options: [
            {
                text: 'Try start the vehicle',
                nextEventId: 15
            },
        ]
    },
    {
        id: 15,
        text: 'You push the clutch in and turn the key...\nThe car doesn\'t start.',
        image: './assets/images/car.jpg',
        sound: './assets/sounds/carstall.wav',
        inventory: '',
        options: [
            {
                text: 'Open the bonnet',
                nextEventId: 16
            },
            {
                text: 'Check if there\'s fuel left',
                nextEventId: 17
            }
        ]
    },
    {
        id: 16,
        text: 'You open the bonnet of a car and at a first glance, everything appears to be fine. Upon further inspection, it looks like it could be faulty'
            + ' fuel injectors or spark plugs.',
        image: './assets/images/car_engine-bay.jpg',
        sound: './assets/sounds/carbonnet.wav',
        inventory: '',
        options: [
            {
                text: 'Inspect the spark plugs',
                nextEventId: 18
            },
            {
                text: 'Inspect the fuel injectors',
                nextEventId: 19
            }
        ]
    },
    {
        id: 17,
        text: 'You check the fuel level and there is some petrol left. This doesn\'t look to be the problem.',
        image: './assets/images/car.jpg',
        inventory: '',
        sound: './assets/sounds/fuelcap.wav',
        options: [
            {
                text: 'Open the bonnet',
                nextEventId: 16
            }
        ]
    },
    {
        id: 18,
        text: 'You inspect one of the spark plugs and it appears to be corroded.',
        image: './assets/images/car_engine-bay.jpg',
        inventory: '',
        options: [
            {
                text: 'Replace the spark plugs',
                requiredInventory: { 'Parts': true },
                setInventory: { Parts: false },
                nextEventId: 20
            },
            {
                text: 'Replace the spark plugs',
                requiredState: (currentState) => currentState.FixCar,
                setInventory: {Parts:false},
                nextEventId: 20
            },
            {
                text: 'Look for spare parts inside',
                requiredInventory: { 'Parts': false },
                setState: {SparkPlugs:true},
                requiredState: (currentState) => !currentState.FixCar,
                nextEventId: 42
            },
            {
                text: 'Check the fuel injectors',
                nextEventId: 19
            }
        ]
    },
    {
        id: 19,
        text: 'You inspect the fuel injectors and they do not appear to be corroded or damaged. You clean them and try to start '
            + 'the car again...\nThe car fails to start, therefore the fuel injectors are not the problem.',
        image: './assets/images/car_engine-bay.jpg',
        sound: './assets/sounds/carstall.wav',
        inventory: '',
        options: [
            {
                text: 'Inspect the spark plugs',
                nextEventId: 18
            }
        ]
    },
    {
        id: 20,
        text: 'You install the new spark plugs you found inside the gas station and turn the key to start the vehicle...\nAlthough a '
            + 'struggle, the car starts.'
            + '\n<i>"Wow! You fixed it! Thanks so much! Where would you like to go?"</i>',
        image: './assets/images/car.jpg',
        sound: './assets/sounds/carignition.wav',
        inventory: '',
        options: [
            {
                text: 'Go with the man in his vehicle',
                nextEventId: 21
            },
            {
                text: 'Stay at the gas station and prepare for the night',
                tempChange: 'decrease',
                requiredState: (currentState) => currentState.FixCar,
                nextEventId: 29
            },
            {
                text: 'Stay at the gas station and prepare for the night',
                tempChange: 'decrease',
                requiredState: (currentState) => !currentState.FixCar,
                nextEventId: 55
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
        text: 'You are driving along the highway when the man suddenly brakes the car and attacks you. He pushes you out of the car and '
            + 'you are attacked by zombies as you watch him driving away... \n Remember: don\'t trust anybody.'
            + '<b><em>You Died!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>',
        image: './assets/images/You-Died_TEST-GIF.gif',
        sound: './assets/sounds/brakescreech.flac',
        inventory: '',
        options: []
    },

    /* Good ending 1: You survive the night and escape in a car. */

    {
        id: 23,
        text: 'You push the man to the ground and drive away in his car. You look in the rear view mirror and see him getting attacked'
            + ' by zombies. You survive the night and escape.'
            + '<b><em>You Escaped!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>',
        image: './assets/images/Victory2_TEST-GIF.gif',
        sound: './assets/sounds/driveoff.wav',
        inventory: '',
        options: []
    },
    {
        id: 55,
        text: '<i>"Take this knife to protect yourself</i>',
        image: './assets/images/car.jpg',
        sound: './assets/sounds/knifeholster.wav',
        inventory,
        options:[
            {
                text: 'Prepare for the night',
                setInventory: {Knife:true},
                nextEventId: 29
            }
        ]
    },
    {
        id: 29,
        text: 'You need to prepare to survive through the night.' +
            ' You can barricade the doors or windows to prevent zombies from attacking you. You can also light a fire to prevent'
            + ' developing hypothermia from the freezing temperatures.',
        image: './assets/images/gas-station_stock-room.jpg',
        inventory: '',
        options: [
            {
                text: 'Break up the shelves for wood',
                nextEventId: 30,
                setInventory: { 'Wood Planks': true },
                requiredState: (currentState) => !currentState.Wood
            },
            {
                text: 'Barricade the windows using the wood from the shelves',
                nextEventId: 31,
                requiredState: (currentState) => !currentState.Windows,
                setInventory: {'Wood Planks':false},
                requiredInventory: { 'Wood Planks': true },
            },
            {
                text: 'Barricade the doors using the wood from the shelves',
                nextEventId: 32,
                requiredInventory: { 'Wood Planks': true },
                setInventory:{'Wood Planks':false},
                requiredState: (currentState) => !currentState.Doors,
            },
            {
                text: 'Prepare a fire using wood from the shelves and the gasoline from the car',
                nextEventId: 33,
                requiredInventory: { 'Gasoline': true },
                requiredInventory: { 'Wood Planks': true },
                setInventory: {'Wood Planks':false, Gasoline:false},
                requiredState: (currentState) => !currentState.Fire
            },
            {
                text: 'Light the fire using the matches',
                nextEventId: 34,
                requiredState: (currentState) => !currentState.Matches,
                requiredState: (currentState) => currentState.Fire,
                requiredInventory: { 'Matches': true },
                setInventory:{Matches:false},
                tempChange: 'increase'
            },
            {
                text: 'Finish preparation',
                nextEventId: 53,
                setState: { Finished: true },
            }
        ]
    },
    {
        id: 30,
        text: 'You break the shelves into planks of wood. These can be used to barricade the windows or doors.',
        image: './assets/images/gas-station_stock-room.jpg',
        inventory: '',
        sound: './assets/sounds/breakshelves.wav',
        options: [
            {
                text: 'Continue preparation',
                setState: { Wood: true },
                nextEventId: 29,
            },
            {
                text: 'Finish preparation',
                nextEventId: 53,
                setState: { Finished: true }
            }
        ]
    },
    {
        id: 31,
        text: 'You use the wood planks to barricade the windows.',
        image: './assets/images/gas-station_stock-room.jpg',
        inventory: '',
        sound: './assets/sounds/hammer.wav',
        options: [
            {
                text: 'Continue preparation',
                setState: { Windows: true },
                nextEventId: 29,
            },
            {
                text: 'Finish preparation',
                nextEventId: 53,
                setState: { Finished: true }
            }
        ]
    },
    {
        id: 32,
        text: 'You use the wood planks to barricade the doors.',
        image: './assets/images/gas-station_stock-room.jpg',
        sound: './assets/sounds/hammer.wav',
        inventory: '',
        options: [
            {
                text: 'Continue preparation',
                setState: { Doors: true },
                nextEventId: 29,
            },
            {
                text: 'Finish preparation',
                nextEventId: 53,
                setState: { Finished: true }
            }
        ]
    },
    {
        id: 33,
        text: 'You set up a fire using the wood planks and pour gasoline over them. You need something to start the fire with.',
        image: './assets/images/gas-station_stock-room.jpg',
        inventory: '',
        sound: './assets/sounds/gasoline.wav',
        options: [
            {
                text: 'Use the matches',
                requiredInventory: { 'Matches': true },
                setInventory: { Matches: false },
                setInventory: {'Wood Planks':false, Gasoline:false},
                setState: { Fire: true},
                nextEventId: 34
            },
            {
                text: 'Abandon the fire',
                requiredInventory: { 'Matches': false },
                setInventory: {'Wood Planks':false, Gasoline:false},
                setState: { Fire: false },
                nextEventId: 29
            }
        ]
    },
    {
        id: 34,
        text: 'You light the fire and the temperature starts to rise again.',
        image: './assets/images/fire_gas-station.jpg',
        sound: './assets/sounds/Fire.mp3',
        inventory: '',
        options: [
            {
                text: 'Continue preparation',
                setState: { Matches: true },
                setInventory: {Matches:false},
                nextEventId: 29,
            },
            {
                text: 'Finish preparation',
                nextEventId: 53
            }
        ]
    },
    {
        /*
        * Bad ending 1: In an attempt to attack a survivor for supplies, he stabs you in self defence and you bleed to death. 
        */

        id: 12,
        text: 'You try pushing the man to the ground and he quickly grabs a knife from his pocket and pushes it into your stomach. Your eyes slowly close'
            + ' as you bleed to death.'
            + '<b><em> You Died!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>',
        image: './assets/images/You-Died_TEST-GIF.gif',
        sound: './assets/sounds/knifeholster.wav',
        inventory: '',
        options: []
    },
    {
        id: 53,
        text: 'You finish your preparations for the night. You hear zombies approaching outside and prepare yourself for an'
        + ' attack.',
        image: './assets/images/gas-station_stock-room.jpg',
        inventory: '',
        options: [
            {
                text: 'Start the night',
                requiredState: (currentState) => currentState.Windows && !currentState.Doors,
                requiredInventory: {'Knife':false},
                nextEventId: 35
            },
            {
                text: 'Start the night',
                requiredState: (currentState) => currentState.Doors && !currentState.Windows,
                requiredInventory: {'Knife':false},
                nextEventId: 36
            },
            {
                text: 'Start the night',
                requiredState: (currentState) => currentState.Windows && !currentState.Doors,
                requiredInventory: {'Knife':true},
                nextEventId: 50
            },
            {
                text: 'Start the night',
                requiredState: (currentState) => currentState.Doors && !currentState.Windows,
                requiredInventory: {'Knife':true},
                nextEventId: 51
            },
            {
                text: 'Start the night',
                requiredState: (currentState) => currentState.Windows && currentState.Doors,
                nextEventId: 52
            },
            {
                text: 'Start the night',
                requiredState: (currentState) => !currentState.Windows && !currentState.Doors,
                nextEventId: 54
            }
        ]
    },
    {
        id: 54,
        text: 'In your preparation for the night time, you didn\'t barricade the doors or windows of the gas station. In the middle of the night, zombies'
        + ' attacked and broke down the doors and smashed through the windows. You were outnumbered. The zombies cornered you and there were too many of them'
        + ' to fight off. You were eaten alive.'
        + '\n<b><em>You Died!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>',
        image: './assets/images/You-Died_TEST-GIF.gif',
        inventory: '',
        sound: './assets/sounds/zombieseating.wav',
        options: []
    },
    {

        /**
         * Bad ending 3: You fail to barricade the doors and defend yourself from the zombies that break inside.
         */

        id: 35,
        text: 'In your preparation for the night time, you didn\'t barricade the doors of the gas station. In the middle of the night, zombies'
            + ' attacked and broke down the doors. You were outnumbered. The zombies cornered you and you didn\'t have any weapons to defend'
            + ' yourself. You were eaten alive.'
            + '<b><em>You Died!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>',
        image: './assets/images/You-Died_TEST-GIF.gif',
        inventory: '',
        sound: './assets/sounds/zombieseating.wav',
        options: []
    },
    {

        /**
         * Bad ending 4: You fail to barricade the windows and defend yourself from the zombies that break inside.
         */

        id: 36,
        text: 'In your preparation for the night time, you didn\'t barricade the windows of the gas station. In the middle of the night, zombies'
            + ' attacked and broke through the windows. You were outnumbered. The zombies cornered you and you didn\'t have any weapons to defend'
            + ' yourself. You were eaten alive.'
            + '<b><em>You Died!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>',
        image: './assets/images/You-Died_TEST-GIF.gif',
        inventory: '',
        sound: './assets/sounds/zombieseating.wav',
        options: []
    },
    {

        /**
         * Bad ending 5: You die from hypothermia as a result of cold temperature
         */

        id: 37,
        text: 'Your body temperature falls below 35 degrees celcius.  The symptoms of hypothermia develop. You start to shiver, followed by '
            + 'a feeling of shortness of breath and a lack of co-ordination. Eventually, your eyes slowly close and you lose consciousness. '
            + 'You later die from the hypothermia. '
            + '<b><em>You Died!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>',
        image: './assets/images/You-Died_TEST-GIF.gif',
        inventory: '',
        options: []
    },
    {
        id: 50,
        text: 'In your preparation for the night time, you only barricaded the windows of the gas station. In the middle of the night, zombies'
            + ' attacked and broke down the doors. However, you used the knife the stranger gave you to protect yourself. '
            + ' You survived the night.'
            + ' \n<b><em>You Survived!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>',
        image: './assets/images/Victory2_TEST-GIF.gif',
        inventory: '',
        options: []
    },
    {
        id: 51,
        text: 'In your preparation for the night time, you only barricaded the doors of the gas station. In the middle of the night, zombies'
            + ' attacked and broke through the windows. However, you used the knife the stranger gave you to protect yourself. '
            + ' You survived the night...'
            + ' \n<b><em>You Survived!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>',
        image: './assets/images/Victory2_TEST-GIF.gif',
        inventory: '',
        options: []
    },
    {
        id: 52,
        text: 'In your preparation for the night time, you barricaded both the doors and windows of the gas station. In the middle of the night, zombies'
            + ' attacked and tried to break through the doors and windows, however, your preparations kept you safe inside. You survived the night...'
            + ' \n<b><em>You Survived!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>',
        image: './assets/images/Victory2_TEST-GIF.gif',
        inventory: '',
        options: []
    }



]

startGame(); // Function call to start the game