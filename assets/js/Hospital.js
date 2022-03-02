const textElement = document.getElementById('DialogueHospital');          // The text to be displayed on-screen
const optionButtonsElement = document.getElementById('ButtonsHospital');  // The buttons/options available to the player
const inventoryElement = document.getElementById('inventory');            // The player's inventory
const imageElement = document.getElementById('ImageDisplay');             // The image to be displayed on-screen
const profession = getProfession();                                       // This will store the profession
let state = {};                                                           // This will store the game's current/active state



// This function will start the game
function startGame() {
    // State is set to the profession chosen
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
        // Else State is made empty
        state = {};
    }
    showTextNode(1)  // Will display the first text node (id=100)
}


/**This function will display the current text node
 * 
 * @param textNodeIndex - This is the id number of the text node to be displayed
 */
function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex); // Finds the text node by comparing to parameter input.
    textElement.innerHTML = textNode.text;                                      // Changes the dialogue box to text stored in the text node.
    inventoryElement.innerHTML = textNode.inventory;
    imageElement.src = textNode.image;
    while(optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');              // Creates a new button.
            button.innerText = option.text;                               // Button text is changed to suit the option text
            button.classList.add('buttonChoice');                         // Sets the button class for styling.
            button.addEventListener('click', () => selectOption(option)); // Adds event listener
            optionButtonsElement.appendChild(button); 
        }
    })
}


/**This function shows the current option selected
 * 
 * @param option - the option (button) to be displayed on-screen
 */ 
function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}


/** This function allows states to be updated depending on the otpion selected
 * 
 * @param option - the option (button) to be displayed on-screen
 */
function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) { // If the text node id is < 0, the game is restarted
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);

}


// The list of Text Nodes that can be selected
const textNodes = [
    // The first visit to the outside of the Hospital
    {
        id: 1,
        text: "You arrive at a Hospital, and judging by its ancient and run-down appearance it's likely that it's been abandoned for at least 17 years." + 
            " Although you feel the need to turn away, curiosity and the concern for what might be waiting for you in the forest beckons you closer to the" +
            " collosal building, and as you approach it, the air gets colder around you...<br>Around you, you see some <strong>worn-down First Aid kits</strong>" +
            " and <strong>an abandoned campfire.</strong> Furthermore, the door to the Hospital seems <strong>locked</strong> but something like a crowbar could pry it open.",
        inventory: '',
        image: 'assets/images/Hospital_Outside.jpg',
        options: [
            {
                text: 'Talk to stranger camping in front of the Hospital',
                nextText: 5
            }
        ]
    },

    // Every visit to the outside of the Hospital after the first one
    {
        id: 2,
        text: "You return to the outside of the Hospital, the air colder than it was than when you first arrived, yet you still feel as if you have unfinished business..." +
            "<br>Around you, you still see some <strong>worn-down First Aid kits</strong> and <strong>an abandoned campfire</strong>",
        inventory: '',
        image: 'assets/images/Hospital_Outside.jpg',
        options: [
            {
                text: 'Go inside the Hospital',
                requiredState: (currentState) => currentState.crowbar,
                nextText: 4
            },
            {
                text: 'Talk to stranger camping in front of the Hospital',
                requiredState: (currentState) => currentState.crowbar === false,
                nextText: 5
            }
        ]
    },

    // The first visit to the inside the Hospital
    {
        id: 3,
        text: "You decided to enter the abandoned Hospital which, upon entering, is much more decrepit than you first thought. There are broken walls, leaking pipes, water" +
            " dripping from almost every ceiling and blood on the walls, only fuelling your fear of what could be lurking amongst the rooms of the Hospital...<br>As you look into" +
            " each of the rooms you see a <strong>Bone Saw</strong>, an <strong>Electric Blanket</strong> and <strong>some fuel</strong>",
        inventory: '',
        image: 'assets/images/Hospital_Inside.jpg',
        options: [
            {
                text: 'Go outside the Hospital',
                nextText: 2
            }
        ]
    },

    // Every visit to the inside of the Hospital after the first one
    {
        id: 4,
        text: "You decide to go back inside the abandoned Hospital to stay sheltered from the arctic winds outside, the dripping water slowly driving you insane. However, you can" +
            " still see a <strong>Bone Saw</strong>, an <strong>Electric Blanket</strong> and <strong>some fuel</strong>",
        inventory: '',
        image: 'assets/images/Hospital_Inside.jpg',
        options: [
            {
                text: 'Go outside the Hospital',
                nextText: 2
            }
        ]
    },

    // Player interacts with stranger outside the Hospital
    {
        id: 5,
        text: 'As you approach the stranger he starts speaking to you.<br><br>"Hello there stranger, I saw that the door to the Hospital was locked, but you might be able to pry it' +
            ' open with this crowbar. I\'d do it myself but I\'m not as strong as I used to be. so here, take it!"',
        inventory: '',
        image: 'assets/images/Hospital_Outside.jpg',
        options: [
            {
                text: 'Take the Crowbar',
                setState: {crowbar:true},
                nextText: 6
            },
            {
                text: 'Don\'t take the crowbar and go back',
                setState: {crowbar:false},
                nextText: 2
            }
        ]
    },

    // You took the crowbar
    {
        id: 6,
        text: "You took the crowbar, believing that you will now be able to enter the Hospital",
        inventory: 'crowbar',
        image: 'assets/images/Hospital_Outside.jpg',
        options: [
            {
                text: "Return to the front of the Hospital",
                nextText: 2
            }
        ]
    }
];

// Calls the startGame() function to start the game
startGame();