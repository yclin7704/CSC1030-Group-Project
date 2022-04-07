const textElement = document.getElementById('labText'); // Lab Text 
const optionButtonsElement = document.getElementById('options'); // Buttoms for the user
const inventoryElement = document.getElementById('inventory'); // Inventory
const imageElement = document.getElementById('locationImage'); //Location
const profession = sessionStorage.getItem("profession"); //Profession
const soundElement = document.createElement('audio'); //Sound
const noteItem = document.getElementById('handwritten'); //Note
const playerName = sessionStorage.getItem("playerName"); // Playername

// This variable stores the current game state

let state = getGameState();

// Starting the game

function startGame()
{
    switch(profession) //Setting to the profession chosen
    { 
        case "Mechanic": state["Mechanic"] = true; break;
        case "Doctor": state["Doctor"] = true; break;
        case "Hunter": state["Hunter"] = true; break;
        case "War Veteran": state["WarVeteran"] = true; break;
        case "Priest": state["Priest"] = true; break;
    }

    // Displays the inventory
    showInventory();

    //Time up
    setTimerData(showTextNode, "camp", "timeOut");

	// This will take the player to the appropriate Text Node if they die of frostbite or heat stroke
    setTemperatureData(showTextNode, "freeze", "hot");
    
    // Will display the first text node (id=1)
    showTextNode(1);

    // Display player name
    displayPlayerName();
}


function displayPlayerName() {
    document.getElementById('playerSpan').innerHTML = playerName + '<br>';
}

function getGameState() {
	let savedData = sessionStorage.getItem("labGameState");
	console.log(savedData);
	if (savedData) return JSON.parse(savedData);
	else
		return {
			// TODO: Get profession properly with sessionStorage.getItem("profession");
            profession: "Doctor",
		}
    }

// This function displays the current text node in the dialogue box. The index of the text node is required as a parameter.

