const textElement = document.getElementById('dialogue'); // Dialogue box
const noteItem = document.getElementById('handwritten'); //Notes you find in the game
const optionButtonsElement = document.getElementById('options'); // Buttons
const inventoryElement = document.getElementById('inventory'); // Inventory
const imageElement = document.getElementById('locationImage'); // Image
const soundElement = document.createElement('audio'); //Sound
const profession = sessionStorage.getItem("profession");


// This variable stores the current game state

let state = {};

let inventory = {};

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
    inventory = {};
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

// Change the handwritten text
function changeText(){
   document.getElementById('handwritten').style.fontFamily = "Roboto Mono", 'monospace';
   document.getElementById('handwritten').style.fontSize = "1rem";
}
function revertText(){
    document.getElementById('handwritten').style.fontFamily = "Reenie Beanie", 'cursive';
    document.getElementById('handwritten').style.fontSize = "2rem";
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
        image: 'assets/images/BlackScreen.jpg',
        options: [
            {
                text: 'Turn on torch',
                requiredState: (currentState) => currentState.torch,
                nextText: 17
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
        note: "I've been in this dark place for what it feels like days. It seems like the group that has captured me is planning some cultist acts. One day, the group brought me out of the room that I was being held captive and forced me to create some sort of.... They called themselves the 'bad boys' which is really childish considering these people are like in their 40s. I hope this note reach to the authorities to save me from this cult.",
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
                nextText: 11
            },
            {
                text: 'Look on the table',
                nextText: 12
            },
            {
                text: 'Look at the painting',
                nextText: 13
            },
            {
                text: 'Look inside the fireplace',
                nextText: 14
            },
            {
                text: 'Go to the kitchen',
                nextText: 15
            },
            {
                text: 'Go back outside',
                nextText: 2
            }
        ]
    },
    //inside after first time
    {
        id: 10,
        text: 'Returning back to the living room, Around you, there is a <u><strong>table on your left</strong></u>, <u><strong>a painting that has been tilted on the wall</strong></u>, <u><strong>a small fireplace</strong></u> beside the kitchen door, what seems like <u><strong>a bedroom</strong></u> in front of you and <u><strong>the kitchen</strong></u> to your right.',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-inside.jpg',
        options: [
            {
                text: 'Go to Bedroom',
                nextText: 11
            },
            {
                text: 'Look on the table',
                nextText: 12
            },
            {
                text: 'Look at the painting',
                nextText: 13
            },
            {
                text: 'Look inside the fireplace',
                nextText: 14
            },
            {
                text: 'Go to the kitchen',
                nextText: 15
            },
            {
                text: 'Go back outside',
                nextText: 2
            }
        ]
    },
    //Bedroom
    {
        id: 11,
        text: "Entering the bedroom, you see that it looks like a typical normal bedroom, which seems like they were in a hurry to get out of the room. <u><strong>Drawers</strong></u> opened, <u><strong>bed</strong></u> was not done, <u><strong>random items on the ground</strong></u> and <u><strong>a large wardrobe that's tied with rope and chains and there's seem to be something moving inside.</strong></u>",
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-bedroom.jpg',
        sound: '',
        options: [
            {
                text: 'Search the drawers',
                nextText: 18
            },
            {
                text: 'Salvage the bed',
                nextText: 19
            },
            {
                text: 'Look at the items on the floor',
                nextText: 20
            },
            {
                text: 'Untie the ropes and chains off the wardrobe',
                nextText: 16
            },
            {
                text: 'Back',
                nextText: 10
            }
        ]
    },
    //Look on the table
    {
        id: 12,
        text: 'Looking on the table, you see that there is a note',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-inside.jpg',
        options: [
            {
                text: 'Read the note',
                nextText: 21
            },
            {
                text: 'Ignore the note',
                nextText: 10
            }
        ]
    },
    //Look at the painting
    {
        id: 13,
        text: "You look at the painting, and you see there's a message on the frame and it says 'find the notes'. You wonder what could this possibly mean?",
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-inside.jpg',
        options: [
            {
                text: 'Back',
                nextText: 10
            }
        ]
    },
    //Look inside the fireplace
    {
        id: 14,
        text: 'You look inside the fireplace and see a <u><strong>semi-burnt note</strong></u> and some <u><strong>unused firewood</strong></u>',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-inside.jpg',
        options: [
            {
                text: 'Pick up the burnt note and read it',
                nextText: 22
            },
            {
                text: 'Pick up firewood',
                requiredState: (currentState) => !currentState.firewood,
                setState: {firewood: true},
                nextText: 14
            },
            {
                text: 'You have already picked up the firewood',
                requiredState: (currentState) => currentState.firewood,
                nextText: 14
            },
            {
                text: 'Back',
                nextText: 10
            }
        ]
    },
    //Go to the kitchen
    {
        id: 15,
        text: 'You go to the kitchen and like the living room, it is in ruins. In there, you see some <u><strong>cupboards</strong></u> and <u><strong>a fridge</strong></u>.',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-kitchen.jpg',
        options: [
            {
                text: 'Check cupboards',
                nextText: 23
            },
            {
                text: 'Open the fridge',
                nextText: 24
            },
            {
                text: 'Back',
                nextText: 10
            }
        ]
    },
    //The closet inside the bedroom - ENDING 1 - the plot
    {
        id: 16,
        text: 'You untied the ropes and chain, and pops out a zombified little girl that jumps up and bites your neck. As the zombie devours your flesh, as your vision starts to blur, you start to thought what a way to go...<br><br><a href=\"EndStatistics.html\">See Statistics</a>',
        note: 'assets/images/farm-house-bedroom.jpg',
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
        options: [
            {
                text: "Play Again?",
                nextText: -1
            }
        ]
    },
    //Turn on the torch in the basement. This is where you will stay for the night.
    {
        id: 17,
        text: 'You turned your torch and see there are barrels... Lots of them, it seems like it was a wine cellar instead.',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-basement.jpg',
        options: [
            {
                text: 'Pick out the wood planks from the broken barrels',
                requiredState: (currentState) => !currentState.planks,
                setState: {planks: true},
                nextText: 17
            },
            {
                text: 'You have already pick up the planks',
                requiredState: (currentState) => currentState.planks,
                nextText: 17
            },
            {
                text: 'Look at all of the notes',
                requiredState: (currentState) => currentState.note1,
                requiredState: (currentState) => currentState.note2,
                requiredState: (currentState) => currentState.note3,
                nextText: 29

            },
            {
                text: 'Set up barricade',
                requiredState: (currentState) => currentState.planks && !currentState.barricade,
                setState: {barricade:true},
                nextText: 17
            },
            {
                text: 'You have already set up a barricade',
                requiredState: (currentState) => currentState.barricade,
                nextText: 17
            },
            {
                text: 'Set up your camp',
                requiredState: (currentState) => currentState.blanket && currentState.firewood && currentState.matches && !currentState.camp,
                setState: {camp: true},
                nextText: 17
            },
            {
                text: 'You have already set up your camp',
                requiredState: (currentState) => currentState.camp,
                nextText: 17
            },
            {
                text: 'Prepare your shotgun',
                requiredState: (currentState) => currentState.shotgun && currentState.shotgunAmmo && !currentState.shotgunLoaded,
                setState: {shotgunLoaded: true},
                nextText: 17
            },
            {
                text: 'You have already prepared your shotgun',
                requiredState: (currentState) => currentState.shotgunLoaded,
                nextText: 17
            },
            {
                text: 'Back',
                nextText: 2
            },
            {
                text: 'Start the night',
                requiredState: (currentState) => !currentState.barricade && !currentState.camp,
                nextText: 30
            },
            {
                text: 'Start the night',
                requiredState: (currentState) => currentState.barricade && !currentState.camp,
                nextText: 31
            },
            {
                text: 'Start the night',
                requiredState: (currentState) => currentState.barricade && currentState.camp,
                nextText: 32
            }
        ]
    },
    //Bedroom - Search the drawers
    {
        id: 18,
        text: 'You open the <u><strong>drawer</strong></u> and found <u><strong>some matches</strong></u>.',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-bedroom.jpg',
        options: [
            {
                text: 'Take the matches',
                requiredState: (currentState) => !currentState.matches,
                setState: {matches: true},
                nextText: 18
            },
            {
                text: 'You have already picked up the matches from the drawer',
                requiredState: (currentState) => currentState.matches,
                nextText: 18
            },
            {
                text: 'Back',
                nextText: 11
            }
        ]
    },
    //Bedroom - Salvage the bed
    {
        id: 19,
        text: 'You look on the bed to see what you can take...',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-bedroom.jpg',
        options: [
            {
                text: 'Take the blanket',
                requiredState: (currentState) => !currentState.blanket,
                setState: {blanket: true},
                nextText: 19
            },
            {
                text: 'You have already picked up everything from the bed...',
                requiredState: (currentState) => currentState.blanket,
                nextText: 19
            },
            {
                text: 'Back',
                nextText: 11
            }
        ]
    },
    //Bedroom - look at the floor
    {
        id: 20,
        text: "You look at the floor, looks like there's nothing useful that will help you but they are lots of syringes with some green residue inside and you wonder what is was...",
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-bedroom.jpg',
        options: [
            {
                text: 'Back',
                nextText: 11
            }
        ]
    },
    //Table - note
    {
        id: 21,
        text: 'You look at the note, it seems like a recipe to something... but you don`t know what it is for, as the title is scribbled out...<br><button onClick="changeText();" class="changeText">Change Text</button> <button onClick="revertText();" class="changeText">Revert Text</button>',
        note: 'Recipe For Z....<br>1 part Zomium<br>2 part Monster E.<br>0.5 part Uranium Liquid<br>4 part Bloo..<br>2 part Zom. Goo',
        inventory: '',
        image: 'assets/images/farm-house-inside.jpg',
        options: [
            {
                text: 'Back',
                setState: {note2: true},
                nextText: 10
            }
        ]
    },
    //Fireplace - note
    {
        id: 22,
        text: 'You read the note, and it says: <br><button onClick="changeText();" class="changeText">Change Text</button> <button onClick="revertText();" class="changeText">Revert Text</button>',
        note: 'Whoever reads this, I am sorry that I have created a deadly virus, it turns people in brain eating zombies.... These cultists kidnapped my daughter and I had no choice but to listen to them...They used my daughter as a test subject. Sh..she turned into one of them... a monster<br>We had no choice but to lock her up in the wardrobe in the bedroom...',
        inventory: '',
        image: 'assets/images/farm-house-inside.jpg',
        options: [
            {
                text: 'Back',
                setState: {note3:true},
                nextText: 10
            }
        ]
    },
    //Kitchen - Cupboards
    {
        id: 23,
        text: 'You opened the cupboard and found <u><strong>some shotgun ammo</strong></u> and <u><strong>a kitchen knife</strong></u>',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-kitchen.jpg',
        options: [
            {
                text: 'Take shotgun ammo',
                requiredState: (currentState) => !currentState.shotgunAmmo,
                setState: {shotgunAmmo: true},
                nextText: 23
            },
            {
                text: 'You have already picked up the shotgun ammo',
                requiredState: (currentState) => currentState.shotgunAmmo,
                nextText: 23
            },
            {
                text: 'Take kitchen knife',
                requiredState: (currentState) => !currentState.kitchenKnife,
                setState: {kitchenKnife: true},
                nextText: 23
            },
            {
                text: 'You have already picked up the kitchen knife',
                requiredState: (currentState) => currentState.kitchenKnife,
                nextText: 23
            },
            {
                text: 'Back',
                nextText: 15
            }
        ]
    },
    //Kithcen - Fridge
    {
        id: 24,
        text: 'You open the fridge and there is a container with some sort of <u><strong>green liquid inside</strong></u>. Do you want to drink it?',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-kitchen.jpg',
        options: [
            {
                text: 'Drink the liquid',
                requiredState: (currentState) => !currentState.Medic, //If you are a medic, you know that the lidquid is dangerous
                nextText: 28
            },
            {
                text: 'Close the fridge',
                nextText: 15

            }
        ]
    },
    //Start the night - no barricade, no camp
    {
        id: 25,
        text: 'You start the night with no barricade, no camp. U hear zombies closing into the shelter. You arm your weapons... The zombies comes through the entrance, you have no choice but to fight...',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-basement.jpg',
        options: [
            {
                text: 'Shoot your gun',
                requiredState: (currentState) => currentState.shotgunLoaded,
                nextText: 30
            },
            {
                text: 'Slash the zombies',
                requiredState: (currentState) => currentState.kitchenKnife,
                nextText: 30
            },
            {
                text: 'Punch the zombies',
                nextText: 30
            }
        ]
    },
    //Start the night - barricade, no camp
    {
        id: 26,
        text: 'You start the night with barricade but no camp. U hear zombies closing into the shelter. You arm your weapons... The zombies slowing tearing apart the barricade you put up, you have no choice but to fight...',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-basement.jpg',
        options: [
            {
                text: 'Shoot your gun',
                requiredState: (currentState) => currentState.shotgunLoaded,
                nextText: 31
            },
            {
                text: 'Slash the zombies',
                requiredState: (currentState) => currentState.kitchenKnife,
                nextText: 31
            },
            {
                text: 'Punch the zombies',
                nextText: 30
            }
        ]
    },
    //Start the night - barricade, camp
    {
        id: 27,
        text: 'You start the night with barricade and a camp. U hear zombies closing into the shelter. You arm your weapons... The zombies slowing tearing apart the barricade you put up, you have no choice but to fight...',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-basement.jpg',
        options: [
            {
                text: 'Shoot your gun',
                requiredState: (currentState) => currentState.shotgunLoaded,
                nextText: 32
            },
            {
                text: 'Slash the zombies',
                requiredState: (currentState) => currentState.kitchenKnife,
                nextText: 32
            },
            {
                text: 'Punch the zombies',
                nextText: 30
            }
        ]
    },
    //Fridge - Drikning the liquid - ending Drinking zombie liquid
    {
        id: 28,
        text: 'Drinking the weird liquid, you felt funny... It almost tasted like an energy drink from the stores... Later, your body is slowly not responding to you... you look at your hands and they were turning grey. You suddenly thought about human flesh and BRAINS. You then realise, you are slowing turning into a zombie... that drink was... how this outbreak happened',
        note: '',
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
        options: [
            {

            }
        ]
    },
    //Get double barrel shotgun
    {
        id: 29,
        text: "You put the notes beside each other and drawings at the back of the notes starts to come together. The drawing showed that there is a weapon in one of the barrels and under the drawing there's some writting. It reads '97', you look for barrel 97 and found it. There wasn't a lid, you look inside and there was a <u><strong>double barrel shotgun</strong></u>. ",
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-basement.jpg',
        options: [
            {
                text: 'Take the shotgun',
                requiredState: (currentState) => !currentState.shotgun,
                setState: {shotgun:true},
                nextText: 29
            },
            {
                text: 'You have already taken the shotgun',
                requiredState: (currentState) => currentState.shotgun,
                nextText: 29
            },
            {
                text: 'Back',
                nextText: 17
            }
        ]
    },
    //Ending night 1 - no barricade, no camp - Bad
    {
        id: 30,
        text: 'Being overwhelmed by zombies, you try your best to kill as many zombies as you can. But there was no hope, the zombies surrounds you. They tore your limbs apart and started eating you, You have died.',
        note: '',
        inventory: '',
        image: 'assets/images/You-Died-TEST-GIF.gif',
    },
    //Ending night 2 - barricade, no camp - Bad
    {
        id: 31,
        text: "You kill the zombies as they are trying to break the barricade open. You keep killing and killing and killing... until there was no more. You decided to sleep after a long battle. There was a huge snow storm... You didn't have any warmth to protect you from the cold and you died of hypothermia",
        note: '',
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    //Ending night 3 - you survive the night. - Good
    {
        id: 32,
        text: 'You kill the zombies as they are trying to break the barricade open. You keep killing and killing and killing... until there was no more. You decided to sleep beside the campfire after a long battle. There was a huge snow storm, but luckily you prepared a campfire beforehand and survived the night.',
        note: '',
        inventory: '',
        image: 'assets/images/Victory2_TEST-GIF.gif',
    }
]


startGame(); // Function call to start the game