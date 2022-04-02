const textElement = document.getElementById('dialogue'); // Dialogue box
const noteItem = document.getElementById('handwritten'); //Notes you find in the game
const optionButtonsElement = document.getElementById('options'); // Buttons
const inventoryElement = document.getElementById('inventory'); // Inventory
const imageElement = document.getElementById('locationImage'); // Image
const soundElement = document.createElement('audio'); //Sound
const profession = sessionStorage.getItem("profession");

//Variables for collectables
let secretCollectable = 0;
let secret1 = true;
let secret2 = true;
let secret3 = true;
let secret4 = true;
let secret5 = true;
let secret6 = true;
let secret7 = true;

// This variable stores the current game state
let state = getGameState();


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
    setTimerData(showTextNode, 17, 33);
    setTemperatureData(showTextNode, 34, 34);
    showInventory();
    //clearInventory(); //This clears the inventory
    showTextNode(1);
}

function getGameState() {
	let savedData = sessionStorage.getItem("farmhouseGameState");
	console.log(savedData);
	if (savedData) return JSON.parse(savedData);
	else
		return {
			// TODO: Get profession properly with sessionStorage.getItem("profession");
			profession: profDoctor,
		};

// This function displays the current text node in the dialogue box. The index of the text node is required as a parameter.

function showTextNode(textNodeIndex){
    if (textNodeIndex ==='Warehouse'){
        window.location.href = "Warehouse.html";
    }
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex); // Finds the text node by comparing to parameter input.
    typeSentence(textNode.text, "dialogue"); // Changes the dialogue box to text stored in the text node.
    updateInventory(textNode.inventory);
    imageElement.src = textNode.image;
    noteItem.innerHTML = textNode.note;
    crossfadeAudio(textNode.sound); //The audio System.
    playSound(textNode.sound2);
    changeTemp(textNode.tempChange); //The temperature system
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
            sessionStorage.setItem('collectable', secretCollectable);
            sessionStorage.setItem("cabinGameState", JSON.stringify(gameState));
        }
    }
    )
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
    showTextNode(nextTextNodeId);
    updateInventory(option.setInventory);
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

function addCollectable(clicked){
    if(clicked === true){
    secretCollectable++;
    console.log(secretCollectable);
    textElement.innerHTML += '<br><br> You found a collectable';
    }
}



// The text nodes for the game are below