function showTextNode(textNodeIndex){
    if (textNodeIndex ==='Warehouse'){
        window.location.href = "Warehouse.html";
    }
    if (textNodeIndex === 3.33){
        showVault();
    }
    if (textNodeIndex === 3.3){
        vaultClear();
    }
    if (state.GameWin) {
        localStorage.setItem('endStatus', 'true');
    } else {
        localStorage.setItem('endStatus', 'false');
    }
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex); // Finds the text node by comparing to parameter input.
    typeSentence(textNode.text, "labText"); // Changes the dialogue box to text stored in the text node.
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
            sessionStorage.setItem("labGameState", JSON.stringify(state));
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
    updateInventory(option.setInventory);
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
    {
        id: 1,
        text: "After traveling for what felt like an eternity, you arrived to a medical testing zone. From what you could remember people use to come here to take part in clinical trials" +
        " for some quick cash. The medical centre seems to be abandoned and is surrounded by relatively sturdy concrete walls however the gate is completely busted and definitely won't hold against" +
        " the horde tonight without some repairs. You see a smaller building in the distance almost like a makeshift next to the building, while it won't make a good place for the night it might contain" +
        " Some equipment and loot that can help you get through the night.",
        note: '',
        inventory: '',
        sound: 'assets/sounds/wind.wav',
        image: 'assets/images/lab-out.jpg',
        tempChange: -1,
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
                text: 'Setup traps outside the gate using gasoline',
                requiredState: (currentState) => currentState.Mechanic,
                requiredInventory: { 'Gasoline': true },
                setInventory: { Gasoline : false },
                setState: { trap : true },

                nextText: 1
            },
            {
                text: 'Go back to the warehouse',
                nextText: 'Warehouse'
            },
        ]
    },
    {
        id: 2,
        text: "You enter through the gate, you see before you a massive medical centre with a double door that seems to have been previously barricaded however is now broken through" +
        " most likely due to a zombie horde, it's unclear if there is any survivors here but having the door busted makes your life easier getting inside the building. There are big" +
        " window panes however they are very opaque, concluding that it's most likely one way only. There seems to be some wierd red and blue fungus growing on the side of the building" +
        " with the red one smelling sweet and blue one smelling...salty?",
        note: '',
        inventory: '',
        sound: 'assets/sounds/wind.wav',
        image: 'assets/images/lab-out.jpg',
        tempChange: -1,
        options: [
            {
                text: 'Go inside the building through the front door',
                nextText: 3
            },
            {
                text: 'Break the window on the left and jump in',
                nextText: 4
            },
            {
                text: 'Interact with the blue fungus',
                requiredInventory: { 'blueFungus': false },
                requiredState: (currentState) => !currentState.blueFungus && currentState.Doctor,
                nextText: 5
            },
            {
                text: 'Interact with the blue fungus',
                requiredInventory: { 'blueFungus': false },
                requiredState: (currentState) => !currentState.blueFungus && !currentState.Doctor,
                nextText: 5.1
            },
            {
                text: 'Interact with the red fungus',
                requiredInventory: { 'redFungus': false },
                requiredState: (currentState) => currentState.Doctor,
                nextText: 6
            },
            {
                text: 'Interact with the red fungus',
                requiredInventory: { 'redFungus': false },
                requiredState: (currentState) => !currentState.Doctor,
                nextText: 6.1
            },
            {
                text: 'Barricade the gate',
                requiredInventory: { 'Wood Planks': true },
                setInventory: { 'Wood Planks' : false },
                setState: { barricaded : true },
                nextText: 2
            },
            {
                text: 'Go back out',
                nextText: 1
            },
        ]
    },
    {
        id: 3,
        text: "You decide to enter through the broken double door at the front the testing centre, it feels really gloomy and dark in here despite still being bright outside, you can just about makeout everything in here." +
        " You see that there is a room to your left, stairs leading to a basement in front of you and a room that looks like a lab? on the right. You can hear some banging coming from the left room. You can tell if they are " +
        "a zombie or a human going crazy probably the latter.",
        tempChange: -1,
        note: '',
        inventory: '',
        image: 'assets/images/lab-in.jpg',
        sound: 'assets/sounds/corridorHorror.wav',
        options: [
            {
                text: 'Go into the left room',
                requiredState: (currentState) => !currentState.scienceSaved && !currentState.scienceKilled,
                nextText: 3.1
            },
            {
                text: 'Go into the left room',
                requiredState: (currentState) => currentState.scienceSaved,
                nextText: 3.1
            },
            {
                text: 'Go into the left room',
                requiredState: (currentState) => currentState.scienceKilled,
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
            {
                text: 'Go back out',
                nextText: 2
            },
        ]
    },
    {
        id: 3.1,
        text: "As you slowly approach the left room, trying to minimise the amount of noise you make, you see that in the corner of your eye a zombie dressed in a lab coat, bashing a cabinet for who know how long. You could try to sneak up onto the zombie or "+
        "go the safer route and just leave the zombie and his cabinet alone.",
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-left.jpg',
        sound2: 'assets/sounds/zombieBashing.wav',
        options: [
            {
                text: 'Sneak up and attack',
                requiredState: (currentState) => !currentState.WarVeteran || !currentState.Priest,
                nextText: 3.11           
            },
            {
                text: 'Sneak up and attack',
                requiredState: (currentState) => currentState.WarVeteran,
                nextText: 3.12
            },
            {
                text: 'Sneak up and stab him with the syringe',
                requiredInventory: { 'vaccineReal': true },
                setInventory: { 'vaccineReal' : false },
                nextText: 3.13
            },
            {
                text: 'Sneak up and stab him with the syringe',
                requiredInventory: { 'vaccineFake': true },
                setInventory: { 'vaccineFake' : false },
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
        text: "As you try to sneak up to the zombie, you trip and alerted the zombie. It wasn't long until it realises you were there and devoured you for his next dinner.<br><br><a href=\"EndStatistics.html\">See Statistics</a>",
        note: '',
        inventory: '',
        sound: 'assets/sounds/zombieseating.wav',
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    {
        id: 3.12,
        text: "With the amount of training you have had as a war veteran, this type of ambush is natural to you. As you knock the zombie over with your feet, you deliver heavy blows until he is no longer moving. Brutal but effective.",
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-left.jpg',
        sound2: 'assets/sounds/wooshwoosh.wav',
        options: [
            {
                text: 'Inspect the room',
                requiredState: (currentState) => !currentState.WarVeteran,
                setState: { scienceKilled : true },
                nextText: 3.111           
            },
        ]
    },
    {
        id: 3.14,
        text: "You approach stealthly as possible and when you got in range you stabbed the back of his neck with your syringe. The zombie stumble back for a bit due to the stab however gets back quickly and pounces on you before turning you into his next dinner.<br><br><a href=\"EndStatistics.html\">See Statistics</a>",
        inventory: '',
        note: '',
        sound: 'assets/sounds/zombieseating.wav',
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    {
        id: 3.13,
        text: 'You approach stealthly as possible and when you got in range you stabbed the back of his neck with your syringe. The zombie stumble back for a bit due to the stab, then lays there for a moment before their skin colour returning to normal along with their sight.' +
        ` "Wait I'm alive...and who are you?"`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-left.jpg',
        options: [
            {
                text: 'Explain the situation',
                setState: { scienceSaved : true },
                nextText: 3.141         
            },
        ]
    },
    {
        id: 3.141,
        text: `"I see...thank you for saving me. I'm afraid I can't help you much though with my memory being blurry and everything."`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-left.jpg',
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
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-left.jpg',
        options: [
            {
                text: "Thank's that's all I have to ask",
                setState: { heatAsk : true },
                nextText: 3.144      
            },
            {
                text: "What's the passcode to the safe?",
                setState: { heatAsk : true },
                requiredState: (currentState) => currentState.seenSafe && !currentState.safeAsk,
                nextText: 3.143      
            },
        ]
    },
    {
        id: 3.143,
        text: `"The passcode? uh that safe belongs to dave, his experimentations are out of our scopes, last time I checked this guy was trying to break the "fourth wall" whatever that means, if I have to guess his password it would probably be something to do with that"`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-left.jpg',
        options: [
            {
                text: "Thank's that's all I have to ask",
                setState: { safeAsk : true },
                nextText: 3.144      
            },
            {
                text: 'Is there anything that can help with the heating?',
                setState: { safeAsk : true },
                requiredState: (currentState) => !currentState.heatAsk,
                nextText: 3.142      
            },
        ]
    },
    {
        id: 3.144,
        text: `"If that is everything you want to ask of me then I'm going to leave and try to find my daughter if she is still out there somewhere. Take care."`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-left.jpg',
        options: [
            {
                text: "Look around the room",
                nextText: 3.111     
            },
        ]
    },
    {
        id: 3.111,
        text: `The room is relatively tiny with a window leading to the outside, there is a wooden cabinet here with many scratches over but can't seem to be opened without bashing it with something. The rooms is covered in various "fluids" ranging from blood to questionable matters, ideally you want to leave the room soon as possible however judging from the zombie in the room, it seems that they attracted to this room, you might be able to use that to your advantage.`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-left.jpg',
        sound: 'assets/sounds/moreHorror.wav',
        options: [
            {
                text: "Setup Camp",
                setState: { bloodRoom : true },
                nextText: "camp"   
            },
            {
                text: "Inspect the cabinet",
                requiredInventory: { 'bodyPart': false },
                nextText: 3.1112    
            },
            {
                text: "Leave the room",
                nextText: 3    
            },
        ]
    },
    {
        id: 3.1112,
        text: `The cabinet infront of you seems to be badly damaged with multiple scratches all over it with a lock that looks like that won't work anymore. The only option seems to brute force the cabinet open however as you approach the cabinet it has a really foul smell coming out of it. You have a bad feeling about this.`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-left.jpg',
        options: [
            {
                text: "Break the cabinet open with a hammer",
                requiredInventory: { 'bodyPart': false },
                requiredInventory: { 'hammer': true },
                nextText: 3.11121
            },
            {
                text: "Look at the body parts",
                requiredState: (currentState) => currentState.bodyPartSeen,
                nextText: 3.111     
            },
            {
                text: "Trust your instinct and leave",
                nextText: 3.111     
            },
        ]
    },
    
    {
        id: 3.11121,
        text: `Nothing could've prepared you for what was in that cabinet...multiple pieces of dismembered human body parts from different humans were in there ranging from the head to legs to hands, oh god I think I'm going to puke.`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-left.jpg',
        options: [
            {
                text: "Pick up the body parts",
                requiredInventory: { 'bodyPart': false },
                setInventory: { bodyPart: true },
                setState: { bodyPartSeen : true },
                nextText: 3.11121     
            },
            {
                text: "Leave before you puke",
                nextText: 3.111     
            },
        ]
    },
    {
        id: 3.2,
        text: `You walk down stairs to be faced with a metallic iron door, upon opening said door, it reveals to be a storage of medicine and chemicals for the lab however upon further inspection, it seems to have been converted to in a bunker by the previous occupant, not that you are complaining with plenty of food and water. There is also a toolbox here if you want to repair things?`,
        note: 'assets/images/lab-room-basement.jpg',
        sound: 'assets/sounds/taptap.wav',
        inventory: '',
        image: 'assets/images/lab-room-basement.jpg',
        options: [
            {
                text: "Setup camp",
                setState: { basement : true },
                nextText: "camp"
            },
            {
                text: "Check the toolbox",
                nextText: 3.22 
            },
            {
                text: "Check the large amount of chemicals",
                requiredState: (currentState) => !currentState.Doctor && currentState.seenRecipe,
                requiredInventory: { 'chemicalDumb': false },
                nextText: 3.231   
            },
            {
                text: "Check the large amount of chemicals",
                requiredState: (currentState) => currentState.Doctor && currentState.seenRecipe,
                requiredInventory: { 'chemical': false },
                nextText: 3.232   
            },
            {
                text: "Stomp on the ground really hard",
                requiredState: (currentState) => currentState.heatAsk && !currentState.basementHeat,
                setState: { basementHeat : true },
                nextText: 3.24  
            },
            {
                text: "Go back",
                nextText: 3
            }
        ]
    },
    {
        id: 3.22,
        text: `You inspect the toolbox before you, most of the tools inside are very rusted due humidity of the storage room however there is a miniature platinum hammer that seems to be in pristine condition. You want to question how much this costed the owner but right now you're just glad to find one functioning tool. Well...there is also dropper in here? and a vintage bolt cutter.`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-basement.jpg',
        sound2: 'assets/sounds/toolbox.wav',
        options: [
            {
                text: "Pick up the hammer",
                requiredInventory: { 'hammer': false },
                setInventory: { hammer: true },
                nextText: 3.22  
            },
            {
                text: "Pick up the dropper",
                requiredInventory: { 'dropper': false },
                setInventory: { dropper: true },
                nextText: 3.22  
            },
            {
                text: "Pick up the bolt cutter",
                requiredInventory: { 'Bolt Cutters': false },
                setInventory: { 'Bolt Cutters' : true},
                nextText: 3.22  
            },
            {
                text: "Go back",
                nextText: 3.2
            },
        ]
    },
    {
        id: 3.231,
        text: `After searching through all the chemical in the storage you found a box labelled "top secret" in a child like scribble. Upon opening you see five power like substance contained each in their little containers but of course none of them have labels attached to them. In no particular order the colour of the power were blue, gray, white, white and well white`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-basement.jpg',
        sound2: 'assets/sounds/scavage.wav',
        options: [
            {
                text: "Pick up all the chemical",
                requiredInventory: { 'chemicalDumb': false },
                setInventory: { chemicalDumb: true },
                nextText: 3.231     
            },
            {
                text: "Go back",
                nextText: 3.2    
            },
        ]
    },
    {
        id: 3.232,
        text: `After searching through all the chemical in the storage you found a box labelled "top secret" in a child like scribble. Upon opening you see five power like substance contained each in their little containers but of course none of them have labels attached to them. With your background knowledge in basic chemistry they seem to be Copper (II) sulfate, Lithium chloride, Calcium carbonate, Potassium chloride and Sodium borate`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-basement.jpg',
        sound2: 'assets/sounds/scavage.wav',
        options: [
            {
                text: "Pick up all the chemical",
                requiredInventory: { 'chemical': false },
                setInventory: { chemical: true },
                nextText: 3.232 
            },
            {
                text: "Go back",
                nextText: 3.2    
            },
        ]
    },
    {
        id: 3.24,
        text: `After stomping on the ground like a lunatic, it seems like you triggered some hidden mechanic of the building with the lights flashing to red and the following messaged being heard "emergency generator activated" as you pondered if that did anything, the basement suddenly gotten warmer.`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-basement.jpg',
        sound2: 'assets/sounds/stomp.wav',
        options: [
            {
                text: "Ponder what to do next",
                nextText: 3.2    
            },
        ]
    },
    {
        id: 3.3,
        text: `You enter a room that seems to be a experimentation room with chemistry equipment on the table with a piece a paper on the side and a safe on the right on side of the wall.`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        options: [
            {
                text: "Inspect the chemistry set",
                requiredInventory: { 'vaccineReal' : false, 'vaccineFake' : false},
                nextText: 3.31  
            },
            {
                text: "Read the note",
                setState: { seenRecipe : true },
                nextText: 3.32 
            },
            {
                text: "Attempt the safe",
                setState: { seenSafe : true },
                nextText: 3.33
            },
            {
                text: "Setup camp",
                setState: { experiment : true },
                nextText: "camp"
            },
            {
                text: "Go back",
                nextText: 3   
            },
        ]
    },
    {
        id: 3.31,
        text: 'You look at the chemistry set, there is a bunsen burner, a couple of flasks and a magnetic mixer',
        note: ``,
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        options: [
            {
                text: "Burn some chemicals with bunsen burner",
                requiredInventory: { 'chemicalDumb': true },
                nextText: 3.311 
            },
            {
                text: "Burn some chemicals with bunsen burner",
                requiredInventory: { 'chemical': true },
                nextText: 3.312
            },
            {
                text: "Mix the chemicals (you can't back out of this)",
                requiredInventory: { 'plasticContainerAsh': true, 'chemicalDumb': true },
                nextText: 3.313
            },
            {
                text: "Mix the chemicals (you can't back out of this)",
                requiredInventory: { 'plasticContainerAsh': true, 'chemical': true },
                nextText: 3.313
            },
            {
                text: "Go back",
                nextText: 3.3 
            },
        ]
    },
    {
        id: 3.311,
        text: `You decided to burn some of the chemicals but which ones?`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        sound2: 'assets/sounds/flameTest.wav',
        options: [
            {
                text: "Burn substance A",
                nextText: 3.3111  
            },
            {
                text: "Burn substance B",
                nextText: 3.3112 
            },
            {
                text: "Burn substance C",
                nextText: 3.3113
            },
            {
                text: "Burn substance D",
                nextText: 3.3114
            },
            {
                text: "Burn substance E",
                nextText: 3.3115
            },
            {
                text: "Stop burning chemicals",
                nextText: 3.3
            },
        ]
    },
    {
        id: 3.312,
        text: `You decided to burn some of the chemicals but which ones?`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        sound2: 'assets/sounds/flameTest.wav',
        options: [
            {
                text: "Burn Sodium Borate",
                nextText: 3.3111  
            },
            {
                text: "Burn Potassium Chloride",
                nextText: 3.3112 
            },
            {
                text: "Burn Copper (II) Sulfate",
                nextText: 3.3113
            },
            {
                text: "Burn Lithium Chloride",
                nextText: 3.3114
            },
            {
                text: "Burn Calcium Carbonate",
                nextText: 3.3115
            },
            {
                text: "Stop burning chemicals",
                nextText: 3.3
            },
        ]
    },
    {
        id: 3.3111,
        text: `You burn the substance, the flame was Yellow and well deadly.`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        options: [
            {
                text: "Burn something else",
                requiredInventory: { 'chemicalDumb': true },
                nextText: 3.311  
            },
            {
                text: "Burn something else",
                requiredInventory: { 'chemical': true },
                nextText: 3.312 
            },
            {
                text: "Stop burning chemicals",
                nextText: 3.3
            },
        ]
    },
    {
        id: 3.3112,
        text: `You burn the substance, the flame was Purple and burned very brutally.`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        options: [
            {
                text: "Burn something else",
                requiredInventory: { 'chemicalDumb': true },
                nextText: 3.311  
            },
            {
                text: "Burn something else",
                requiredInventory: { 'chemical': true },
                nextText: 3.312 
            },
            {
                text: "Stop burning chemicals",
                nextText: 3.3
            },
        ]
    },
    {
        id: 3.3113,
        text: `You burn the substance, the flame was Cyan and was very tamed.`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        options: [
            {
                text: "Burn something else",
                requiredInventory: { 'chemicalDumb': true },
                nextText: 3.311  
            },
            {
                text: "Burn something else",
                requiredInventory: { 'chemical': true },
                nextText: 3.312 
            },
            {
                text: "Stop burning chemicals",
                nextText: 3.3
            },
        ]
    },
    {
        id: 3.3114,
        text: `You burn the substance, the flame was Red.`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        options: [
            {
                text: "Burn something else",
                requiredInventory: { 'chemicalDumb': true },
                nextText: 3.311  
            },
            {
                text: "Burn something else",
                requiredInventory: { 'chemical': true },
                nextText: 3.312 
            },
            {
                text: "Stop burning chemicals",
                nextText: 3.3
            },
        ]
    },
    {
        id: 3.3115,
        text: `You burn the substance, the flame was Orange and didn't react as deadly.`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        options: [
            {
                text: "Burn something else",
                requiredInventory: { 'chemicalDumb': true },
                nextText: 3.311  
            },
            {
                text: "Burn something else",
                requiredInventory: { 'chemical': true },
                nextText: 3.312 
            },
            {
                text: "Stop burning chemicals",
                nextText: 3.3
            },
        ]
    },
    {
        id: 3.313,
        text: `You decided that it's time to perform the synthesis of the drug but what substance to add first?`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        options: [
            {
                text: "Add chemical A",
                setState: { wrong : true },
                setState: { chemicalA : true },
                nextText: 3.3131              
            },
            {
                text: "Add chemical B",
                setState: { correct1 : true },
                setState: { chemicalB : true },
                nextText: 3.3131
            },
            {
                text: "Add Chemical C",
                setState: { wrong : true },
                setState: { chemicalC : true },
                nextText: 3.3131
            },
            {
                text: "Add Chemical D",
                setState: { wrong : true },
                setState: { chemicalD : true },
                nextText: 3.3131   
            },
            {
                text: "Add Chemical E",
                setState: { wrong : true },
                setState: { chemicalE : true },
                nextText: 3.3131   
            },
            {
                text: "Add Ash",
                requiredInventory: { 'plasticContainerAsh': true },
                setState: { wrong : true },
                setInventory: {plasticContainerAsh: false},
                nextText: 3.3131   
            },
        ]
    },
    {
        id: 3.3131,
        text: `You added in the chemical, now what else?`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        sound2: 'assets/sounds/objectDrop.wav',
        options: [
            {
                text: "Add chemical A",
                setState: { correct2 : true },
                requiredState: (currentState) => !currentState.chemicalA,
                setState: { chemicalA : true },
                nextText: 3.3132             
            },
            {
                text: "Add chemical B",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalB,
                setState: { chemicalB : true },
                nextText: 3.3132
            },
            {
                text: "Add Chemical C",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalC,
                setState: { chemicalC : true },
                nextText: 3.3132
            },
            {
                text: "Add Chemical D",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalD,
                setState: { chemicalD : true },
                nextText: 3.3132   
            },
            {
                text: "Add Chemical E",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalE,
                setState: { chemicalE : true },
                nextText: 3.3132   
            },
            {
                text: "Add Ash",
                requiredInventory: { 'plasticContainerAsh': true },
                setState: { wrong : true },
                setInventory: {plasticContainerAsh: false},
                nextText: 3.3132   
            },
        ]
    },
    {
        id: 3.3132,
        text: `You added in the chemical, now what else?`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        sound2: 'assets/sounds/objectDrop.wav',
        options: [
            {
                text: "Add chemical A",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalA,
                setState: { chemicalA : true },
                nextText: 3.3133             
            },
            {
                text: "Add chemical B",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalB,
                setState: { chemicalB : true },
                nextText: 3.3133
            },
            {
                text: "Add Chemical C",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalC,
                setState: { chemicalC : true },
                nextText: 3.3133
            },
            {
                text: "Add Chemical D",
                setState: { correct3 : true },
                requiredState: (currentState) => !currentState.chemicalD,
                setState: { chemicalD : true },
                nextText: 3.3133   
            },
            {
                text: "Add Chemical E",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalE,
                setState: { chemicalE : true },
                nextText: 3.3133   
            },
            {
                text: "Add Ash",
                requiredInventory: { 'plasticContainerAsh': true },
                setState: { wrong : true },
                setInventory: {plasticContainerAsh: false},
                nextText: 3.3133   
            },
        ]
    },
    {
        id: 3.3133,
        text: `You added in the chemical, now what else?`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        sound2: 'assets/sounds/objectDrop.wav',
        options: [
            {
                text: "Add chemical A",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalA,
                setState: { chemicalA : true },
                nextText: 3.3134          
            },
            {
                text: "Add chemical B",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalB,
                setState: { chemicalB : true },
                nextText: 3.3134
            },
            {
                text: "Add Chemical C",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalC,
                setState: { chemicalC : true },
                nextText: 3.3134
            },
            {
                text: "Add Chemical D",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalD,
                setState: { chemicalD : true },
                nextText: 3.3134   
            },
            {
                text: "Add Chemical E",
                setState: { correct4 : true },
                requiredState: (currentState) => !currentState.chemicalE,
                setState: { chemicalE : true },
                nextText: 3.3134   
            },
            {
                text: "Add Ash",
                requiredInventory: { 'plasticContainerAsh': true },
                setState: { wrong : true },
                setInventory: {plasticContainerAsh: false},
                nextText: 3.3134   
            },
        ]
    },
    {
        id: 3.3134,
        text: `You added in the chemical, now what else?`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        sound2: 'assets/sounds/objectDrop.wav',
        options: [
            {
                text: "Add chemical A",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalA,
                setState: { chemicalA : true },
                nextText: 3.3135          
            },
            {
                text: "Add chemical B",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalB,
                setState: { chemicalB : true },
                nextText: 3.3135
            },
            {
                text: "Add Chemical C",
                setState: { correct5 : true },
                requiredState: (currentState) => !currentState.chemicalC,
                setState: { chemicalC : true },
                nextText: 3.3135
            },
            {
                text: "Add Chemical D",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalD,
                setState: { chemicalD : true },
                nextText: 3.3135   
            },
            {
                text: "Add Chemical E",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalE,
                setState: { chemicalE : true },
                nextText: 3.3135   
            },
            {
                text: "Add Ash",
                requiredInventory: { 'plasticContainerAsh': true },
                setState: { wrong : true },
                setInventory: {plasticContainerAsh: false},
                nextText: 3.3135   
            },
        ]
    },
    {
        id: 3.3135,
        text: `You added in the chemical, now what else?`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        sound2: 'assets/sounds/objectDrop.wav',
        options: [
            {
                text: "Add chemical A",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalA,
                setState: { chemicalA : true },
                nextText: 3.3136          
            },
            {
                text: "Add chemical B",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalB,
                setState: { chemicalB : true },
                nextText: 3.3136
            },
            {
                text: "Add Chemical C",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalC,
                setState: { chemicalC : true },
                nextText: 3.3136
            },
            {
                text: "Add Chemical D",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalD,
                setState: { chemicalD : true },
                nextText: 3.3136   
            },
            {
                text: "Add Chemical E",
                setState: { wrong : true },
                requiredState: (currentState) => !currentState.chemicalE,
                setState: { chemicalE : true },
                nextText: 3.3136   
            },
            {
                text: "Add Ash",
                requiredInventory: { 'plasticContainerAsh': true },
                setState: { correct6 : true },
                setInventory: {plasticContainerAsh: false},
                nextText: 3.3136   
            },
        ]
    },
    {
        id: 3.3136,
        text: `You have added everything, now the moment of truth did you do everything correct?`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        options: [
            {
                text: "Proceed",
                requiredState: (currentState) => !currentState.wrong,
                nextText: 3.31361          
            },
            {
                text: "Proceed",
                requiredState: (currentState) => currentState.wrong,
                nextText: 3.31362
            },
        ]
    },
    {
        id: 3.31361,
        text: `Honestly you couldn't believe it, you made a cure to the zombie outbreak but what in the world are you going to do with only one vial of it?`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        options: [
            {
                text: "Go back",
                setInventory: {vaccineReal: true},
                nextText: 3.3         
            },
        ]
    },
    {
        id: 3.31362,
        text: `I guess you didn't read the instructions carefully enough, I have no idea what this "mixture" is but it certainly ain't no vaccine.`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        options: [
            {
                text: "Go back",
                setInventory: {vaccineFake: true},
                nextText: 3.3         
            },
        ]
    },
    {
        id: 3.32,
        text: 'You read the note and it says: <br><button onClick="changeText();" class="changeText">Change Text</button> <button onClick="revertText();" class="changeText">Revert Text</button>',
        note: `The cure...yes I was so close but why did haven't anyone named the god damn chemicals in this place. The cure is so simple having the <b>most</b> reactive ingredients to the <b>least</b> reactive with some ash mixed in<br>last</b>.If Dave just gives us the cure we wouldn't even need to go through this hassle, with our cure only working once. Now if I remember correctly when burnt in the same order, it should go in the following.<br>Purple<br>Yellow<br>Red<br>Orange<br>Cyan`,
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        sound2: 'assets/sounds/flipping.wav',
        options: [
            {
                text: "Go back",
                nextText: 3.3 
            },
        ]
    },
    {
        id: 3.33,
        text: 'You look at the vault, was there some clue that could hint toward the passcode?',
        note: ``,
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        options: [
            {
                text: "Go back",
                nextText: 3.3 
            },
        ]
    },
    {
        id: 3.331,
        text: `I don't know how but you somehow managed to open the vault by either sheer luck or was it something else? Anyway inside was a glass casing with a note aside it.`,
        note: ``,
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        options: [
            {
                text: "Read the note",
                nextText: 3.3311 
            },
            {
                text: "Go back with cure?",
                setInventory: {cure: true},
                nextText: 3.3 
            },
        ]
    },
    {
        id: 3.3311,
        text: 'The note read:<br><button onClick="changeText();" class="changeText">Change Text</button> <button onClick="revertText();" class="changeText">Revert Text</button>',
        note: `Well done! you broke into my safe, your reward shall be the cure to this outbreak. How did I make it? Don't worry about it. Anyway the cure is inactive until the next day and the cure will infinitely reproduce itself. Cool right? - Dave`,
        inventory: '',
        image: 'assets/images/lab-room-right.jpg',
        options: [
            {
                text: "Go back",
                nextText: 3.331 
            },
        ]
    },
    {
        id: 4,
        text: `You decided that the best way to accomplish anything is to brute force through the dumbest way possible so you smash the glass and jumped in. Unfortunately for you there was a zombie there ready for you to land and became his next meal.<br><br><a href=\"EndStatistics.html\">See Statistics</a>`,
        note: '',
        inventory: '',
        sound2: 'assets/sounds/glassbreak.wav',
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    {
        id: 5,
        text: "Infront of you is a cluster of funguses with suspiciously blue colour, despite the really odd salty smell that reminds you very much of the ocean." +
        " This mushroom is so salty that it's a scientific miracle that this plant can even grow. Due to it's salty nature consuming it directly can be...distasteful but not life threatening." +
        " This is a good source of sodium if you need it.",
        note: '',
        inventory: '',
        image: 'assets/images/mushroom.jpg',
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
                requiredInventory: { 'Torch': true },
                nextText: 5.3
            },
        ]
    },
    {
        id: 5.1,
        text: "Infront of you is a cluster of funguses with suspiciously blue colour, despite the really odd salty smell that reminds you very much of the ocean.",
        note: '',
        inventory: '',
        image: 'assets/images/mushroom.jpg',
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
                requiredInventory: { 'Torch': true },
                nextText: 5.3
            },
        ]
    },
    {
        id: 5.3,
        text: "After burning the blue fungus, you can only describe the smell as putrid and horrorific smelling like rotten flesh although the smell is really bad you hope the zombie thinks the same",
        note: '',
        inventory: '',
        image: 'assets/images/mushroom.jpg',
        sound: 'assets/sounds/Fire.wav',
        options: [
            {
                text: 'Go back to the front',
                setState: { blueFungus : true },
                setState: { decay : true },
                nextText: 2
            },
        ]
    },
    {
        id: 5.2,
        text: "You consume the blue fungus before you put the mysterious fungus into your mouth, you take one deep breath and swallowed it whole. In matter of seconds you have already regretted you decisions that brought you here." +
        " The fungus was so salty that you feel like you just swallowed an entire desert into your mouth. It wasn't long until you passed out. Maybe don't just eat random mushrooms you see.",
        note: '',
        inventory: '',
        image: 'assets/images/mushroom.jpg',
        options: [
            {
                text: 'Go back',
                setState: { blueFungus : true },
                nextText: 2
            },
        ]
    },
    {
        id: 5.4,
        text: "You picked up some blue fungus to bring with you but you have no idea what to do with them or do you?",
        note: '',
        inventory: '',
        image: 'assets/images/mushroom.jpg',
        sound2: 'assets/sounds/PickMushrooms.wav',
        options: [
            {
                text: 'Go back to the front',
                setInventory: { blueFungus: true },
                setState: { blueFungus : true },
                nextText: 2
            },
        ]
    },
    {
        id: 6,
        text: "Infront of you is a cluster of funguses with suspiciously red colour, despite the sweet smelling aroma that is starting to start smell sickening, you knew right away" +
        " that this is a special type of mushroom that can boost ones vitality if the mushroom is first boiled and if you don't boil it, it is very posionous to any living mammal (reptiles seems to be fine)",
        note: '',
        inventory: '',
        image: 'assets/images/mushroom.jpg',
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
                requiredInventory: { 'Torch': true },
                nextText: 6.3
            },
        ]
    },
    {
        id: 6.1,
        text: "Infront of you is a cluster of funguses with suspiciously red colour, despite the sweet smelling aroma that is starting to start smell sickening. Honestly you really want to get away from this" +
        " as soon as possible. ",
        note: '',
        inventory: '',
        image: 'assets/images/mushroom.jpg',
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
                requiredInventory: { 'Torch': true },
                nextText: 6.3
            },
        ]
    },
    {
        id: 6.3,
        text: "Turns out the red fungus was really flammable, you barely out of the way before all of it burns up before you. There is now ash on the floor, if you have a container you could pick it up",
        note: '',
        inventory: '',
        image: 'assets/images/mushroom.jpg',
        sound: 'assets/sounds/Fire.wav',
        options: [
            {
                text: 'Go back to the front (the ash will be blown away by the wind)',
                setState: { redFungus : true },
                nextText: 2,
            },
            {
                text: 'Pick it up with plastic container',
                requiredInventory: { 'plasticContainer': true },
                setInventory: {plasticContainer: false, plasticContainerAsh: true},
                setState: { ash : true },
                setState: { redFungus : true },
                nextText: 2
            },
        ]
    },
    {
        id: 6.2,
        text: "You decided that eating the bright red cap was a good idea for your health and being so why not. Oh no, your internal systems are dying and screaming for help...<br><br><a href=\"EndStatistics.html\">See Statistics</a>",
        note: '',
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    {
        id: 6.4,
        text: "You picked up some red fungus to bring with you but you have no idea what to do with them or do you?",
        note: '',
        inventory: '',
        image: 'assets/images/mushroom.jpg',
        sound2: 'assets/sounds/PickMushrooms.wav',
        options: [
            {
                text: 'Go back to the front',
                setInventory: {redFungus: true},
                setState: { redFungus : true },
                nextText: 2
            },
        ]
    },
    {
        id: 20,
        text: "This really was a tiny little building made of wood, infact all you see is a little plastic container and well nothing.",
        note: '',
        inventory: '',
        image: 'assets/images/shed.jpg',
        tempChange: -1,
        options: [
            {
                text: 'Pick up the container',
                requiredInventory: { 'plasticContainer': false },
                setInventory: {plasticContainer: true},
                nextText: 20          
            },
            {
                text: 'Go back to the entrance',
                nextText: 2
            },
        ]
    },
    {
        id: "camp", //Ending zombie part depending on the barricade and trap.
        text: `You decided to setup camp for the night, are you sure you want to setup camp? This action will end the game.`,
        note: '',
        inventory: '',
        image: 'assets/images/lab-camp.jpg',
        options: [
            //room on the right
            {
                text: "Yes",
                requiredState: (currentState) => currentState.bloodRoom && !currentState.barricaded && !currentState.trap,
                nextText: "defenceNone"   
            },
            {
                text: "Yes",
                requiredState: (currentState) => currentState.bloodRoom && currentState.barricaded && !currentState.trap,
                nextText: "defenceBarricaded"   
            },
            {
                text: "Yes",
                requiredState: (currentState) => currentState.bloodRoom && !currentState.barricaded && currentState.trap,
                nextText: "defenceFire"   
            },
            {
                text: "Yes",
                requiredState: (currentState) => currentState.bloodRoom && currentState.barricaded && currentState.trap,
                nextText: "defencePure"   
            },
            //lab on the left
            {
                text: "Yes",
                requiredState: (currentState) => currentState.experiment && !currentState.barricaded && !currentState.trap,
                nextText: "defenceNone"   
            },
            {
                text: "Yes",
                requiredState: (currentState) => currentState.experiment && currentState.barricaded && !currentState.trap,
                nextText: "defenceBarricaded"   
            },
            {
                text: "Yes",
                requiredState: (currentState) => currentState.experiment && !currentState.barricaded && currentState.trap,
                nextText: "defenceFire"   
            },
            {
                text: "Yes",
                requiredState: (currentState) => currentState.experiment && currentState.barricaded && currentState.trap,
                nextText: "defencePure"   
            },
            
            //basement
            {
                text: "Yes",
                requiredState: (currentState) => currentState.basement && !currentState.barricaded && !currentState.trap,
                nextText: "defenceNone"    
            },
            {
                text: "Yes",
                requiredState: (currentState) => currentState.basement && currentState.barricaded && !currentState.trap,
                nextText: "defenceBarricaded"    
            },
            {
                text: "Yes",
                requiredState: (currentState) => currentState.basement && !currentState.barricaded && currentState.trap,
                nextText: "defenceFire"    
            },
            {
                text: "Yes",
                requiredState: (currentState) => currentState.basement && currentState.barricaded && currentState.trap,
                nextText: "defencePure"    
            },
            //Nothing
            {
                text: "Yes",
                requiredState: (currentState) => !currentState.bloodRoom && !currentState.basement && !currentState.experiment && !currentState.barricaded && !currentState.trap,
                nextText: "defenceNone"   
            },
            //nope
            {
                text: "no",
                requiredState: (currentState) => currentState.bloodRoom,
                setState: { bloodRoom : false },
                nextText: 3.111   
            },
            {
                text: "no",
                requiredState: (currentState) => currentState.experiment,
                setState: { experiment : false },
                nextText: 3.3  
            },
            {
                text: "no",
                requiredState: (currentState) => currentState.basement,
                setState: { bloodRoom : false },
                nextText: 3.2  
            },
            {
                text: "no",
                requiredState: (currentState) => !currentState.basement && !currentState.experiment && !currentState.bloodRoom,
                nextText: 3  
            },
        ]
    },
    {
        id: "defenceNone",
        text: "Unfortunately with no defences at night, it was almost impossible to defend yourself despite the lower amount of zombies at the testing center. It didn't take very long for the zombies to quickly overwhelm the facility and collapsing onto you.<br><br><a href=\"EndStatistics.html\">See Statistics</a>",
        note: '',
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    {
        id: "defenceBarricaded",
        text: "With how little zombies there are around this place, the simple barricade you put up should be more than enough to keep out those zombies which fortunately for you is true. After some time has passed the zombies eventually gave up and left however the worst of it is yet to come...the storm.",
        note: '',
        inventory: '',
        image: 'assets/images/lab-barricade',
        options: [
            {
                text: 'Wait until the storm',
                requiredState: (currentState) => !currentState.experiment && currentState.bloodRoom && !currentState.basementHeat && !currentState.basement,
                nextText: "bloodFreeze"         
            },
            {
                text: 'Wait until the storm',
                requiredState: (currentState) => currentState.experiment && !currentState.bloodRoom && !currentState.basementHeat && !currentState.basement,
                nextText: "experimentFreeze"
            },
            {
                text: 'Wait until the storm',
                requiredState: (currentState) => !currentState.experiment && !currentState.bloodRoom && !currentState.basementHeat && currentState.basement,
                nextText: "basementFreeze"
            },
            {
                text: 'Wait until the storm',
                requiredState: (currentState) => !currentState.experiment && !currentState.bloodRoom && currentState.basementHeat && currentState.basement,
                nextText: "survive"
            },
        ]
    },
    {
        id: "defenceFire",
        text: "The trap you set outside with the gasoline turned out to work wonders as the zombies weren't dumb or intelligent as they walked away from the facility while some did try but quickly became ablazed. Unfortunately the gasoline won't be able to heat you up for the snow storm.",
        note: '',
        inventory: '',
        image: 'assets/images/lab-barricade',
        options: [
            {
                text: 'Wait until the storm',
                requiredState: (currentState) => !currentState.experiment && currentState.bloodRoom && !currentState.basementHeat && !currentState.basement,
                nextText: "bloodFreeze"         
            },
            {
                text: 'Wait until the storm',
                requiredState: (currentState) => currentState.experiment && !currentState.bloodRoom && !currentState.basementHeat && !currentState.basement,
                nextText: "experimentFreeze"
            },
            {
                text: 'Wait until the storm',
                requiredState: (currentState) => !currentState.experiment && !currentState.bloodRoom && !currentState.basementHeat && currentState.basement,
                nextText: "basementFreeze"
            },
            {
                text: 'Wait until the storm',
                requiredState: (currentState) => !currentState.experiment && !currentState.bloodRoom && currentState.basementHeat && currentState.basement,
                nextText: "survive"
            },
        ]
    },
    {
        id: "defencePure",
        text: "The trap you set outside with the gasoline turned out to work wonders as the zombies weren't dumb or intelligent as they walked away from the facility while some did try but quickly became ablazed. The extra defence from the barricade probably wasn't needed but you feel a lot safer I guess? Anyway you have bigger problems surviving this snow storm.",
        note: '',
        inventory: '',
        image: 'assets/images/lab-barricade',
        options: [
            {
                text: 'Wait until the storm',
                requiredState: (currentState) => !currentState.experiment && currentState.bloodRoom && !currentState.basementHeat && !currentState.basement,
                nextText: "bloodFreeze"         
            },
            {
                text: 'Wait until the storm',
                requiredState: (currentState) => currentState.experiment && !currentState.bloodRoom && !currentState.basementHeat && !currentState.basement,
                nextText: "experimentFreeze"
            },
            {
                text: 'Wait until the storm',
                requiredState: (currentState) => !currentState.experiment && !currentState.bloodRoom && !currentState.basementHeat && currentState.basement,
                nextText: "basementFreeze"
            },
            {
                text: 'Wait until the storm',
                requiredState: (currentState) => !currentState.experiment && !currentState.bloodRoom && currentState.basementHeat && currentState.basement,
                nextText: "survive"
            },
        ]
    },
    {
        id: "bloodFreeze",
        text: "Unfortunately in this bloody room, the blood isn't exactly warm as it use to be and without any other source of heat, you very quickly started to lose conciousness.<br><br><a href=\"EndStatistics.html\">See Statistics</a>",
        note: '',
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    {
        id: "experimentFreeze",
        text: "While intially you did try to use the bunsen burner to give yourself a bit of heat but eventually the gas ran out and the temperature kept dropping. It wasn't long until you started to lose conciousness.<br><br><a href=\"EndStatistics.html\">See Statistics</a>",
        note: '',
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    {
        id: "baseFreeze",
        text: "The basement while being much further from the surface, didn't really have a impact on the coldness which eventually got much colder as the night gone on and you start to lose conciousness.<br><br><a href=\"EndStatistics.html\">See Statistics</a>",
        note: '',
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    {
        id: "timeOut",
        text: "While you busy gathering resources, you fail to realise that you have ran out of time, a zombie sneaked up on you and quickly ended your life.<br><br><a href=\"EndStatistics.html\">See Statistics</a>",
        note: '',
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    {
        id: "freeze",
        text: "It's so cold...I can't be bothered to think or move anymore, I think I'm just going to lay here for 5 minute....<br><br><a href=\"EndStatistics.html\">See Statistics</a>",
        note: '',
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    {
        id: "hot",
        text: "You somehow managed to burn yourself to death in a forzen tundra, honestly you should consider this a achievement.<br><br><a href=\"EndStatistics.html\">See Statistics</a>",
        note: '',
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
    },
    {
        id: "survive",
        text: "With the emergency generator up and running, it was actually quite comfortable down here, in fact it was so cosy that before you realised, it was approaching day with the birds chirping outside...",
        note: '',
        inventory: '',
        image: 'assets/images/lab-room-basement.jpg',
        options: [
            {
                text: 'Conclude',
                requiredInventory: { 'cure': false },
                setState: { GameWin : true },
                nextText: "victory"         
            },
            {
                text: 'Conclude',
                requiredInventory: { 'cure': true },
                setState: { GameWin : true },
                nextText: "trueVictory"
            },
        ]
    },
    {
        id: "victory",
        text: "You have successfully survived the night through the zombie horde and through the most intense snow storm but what now? Sure there is no more zombies but who can say there wouldn't be any in future? But that isn't your concern right now as you are free to do anything now.<br><br><a href=\"EndStatistics.html\">See Statistics</a>",
        note: '',
        inventory: '',
        image: 'assets/images/Victory2_TEST-GIF.gif',
    },
    {
        id: "trueVictory",
        text: "Not only did you managed to survive the night you have been able to get the cure to stop all future outbreaks, finally the world can return back to how it was before but that is a tale for another time.<br><br><a href=\"EndStatistics.html\">See Statistics</a>",
        note: '',
        inventory: '',
        image: 'assets/images/Victory2_TEST-GIF.gif',
    },
]

startGame(); // Function call to start the game