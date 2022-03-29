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

    // Displays the inventory
    showInventory();

    // clears the inventory before the game starts
    clearInventory();

	// This will take the player to the appropriate Text Node if they die of frostbite or heat stroke
    setTemperatureData(showTextNode, 103, 111);
    
    // Will display the first text node (id=1)
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
        " for some quick cash. The medical centre seems to be abandoned and is surrounded by relatively sturdy concrete walls however the gate is completely busted and definitely won't hold against" +
        " the horde tonight without some repairs. You see a smaller building in the distance almost like a makeshift next to the building, while it won't make a good place for the night it might contain" +
        " Some equipment and loot that can help you get through the night.",
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
        " most likely due to a zombie horde, it's unclear if there is any survivors here but having the door busted makes your life easier getting inside the building. There are big" +
        " window panes however they are very opaque, concluding that it's most likely one way only. There seems to be some wierd red and blue fungus growing on the side of the building" +
        " with the red one smelling sweet and blue one smelling...salty?",
        inventory: '',
        image: '',
        options: [
            {
                text: 'Go inside the building through the front door',
                nextText: 3
            },
            {
                text: 'Break the window on the left',
                nextText: 4
            },
            {
                text: 'Interact with the blue fungus',
                requiredState: (currentState) => currentState.blueFungus === false,
                requiredState: (currentState) => currentState.Doctor,
                nextText: 5
            },
            {
                text: 'Interact with the blue fungus',
                requiredState: (currentState) => currentState.blueFungus === false,
                requiredState: (currentState) => !currentState.Doctor,
                nextText: 5.1
            },
            {
                text: 'Interact with the red fungus',
                requiredState: (currentState) => currentState.redFungus === false,
                requiredState: (currentState) => currentState.Doctor,
                nextText: 6
            },
            {
                text: 'Interact with the red fungus',
                requiredState: (currentState) => currentState.redFungus === false,
                requiredState: (currentState) => !currentState.Doctor,
                nextText: 6.1
            },
            {
                text: 'Barricade the gate',
                requiredState: (currentState) => currentState.plank === true,
                nextText: 7
            }
        ]
    },
    {
        id: 3,
        text: "You decide to enter through the broken double door at the front the testing centre, it feels really gloomy and dark in here despite still being bright outside, you can just about makeout everything in here." +
        " You see that there is a room to your left, stairs leading to a basement in front of you and a room that looks like a lab? on the right. You can hear some banging coming from the left room. You can tell if they are " +
        "a zombie or a human going crazy probably the latter.",
        inventory: '',
        image: '',
        options: [
            {
                text: 'Go into the left room',
                nextText: 3.1
            },
            {
                text: 'Go down stairs',
                nextText: 3.2
            },
            {
                text: 'Go to the right room',
                nextText: 3.3
            },
        ]
    },
    {
        id: 3.1,
        text: "As you slowly approach the left room, trying to minimise the amount of noise you make, you see that in the corner of your eye a zombie dressed in a lab coat, bashing a cabinet for who know how long. You could try to sneak up onto the zombie or "+
        "go the safer route and just leave the zombie and his cabinet alone.",
        inventory: '',
        image: '',
        options: [
            {
                text: 'Sneak up and attack',
                requiredState: (currentState) => !currentState.WarVeteran,
                requiredState: (currentState) => !currentState.Priest,
                nextText: 3.11           
            },
            {
                text: 'Sneak up and attack',
                requiredState: (currentState) => currentState.WarVeteran,
                nextText: 3.12
            },
            {
                text: 'Sneak up and stab him with the syringe',
                requiredState: (currentState) => currentState.vaccineTrue,
                nextText: 3.13
            },
            {
                text: 'Sneak up and stab him with the syringe',
                requiredState: (currentState) => currentState.vaccineFake,
                nextText: 3.14
            },
            {
                text: 'Leave quietly',
                nextText: 3
            },
        ]
    },
    {
        id: 3.11,
        text: "As you try to sneak up to the zombie, you trip and alerted the zombie. It wasn't long until it realises you were there and devoured you for his next dinner.",
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    {
        id: 3.12,
        text: "With the amount of training you have had as a war veteran, this type of ambush is natural to you. As you knock the zombie over with your feet, you deliver heavy blows until he is no longer moving. Brutal but effective.",
        inventory: '',
        image: '',
        options: [
            {
                text: 'Inspect the room',
                requiredState: (currentState) => !currentState.WarVeteran,
                nextText: 3.111           
            },
        ]
    },
    {
        id: 3.13,
        text: "You approach stealthly as possible and when you got in range you stabbed the back of his neck with your syringe. The zombie stumble back for a bit due to the stab however gets back quickly and pounces on you before turning you into his next dinner",
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    {
        id: 3.14,
        text: 'You approach stealthly as possible and when you got in range you stabbed the back of his neck with your syringe. The zombie stumble back for a bit due to the stab, then lays there for a moment before their skin colour returning to normal along with their sight.' +
        ` "Wait I'm alive...and who are you?"`,
        inventory: '',
        image: '',
        options: [
            {
                text: 'Explain the situation',
                currentState: scienceSaved,
                nextText: 3.141         
            },
        ]
    },
    {
        id: 3.141,
        text: `"I see...thank you for saving me. I'm afraid I can't help you much though with my memory being blurry and everything."`,
        inventory: '',
        image: '',
        options: [
            {
                text: 'Is there anything that can help with the heating?',
                nextText: 3.142      
            },
            {
                text: "What's the password to the safe?",
                requiredState: (currentState) => currentState.seenSafe,
                nextText: 3.143      
            },
        ]
    },
    {
        id: 3.142,
        text: `"There is a backup generator that will automatically start the emergency heating if you just stomp the basement really hard. I- have no idea why we designed it like that but it works?"`,
        inventory: '',
        image: '',
        options: [
            {
                text: "Thank's that's all I have to ask",
                currentState: heatAsk = true,
                nextText: 3.144      
            },
            {
                text: "What's the passcord to the safe?",
                currentState: heatAsk = true,
                requiredState: (currentState) => currentState.seenSafe,
                requiredState: (currentState) => !currentState.safeAsk,
                nextText: 3.143      
            },
        ]
    },
    {
        id: 3.143,
        text: `"The password? uh that safe belongs to dave, his experimentations are out of our scopes, last time I checked this guy was trying to break the "fourth wall" whatever that means, if I have to guess his password it would probably be something to do with that"`,
        inventory: '',
        image: '',
        options: [
            {
                text: "Thank's that's all I have to ask",
                currentState: safeAsk = true,
                nextText: 3.144      
            },
            {
                text: 'Is there anything that can help with the heating?',
                currentState: safeAsk = true,
                requiredState: (currentState) => !currentState.heatAsk,
                nextText: 3.142      
            },
        ]
    },
    {
        id: 3.144,
        text: `"If that is everything you want to ask of me then I'm going to leave and try to find my daughter if she is still out there somewhere. Take care."`,
        inventory: '',
        image: '',
        options: [
            {
                text: "Look around the room",
                nextText: 3.111     
            },
        ]
    },
    {
        id: 3.111, //w
        text: `The room is relatively tiny with a window leading to the outside, there is a wooden cabinet here with many scratches over but can't seem to be opened without bashing it. `,
        inventory: '',
        image: '',
        options: [
            {
                text: "Look around the room",
                nextText: 3.111     
            },
        ]
    },
    {
        id: 5,
        text: "Infront of you is a cluster of funguses with suspiciously blue colour, despite the really odd salty smell that reminds you very much of the ocean." +
        " This mushroom is so salty that it's a scientific miracle that this plant can even grow. Due to it's salty nature consuming it directly can be...distasteful but not life threatening." +
        " This is a good source of sodium if you need it.",
        inventory: '',
        image: '',
        options: [
            {
                text: 'Eat the blue fungus',
                nextText: 5.2
            },
            {
                text: 'Pick some blue fungus',
                nextText: 5.4
            },
            {
                text: 'burn the blue fungus',
                requiredState: (currentState) => currentState.torch === true,
                nextText: 5.3
            },
        ]
    },
    {
        id: 5.1,
        text: "Infront of you is a cluster of funguses with suspiciously blue colour, despite the really odd salty smell that reminds you very much of the ocean.",
        inventory: '',
        image: '',
        options: [
            {
                text: 'Eat the blue fungus',
                nextText: 5.2
            },
            {
                text: 'Pick some blue fungus',
                nextText: 5.4
            },
            {
                text: 'burn the blue fungus',
                requiredState: (currentState) => currentState.torch === true,
                nextText: 5.3
            },
        ]
    },
    {
        id: 5.3,
        text: "After burning the blue fungus, you can only describe the smell as putrid and horrorific smelling like rotten flesh although the smell is really bad you hope the zombie thinks the same",
        inventory: '',
        image: '',
        options: [
            {
                text: 'Go back to the front',
                currentState: blueFungus = true,
                currentState: decay = true,
                nextText: 2
            },
        ]
    },
    {
        id: 5.2,
        text: "You consume the blue fungus before you put the mysterious fungus into your mouth, you take one deep breath and swallowed it whole. In matter of seconds you have already regretted you decisions that brought you here." +
        " The fungus was so salty that you feel like you just swallowed an entire desert into your mouth. It wasn't long until you passed out.",
        inventory: '',
        image: '',
        options: [
            {
                text: 'Force yourself up (-20 seconds)',
                currentState: blueFungus = true,
                nextText: 2
            },
        ]
    },
    {
        id: 5.4,
        text: "You picked up some blue fungus to bring with you but you have no idea what to do with them or do you?",
        inventory: '',
        image: '',
        options: [
            {
                text: 'Go back to the front',
                setInventory: {blueFungus: true},
                currentState: blueFungus = true,
                nextText: 2
            },
        ]
    },
    {
        id: 6,
        text: "Infront of you is a cluster of funguses with suspiciously red colour, despite the sweet smelling aroma that is starting to start smell sickening, you knew right away" +
        " that this is a special type of mushroom that can boost ones vitality if the mushroom is first boiled and if you don't boil it, it is very posionous to any living mammal (reptiles seems to be fine)",
        inventory: '',
        image: '',
        options: [
            {
                text: 'Eat the red fungus',
                nextText: 6.2
            },
            {
                text: 'Pick some red fungus',
                nextText: 6.4
                
            },
            {
                text: 'burn the red fungus',
                requiredState: (currentState) => currentState.torch === true,
                nextText: 6.3
            },
        ]
    },
    {
        id: 6.1,
        text: "Infront of you is a cluster of funguses with suspiciously red colour, despite the sweet smelling aroma that is starting to start smell sickening. Honestly you really want to get away from this" +
        " as soon as possible. ",
        inventory: '',
        image: '',
        options: [
            {
                text: 'Eat the red fungus',
                nextText: 6.2
            },
            {
                text: 'Pick some red fungus',
                nextText: 6.4
            },
            {
                text: 'burn the red fungus',
                requiredState: (currentState) => currentState.torch === true,
                nextText: 6.3
            },
        ]
    },
    {
        id: 6.3,
        text: "Turns out the red fungus was really flammable, you barely out of the way before all of it burns up before you. There is now ash on the floor, if you have a container you could pick it up",
        inventory: '',
        image: '',
        options: [
            {
                text: 'Go back to the front (the ash will be blown away by the wind)',
                currentState: redFungus = true,
                nextText: 2,

                text: 'Pick it up with plastic container',
                requiredState: (currentState) => currentState.plasticContainer === true,
                setInventory: {plasticContainerAsh: true},
                setInventory: {plasticContainer: false},
                currentState: ash = true,
                currentState: redFungus = true,
                nextText: 2
            },
        ]
    },
    {
        id: 6.2,
        text: "You decided that eating the bright red cap was a good idea for your health and being so why not. Oh no, your internal systems are dying and screaming for help...",
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    {
        id: 6.4,
        text: "You picked up some red fungus to bring with you but you have no idea what to do with them or do you?",
        inventory: '',
        image: '',
        options: [
            {
                text: 'Go back to the front',
                setInventory: {redFungus: true},
                currentState: redFungus = true,
                nextText: 2
            },
        ]
    },
]

startGame(); // Function call to start the game