const textNodes = [
    //First visit to outside of the farm house
    {
        id: 1,
        text: 'Moving away from the <a href="#" id="collect3" class="collectable" onClick="addCollectable(secret3); secret3=false">infected town</a>, you have stumbled upon what looks like to be and old, damaged farm house that has not been occupied in years. You walk toward the garden or what could have once been a lovely rose garden was now a deserted wasteland...',
        note: '',
        inventory: "",
        image: 'assets/images/farm-house-outside.jpg',
        sound: 'assets/sounds/wind.wav',
        tempChange: 'decrease',
        options: [
            {
                text: 'Go in',
                nextText: 2
            },
            {
                text: 'Go to the Warehouse',
                nextText: 'Warehouse'
            }
        ]
    },
    //Outside of the farm house
    {
        id: 2,
        text: 'You look around the vicinity and you see a <u><strong>wheel barrow</strong></u>, <u><strong>a suspicious flower pot</strong></u>, <u><strong>a dirty welcome mat</strong></u> and at the side of the <a href="#" id="collect4" class="collectable" onClick="addCollectable(secret4); secret4=false">farm house</a> you see what looks to be <u><strong>a shelter of some sort</strong></u>.',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-outside.jpg',
        sound: 'assets/sounds/wind.wav',
        tempChange: 'decrease',
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
            },
            {
                text: 'Back',
                nextText: 1
            }
        ]
    },
    //Look inside the wheel barrow
    {
        id: 3,
        text: 'You look inside the wheel barrow and found a lamp',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-outside.jpg',
        tempChange: 'decrease',
        options: [
            {
                text: 'Take lamp',
                //requiredState: (currentState) => !currentState.lamp,
                setInventory: {lamp: true},
                requiredInventory: {lamp: false},
                //setState: {lamp:true},
                nextText: 2
            },
            {
                text: 'Leave the torch',
                //requiredState: (currentState) => !currentState.lamp,
                requiredInventory: {lamp: false},
                nextText: 2
            },
            {
                text: 'You have already picked up the lamp',
                //requiredState: (currentState) => currentState.lamp,
                requiredInventory: {lamp: true},
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
        tempChange: 'decrease',
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
        tempChange: 'decrease',
        options: [
            {
                text: 'Take key',
                requiredState: (currentState) =>!currentState.doorUnlocked,
                requiredInventory: {key: false},
                setState: {key:true},
                setInventory: {key:true},
                nextText: 2
            },
            {
                text: 'Ignore the key',
                requiredState: (currentState) => !currentState.doorUnlocked,
                requiredInventory: {key: false},
                nextText: 2
            },
            {
                text: 'U have already picked up the key',
                requiredState: (currentState) => currentState.key || currentState.doorUnlocked,
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
                text: 'Turn on lamp',
                requiredState: (currentState) => !currentState.lampOn,
                requiredInventory: {lamp:true},
                setInventory: {lamp:false},
                setState: {lampOn:true},
                nextText: 17
            },
            {
                text: 'Go in the shelter',
                requiredState: (currentState) => currentState.lampOn,
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
        sound: '',
        sound2: "assets/sounds/newspaper.wav",
        options: [
            {
                text: 'Back',
                setInventory: {note1:true},
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
        tempChange: 'decrease',
        options: [
            {
                text: 'Open the door',
                requiredState: (currentState) => currentState.key && !currentState.doorUnlocked,
                setState: {doorUnlocked:true, key:false},
                setInventory: {key:false},
                nextText: 9
            },
            {
                text: 'Go inside',
                requiredState: (currentState) => currentState.doorUnlocked,
                nextText: 10
            },
            {
                text: 'Pick lock the door',
                requiredState: (currentState) => currentState.Mechanic  && !currentState.doorUnlocked,
                setState: {doorUnlocked:true},
                nextText: 9
            },
            {
                text: 'Shoot the lock off',
                requiredState: (currentState) => currentState.Hunter && !currentState.doorUnlocked, //need to get gun from inventory
                setState: {doorUnlocked:true},
                nextText: 9
            },
            {
                text: 'Kick the door off',
                requiredState: (currentState) => currentState.WarVeteran  && !currentState.doorUnlocked,
                setState: {doorUnlocked:true},
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
        sound2: "assets/sounds/door.wav",
        tempChange: 'increase',
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
        sound2: "assets/sounds/newspaper.wav",
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
        text: 'You look at the painting, and you see there is a message on the frame and it says <a href="#" id="collect1" class="collectable" onClick="addCollectable(secret1); secret1=false">`find the notes`</a>. You wonder what could this possibly mean?',
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
                //requiredState: (currentState) => !currentState.firewood,
                requiredInventory: {firewood:false},
                setInventory: {firewood:true},
                //setState: {firewood: true},
                nextText: 14
            },
            {
                text: 'You have already picked up the firewood',
                //requiredState: (currentState) => currentState.firewood,
                requiredInventory: {firewood: true},
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
        text: 'You go to the <a href="#" id="collect7" class="collectable" onClick="addCollectable(secret7); secret7=false">kitchen</a> and like the living room, it is in ruins. In there, you see some <u><strong>cupboards</strong></u> and <u><strong>a fridge</strong></u>.',
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
        note: '',
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
        sound2: "assets/sounds/zombieseating.wav",
        options:[
            
        ]
    },
    //Turn on the torch in the basement. This is where you will stay for the night.
    {
        id: 17,
        text: 'You turned your lamp and see there are <a href="#" id="collect6" class="collectable" onClick="addCollectable(secret6); secret6=false">barrels</a>... Lots of them, it seems like it was a wine cellar instead.',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-basement.jpg',
        options: [
            {
                text: 'Pick out the wood planks from the broken barrels',
                //requiredState: (currentState) => !currentState.planks,
                requiredInventory: {"Wood Planks":false},
                setInventory: {"Wood Planks":true},
                //setState: {planks: true},
                nextText: 17
            },
            {
                text: 'You have already pick up the planks',
                //requiredState: (currentState) => currentState.planks,
                requiredInventory: {planks:true},
                nextText: 17
            },
            {
                text: 'Look at all of the notes',
                requiredState: (currentState) => currentState.note1,
                requiredState: (currentState) => currentState.note2,
                requiredState: (currentState) => currentState.note3,
                requiredInventory: {note1:true, note2:true, note3:true},
                setInventory: {note1:false, note2:false, note3:false},
                nextText: 29

            },
            {
                text: 'Back',
                nextText: 2
            },
            {
               text: 'Prepare for the night',
               nextText: 35
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
        sound2: "assets/sounds/drawerOpen.wav",
        options: [
            {
                text: 'Take the matches',
                //requiredState: (currentState) => !currentState.matches,
                requiredInventory: {matches:false},
                setInventory: {matches: true},
                //setState: {matches: true},
                nextText: 18
            },
            {
                text: 'You have already picked up the matches from the drawer',
                //requiredState: (currentState) => currentState.matches,
                requiredInventory: {matches:true},
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
                //requiredState: (currentState) => !currentState.blanket,
                requiredInventory: {blanket:false},
                setInventory: {blanket: true},
                //setState: {blanket: true},
                nextText: 19
            },
            {
                text: 'You have already picked up everything from the bed...',
                //requiredState: (currentState) => currentState.blanket,
                requiredInventory: {blanket:true},
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
        text: 'You look at the floor, looks like there is nothing useful that will help you but they are <a href="#" id="collect2" class="collectable" onClick="addCollectable(secret2); secret2=false">`lots of syringes`</a> with some green residue inside and you wonder what is was...',
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
        sound2: "assets/sounds/newspaper.wav",
        options: [
            {
                text: 'Back',
                setInventory: {note2:true},
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
        sound2: "assets/sounds/newspaper.wav",
        options: [
            {
                text: 'Back',
                setInventory: {note3:true},
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
                //requiredState: (currentState) => !currentState.shotgunAmmo,
                requiredInventory: {shotgunAmmo:false},
                setInventory: {shotgunAmmo:true},
                //setState: {shotgunAmmo: true},
                nextText: 23
            },
            {
                text: 'You have already picked up the shotgun ammo',
                //requiredState: (currentState) => currentState.shotgunAmmo,
                requiredInventory: {shotgunAmmo:true},
                nextText: 23
            },
            {
                text: 'Take kitchen knife',
                //requiredState: (currentState) => !currentState.kitchenKnife,
                requiredInventory: {kitchenKnife:false},
                setInventory: {kitchenKnife:true},
                //setState: {kitchenKnife: true},
                nextText: 23
            },
            {
                text: 'You have already picked up the kitchen knife',
                //requiredState: (currentState) => currentState.kitchenKnife,
                requiredInventory: {kitchenKnife:true},
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
        text: 'You open the fridge and there is a container with some sort of <u><strong><a href="#" id="collect5" class="collectable" onClick="addCollectable(secret5); secret5=false">Green Liquid inside</a></strong></u>. Do you want to drink it?',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-kitchen.jpg',
        sound2: "assets/sounds/openFridge.wav",
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
        tempChange: 'decrease',
        options: [
            {
                text: 'Shoot your gun',
                requiredInventory: {shotgunLoaded:true},
                //requiredState: (currentState) => currentState.shotgunLoaded,
                nextText: 30
            },
            {
                text: 'Slash the zombies',
                requiredInventory: {kitchenKnife:true},
               //requiredState: (currentState) => currentState.kitchenKnife,
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
        tempChange: 'decrease',
        options: [
            {
                text: 'Shoot your gun',
                requiredInventory: {shotgunLoaded:true},
                //requiredState: (currentState) => currentState.shotgunLoaded,
                nextText: 31
            },
            {
                text: 'Slash the zombies',
                requiredInventory: {kitchenKnife:true},
                //requiredState: (currentState) => currentState.kitchenKnife,
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
                requiredInventory: {shotgunLoaded:true},
                //requiredState: (currentState) => currentState.shotgunLoaded,
                nextText: 32
            },
            {
                text: 'Slash the zombies',
                requiredInventory: {kitchenKnife:true},
                //requiredState: (currentState) => currentState.kitchenKnife,
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
        text: 'Drinking the weird liquid, you felt funny... It almost tasted like an energy drink from the stores... Later, your body is slowly not responding to you... you look at your hands and they were turning grey. You suddenly thought about human flesh and BRAINS. You then realise, you are slowing turning into a zombie... that drink was... how this outbreak happened<br><br><a href=\"EndStatistics.html\">See Statistics</a>',
        note: '',
        inventory: '',
        sound2: "assets/sounds/drinking.wav",
        image: 'assets/images/You-Died_TEST-GIF.gif',
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
                //requiredState: (currentState) => !currentState.shotgun,
                requiredInventory: {shotgun:false},
                setInventory: {shotgun:true},
                //setState: {shotgun:true},
                nextText: 29
            },
            {
                text: 'You have already taken the shotgun',
                //requiredState: (currentState) => currentState.shotgun,
                requiredInventory: {shotgun:true},
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
        text: 'Being overwhelmed by zombies, you try your best to kill as many zombies as you can. But there was no hope, the zombies surrounds you. They tore your limbs apart and started eating you, You have died.<br><br><a href=\"EndStatistics.html\">See Statistics</a>',
        note: '',
        inventory: '',
        sound2: "assets/sounds/zombieseating.wav",
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    //Ending night 2 - barricade, no camp - Bad
    {
        id: 31,
        text: "You kill the zombies as they are trying to break the barricade open. You keep killing and killing and killing... until there was no more. You decided to sleep after a long battle. There was a huge snow storm... You didn't have any warmth to protect you from the cold and you died of hypothermia.<br><br><a href=\"EndStatistics.html\">See Statistics</a>",
        note: '',
        inventory: '',
        sound2: "assets/sounds/winterStorm.wav",
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    //Ending night 3 - you survive the night. - Good
    {
        id: 32,
        text: 'You kill the zombies as they are trying to break the barricade open. You keep killing and killing and killing... until there was no more. You decided to sleep beside the campfire after a long battle. There was a huge snow storm, but luckily you prepared a campfire beforehand and survived the night.<br><br><a href=\"EndStatistics.html\">See Statistics</a>',
        note: '',
        inventory: '',
        image: 'assets/images/Victory2_TEST-GIF.gif',
    },
    //Ending running out of time
    {
        id: 33,
        text: "As day dawns over your failed defence from the zombie horde, you lie bleeding out on the ground, too exhausted to move. You won't make it to the next night. <br><br><a href=\"EndStatistics.html\">See Statistics</a>",
        note: '',
        inventory: '',
        sound2: "assets/sounds/zombieseating.wav",
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    //Ending dying because of the cold
    {
        id: 34,
        text: "You feel cold all throughout your body... You feel that you can just sleep on the ground... You are slowly passing out... You couldn't feel anything that you realised that you're dying from hypothermia. <br><br><a href=\"EndStatistics.html\">See Statistics</a>",
        note: '',
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    //Go to the shelter
    {
        id: 35,
        text: 'Would you like to prepare for the night. There is no going back now.',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-basement.jpg',
        tempChange: 'decrease',
        options: [
            {
                text: 'Yes',
                nextText: 36
            },
            {
                text: 'No',
                nextText: 17
            }
        ]
    },
    //started the night
    {
        id: 36,
        text: 'You prepare for the cold night...',
        note: '',
        inventory: '',
        image: 'assets/images/farm-house-basement.jpg',
        tempChange: 'decrease',
        options: [
            {
                text: 'Set up barricade',
                requiredState: (currentState) => !currentState.barricade,
                requiredInventory: {"Wood Planks":true},
                setInventory: {"Wood Planks": false},
                setState: {barricade:true},
                nextText: 36
            },
            {
                text: 'You have already set up a barricade',
                requiredState: (currentState) => currentState.barricade,
                nextText: 36
            },
            {
                text: 'Set up your camp',
                requiredState: (currentState) => !currentState.camp,
                requiredInventory: {blanket:true, firewood:true, matches:true},
                setInventory: {firewood:false, matches:false, blanket:false},
                setState: {camp: true},
                nextText: 36
            },
            {
                text: 'Set up your camp',
                requiredState: (currentState) => !currentState.camp,
                requiredInventory: {firewood:true, matches:true, blanket:false},
                setInventory: {firewood:false, matches:false},
                setState: {camp: true},
                nextText: 36
            },
            {
                text: 'Set up your camp',
                requiredState: (currentState) => !currentState.camp,
                requiredInventory: {blanket:true, "Wood Planks":true, matches:true},
                setInventory: {"Wood Planks":false, matches:false, blanket:false},
                setState: {camp: true},
                nextText: 36
            },
            {
                text: 'Set up your camp',
                requiredState: (currentState) => !currentState.camp,
                requiredInventory: {"Wood Planks":true, matches:true},
                setInventory: {"Wood Planks":false, matches:false},
                setState: {camp: true},
                nextText: 36
            },
            {
                text: 'Set up your camp',
                requiredState: (currentState) => currentState.Hunter && !currentState.camp,
                requiredInventory: {firewood:true, sticks:true},
                setState: {camp: true},
                nextText: 36
            },
            {
                text: 'You have already set up your camp',
                requiredState: (currentState) => currentState.camp,
                nextText: 36
            },
            {
                text: 'Prepare your shotgun',
                requiredState: (currentState) => !currentState.shotgunLoaded,
                requiredInventory: {shotgun:true, shotgunAmmo:true},
                setInventory: {shotgunLoaded: true, shotgunAmmo: false, shotgun:false},
                setState: {shotgunLoaded: true},
                nextText: 36
            },
            {
                text: 'You have already prepared your shotgun',
                requiredState: (currentState) => currentState.shotgunLoaded,
                nextText: 36
            },
            {
                text: 'Start the night',
                requiredState: (currentState) => !currentState.barricade && !currentState.camp,
                nextText: 25
            },
            {
                text: 'Start the night',
                requiredState: (currentState) => currentState.barricade && !currentState.camp,
                nextText: 26
            },
            {
                text: 'Start the night',
                requiredState: (currentState) => currentState.barricade && currentState.camp,
                nextText: 27
            }
        ]
    }
]


startGame(); // Function call to start the game