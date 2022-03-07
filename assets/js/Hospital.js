const textElement = document.getElementById('DialogueHospital');          // The text to be displayed on-screen
const optionButtonsElement = document.getElementById('ButtonsHospital');  // The buttons/options available to the player
const inventoryElement = document.getElementById('inventory');            // The player's inventory
const imageElement = document.getElementById('ImageDisplay');             // The image to be displayed on-screen
const profession = getProfession();                                       // This will store the profession
let state = {};                                                           // This will store the game's current/active state
var buttonActive;




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
    showTextNode(1)  // Will display the first text node (id=1)
}




/**This function will display the current text node
 * 
 * @param textNodeIndex - This is the id number of the text node to be displayed
 */
function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex); // Finds the text node by comparing to parameter input.                                    
    typeSentence(textNode.text); // Changes the dialogue box to text stored in the text node.
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
                setState: {collectMushrooms: true, FirstAid: false, FireWood: false},
                nextText: 5,
            },
            {
                text: 'Check out the First Aid kits scattered across the ground',
                setState: {crowbar: false, collectMushrooms: true, FirstAid: false, FireWood: false},
                nextText: 8
            },
            {
                text: 'Check out the abandoned campfire',
                setState: {crowbar: false, collectMushrooms: true, FirstAid: false, FireWood: false},
                nextText: 10
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
                requiredState: (currentState) => currentState.crowbar === true,
                nextText: 3
            },
            {
                text: 'Collect mushrooms',
                requiredState: (currentState) => currentState.collectMushrooms === true,
                nextText: 6
            },
            {
                text: 'Talk to stranger camping in front of the Hospital',
                requiredState: (currentState) => currentState.crowbar === false,
                nextText: 5
            },
            {
                text: 'Check out the First Aid kits scattered across the ground',
                nextText: 8
            },
            {
                text: 'Check out the abandoned campfire',
                nextText: 10
            }
        ]
    },



    // The first visit to the inside the Hospital
    {
        id: 3,
        text: "You enter the main Lobby of the abandoned Hospital which, upon entering, looks completely decrepit and old. There are broken walls, leaking pipes, water" +
            " dripping from almost every ceiling and blood on the walls, only fuelling your fear of what could be lurking among the rooms of the Hospital...<br>As you look into" +
            " each of the rooms you see a <strong>Bone Saw</strong>, an <strong>Electric Blanket</strong> and <strong>some fuel</strong>",
        inventory: '',
        image: 'assets/images/Hospital_Inside.jpg',
        options: [
            {
                text: 'Go outside the Hospital',
                nextText: 2
            },
            {
                text: 'Check out the Bone Saw',
                nextText: 12
            },
            {
                text: 'Check out the Electric Blanket',
                nextText: 14
            }
        ]
    },



    // Every visit to the inside of the Hospital after the first one
    {
        id: 4,
        text: "You return to the main Lobby inside the abandoned Hospital to stay sheltered from the arctic winds outside, the dripping water slowly driving you insane. However, you can" +
            " still see a <strong>Bone Saw</strong>, an <strong>Electric Blanket</strong> and <strong>some fuel</strong>",
        inventory: '',
        image: 'assets/images/Hospital_Inside.jpg',
        options: [
            {
                text: 'Go outside the Hospital',
                nextText: 2
            },
            {
                text: 'Check out the Bone Saw',
                nextText: 12
            },
            {
                text: 'Check out the Electric Blanket',
                nextText: 14
            }
        ]
    },



    // Player interacts with stranger outside the Hospital
    {
        id: 5,
        text: 'As you approach the stranger he starts speaking to you.<br><br>"Hello there stranger, the name\'s Charles, I used to be a member of the swiss police, but that\'s a long story. Anywho,' +
        ' I saw that the door to the Hospital was locked, but you might be able to pry it' +' open with this crowbar. I\'d do it myself but I\'m not as strong as I used to be. However, before I give' +
        ' them to you, I would be grateful if you could give me some mushrooms. I think there was some near the entrance to the Hospital Grounds."',
        inventory: '',
        image: 'assets/images/Hospital_Outside.jpg',
        options: [
            {
                text: 'Return to the front of the Hospital',
                setState: {crowbar: false},
                nextText: 2
            },
            {
                text: 'Trade the mushrooms for the crowbar',
                requiredState: (currentState) => currentState.collectMushrooms === false,
                nextText: 7
            },
            {
                text: 'Try to forcefully take the crowbar',
                nextText: 100
            }
        ]
    },



    // Collect mushrooms for the stranger
    {
        id: 6,
        text: 'You see a lot of mushrooms growing in the bushes and overgrown foilage, it takes you while to collect them as you had to avoid thorns, but eventually' +
            ' you acquire all the mushrooms for the Stranger in front of the Hospital',
        inventory: '',
        image: 'assets/images/Hospital_Outside.jpg',
        options: [
            {
                text: 'Return to the front of the Hospital',
                setState: {collectMushrooms: false},
                nextText: 2
            }
        ]
    },



    // You traded the mushrooms for the crowbar
    {
        id: 7,
        text: '"Thank you kind stranger, and as promised, here\'s the crowbar you need. Good luck!"<br><br>You take the crowbar from him',
        inventory: '',
        image: 'assets/images/Hospital_Outside.jpg',
        options: [
            {
                text: "Return to the front of the Hospital",
                setState: {crowbar: true},
                nextText: 2
            }
        ]
    },



    // You check out the First Aid kits scattered on the ground
    {
        id: 8,
        text: 'You see that among all the thorns and brambles are a lot of First Aid kits, each of them looking decades old, as if they\'ve been here' +
            ' since the Second World War. You also notice that the First Aid kits each have parts missing, which would make sense as surely a lot of people' +
            ' have been salvaging them. Nearby you also notice that there are a lot of <strong>Mushrooms.</strong> Do you attempt to salvage the First Aid kits?',
        inventory: '',
        image: 'assets/images/Hospital_Outside.jpg',
        options: [
            {
                text: 'You have already salvaged the First Aid kits, you have no more business here',
                requiredState: (currentState) => currentState.FirstAid === true,
                nextText: 2
            },
            {
                text: 'Don\'t salvage the First Aid kits and instead return to the front of the Hospital',
                requiredState: (currentState) => currentState.FirstAid === false,
                nextText: 2
            },
            {
                text: 'Salvage the First Aid kits',
                requiredState: (currentState) => currentState.FirstAid === false,
                setState: {FirstAid: true},
                nextText: 9
            },
            {
                text: 'Collect the nearby Mushrooms',
                requiredState: (currentState) => currentState.collectMushrooms === true,
                nextText: 6
            }
        ]

    },



    // You salvaged the First Aid kits
    {
        id: 9,
        text: 'Even though it took you a while and resulted in you getting cut on the thorns a few times, you eventually managed to salvage what you could' +
            ' from the First Aid kits.',
        inventory: '',
        image: 'assets/images/Hospital_Outside.jpg',
        options: [
            {
                text: 'Return to the front of the Hospital',
                nextText: 2
            }
        ]
    },



    // You check out the abandoned campfire
    {
        id: 10,
        text: 'As you approach the campfire, the smell of smoke is overwhelming, "Someone, or something, has definitely been here!", you think to yourself' +
            ' worryingly. However, there is some spare leftover Fire Wood beside the campfire, do you take it? ',
        inventory: '',
        image: 'assets/images/Hospital_Outside.jpg',
        options: [
            {
                text: 'You already collected all the wood from the campfire, there\'s no need for you to be here. Return to the front of the Hospital',
                requiredState: (currentState) => currentState.FireWood === true,
                nextText: 2
            },
            {
                text: 'Leave the campfire alone for now, as you feel like you might be able to make use of it later',
                requiredState: (currentState) => currentState.FireWood === false,
                nextText: 2
            },
            {
                text: 'Take the Fire Wood from the campfire to use later',
                requiredState: (currentState) => currentState.FireWood === false,
                setState: {FireWood:true},
                nextText: 11
            },
            {
                text: 'Collect the nearby Mushrooms',
                requiredState: (currentState) => currentState.collectMushrooms === true,
                nextText: 6
            }
        ]
    },



    // You decided to take the Fire Wood from the abandoned Campfire
    {
        id: 11,
        text: 'You picked up all the pieces of wood from the campfire and put them in your bag, hoping that you\'ll be able to use them later and that no unsavoury' +
            ' creatures will hunt you down for taking the wood',
        inventory: '',
        image: 'assets/images/Hospital_Outside.jpg',
        options: [
            {
                text: 'Return to the front of the Hospital',
                nextText: 2
            }
        ]
    },



    // You check out the Bone Saw
    {
        id: 12,
        text: 'Among all the clutter in a surgical room you spot what looks like a Bone Saw or Gigli Saw, you feel as if it might be a good idea to take this with you' +
            ' as a weapon in case you need to defend yourself. Do you take the Bone Saw?',
        inventory: '',
        image: 'assets/images/Hospital_Inside.jpg',
        options: [
            {
                text: 'Take the Bone Saw',
                nextText: 13
            },
            {
                text: 'Don\'t take the Bone Saw and return to main lobby of the Hospital',
                nextText: 4
            }
        ]
    },



    // You decided to take the Bone Saw
    {
        id: 13,
        text: 'You decided to take the Bone Saw agreeing with the fact that it\'ll make a great weapon should the zombies attack you, especially considering that you' +
            ' cut yourself a little putting it into your bag, surprised at its sharpness after all these years',
        inventory: '',
        image: 'assets/images/Hospital_Inside.jpg',
        options: [
            {
                text: 'Head back to the main lobby of the Hospital',
                nextText: 4
            }
        ]
    },



    // You check out the Electric Blanket
    {
        id: 14,
        text: 'You look under the counter of the Hospital Lobby and find an electric blanket, and with how cold it is in the building, and with hoe it\'s even worse outside' +
            ' the Hospital, you feel like having the Electric Blanket will prove to be a crucial item to have to keep you warm as the night approaches. Do you take the Electric Blanket?',
        inventory: '',
        image:  'assets/images/Hospital_Inside.jpg',
        options: [
            {
                text: 'Take the Electric Blanket',
                nextText: 15
            },
            {
                text: 'Don\'t take the Electric Blanket and return to the Hospital Lobby',
                nextText: 4
            }
        ]
    },



    // You decide to take the Electric Blanket
    {
        id: 15,
        text: 'With freezing hands, you take the Electric Blanket out from under the counter and place it in your bag, hoping that somewhere, you\'ll be able to find an outlet' +
            ' to plug the blanket into to warm you up.',
        inventory: '',
        image: 'assets/images/Hospital_Inside.jpg',
        options: [
            {
                text: 'Head back to the main lobby of the Hospital',
                nextText: 4
            }
        ]
    },



    // You try to forcefully take the crowbar - ENDING 1
    {
        id: 100,
        text: 'You try to take the crowbar from the Stranger by force, but as you do so he pulls out a knife and stabs you to death' +
            ' <br><b><em>You Died!</em></b><br><br><h2><a href="EndStatistics.html">See Statistics</a></h2>',
        inventory: '',
        image: 'assets/images/Game_Over_TEST-IMAGE.jpg',
        options: [
            {
                text: 'Play Again?',
                nextText: -1
            }
        ]
    }
];




/**Ideas that might be easier to implement once an inventory system has been added
 * 
 * @todo - Eating the collected mushrooms instead of trading will cause you to die of poisoning
 * @todo - The Hunter and War Veteran can have the option to break into the Hospital without the need of a crowbar
 *  
*/




// Calls the startGame() function to start the game
startGame();