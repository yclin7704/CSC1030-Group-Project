const textElement = document.getElementById('DialogueHospital');          // The text to be displayed on-screen
const optionButtonsElement = document.getElementById('ButtonsHospital');  // The buttons/options available to the player
const inventoryElement = document.getElementById('inventory');            // The player's inventory
const imageElement = document.getElementById('ImageDisplay');             // The image to be displayed on-screen
const profession = getProfession();                                       // This will store the profession
let state = {};                                                           // This will store the game's current/active state
var buttonActive;
let random = [];




// Changes the text from the handwritten style to the normal font
function changeText(){
    document.getElementById('handwritten').style.fontFamily = "Roboto Mono", 'monospace';
    document.getElementById('handwritten').style.fontSize = "1.3rem";
 }
 // Changes the text from the normal font back to the font for handwritten notes / documents
function revertText(){
    document.getElementById('handwritten').style.fontFamily = "Reenie Beanie", 'cursive';
    document.getElementById('handwritten').style.fontSize = "2rem";
}




// This function will start the game
function startGame() {
    // State is set to the profession chosen
    switch(profession){
        case "Mechanic": state = {Mechanic: true}; break;
        case "Doctor": state = {Doctor: true}; break;
        case "Hunter": state = {Hunter: true}; break;
        case "War Veteran": state = {WarVeteran: true}; break;
        case "Priest": state = {Priest: true}; break;
        default: state = {}; break;
    }
    showTextNode(1)  // Will display the first text node (id=1)
}




/**This function will display the current text node
 * 
 * @param textNodeIndex - This is the id number of the text node to be displayed
 */
function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex); // Finds the text node by comparing to parameter input.                                    
    typeSentence(textNode.text, "DialogueHospital"); // Changes the dialogue box to the text stored in the TextNode.
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
            value = option.text2;
            button.addEventListener('click', () => selectOption(option)); // Adds event listener
            if (value === "decrease") {
                button.addEventListener('click', () => decreaseTemp("decrease"));
            }
            else if (value === "increase") {
                button.addEventListener('click', () => decreaseTemp("increase"));
            }
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
            " , <strong>an abandoned campfire</strong> and a <strong>pathway.</strong> Furthermore, the door to the Hospital seems <strong>locked</strong> but" +
            " something like a crowbar could pry it open.",
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
        options: [
            {
                text: 'Talk to stranger camping in front of the Hospital',
                setState: {collectMushrooms: true, FirstAid: false, FireWood: false, matches: false, Fuel: false, BoneSaw: false, ElectricBlanket: false},
                text2: "decrease",
                nextText: 5,
            },
            {
                text: 'Check out the First Aid kits scattered across the ground',
                setState: {crowbar: false, collectMushrooms: true, FirstAid: false, FireWood: false, matches: false, Fuel: false, BoneSaw: false, ElectricBlanket: false},
                nextText: 8
            },
            {
                text: 'Check out the abandoned campfire',
                setState: {crowbar: false, collectMushrooms: true, FirstAid: false, FireWood: false, matches: false, Fuel: false, BoneSaw: false, ElectricBlanket: false},
                nextText: 10
            },
            {
                text: "Follow the pathway",
                setState: {crowbar: false, collectMushrooms: true, FirstAid: false, FireWood: false, matches: false, Fuel: false, BoneSaw: false, ElectricBlanket: false},
                nextText: 4
            }
        ]
    },



    // Every visit to the outside of the Hospital after the first one
    {
        id: 2,
        text: "You return to the outside of the Hospital, the air colder than it was than when you first arrived, yet you still feel as if you have unfinished business..." +
            "<br>Around you, you still see some <strong>worn-down First Aid kits</strong>, <strong>an abandoned campfire</strong> and a <strong>pathway</strong>",
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
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
                text2: "decrease",
                nextText: 5
            },
            {
                text: 'Check out the First Aid kits scattered across the ground',
                nextText: 8
            },
            {
                text: 'Check out the abandoned campfire',
                nextText: 10
            },
            {
                text: "Follow the pathway",
                nextText: 4
            }
        ]
    },



    // The first visit to the inside the Hospital
    {
        id: 3,
        text: "You enter the main Lobby of the abandoned Hospital which, upon entering, looks completely decrepit and old. There are broken walls, leaking pipes, water" +
            " dripping from almost every ceiling and blood on the walls, only fuelling your fear of what could be lurking among the rooms of the Hospital...<br>As you look into" +
            " each of the rooms you see a <strong>Bone Saw</strong>, an <strong>Electric Blanket</strong> and <strong>some fuel</strong>. There's also an <strong>abandoned room</strong>" +
            " at the end of the Lobby.",
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Inside.jpg',
        options: [
            {
                text: 'Go outside the Hospital',
                nextText: 2
            },
            {
                text: 'Enter abandoned room at the end of the lobby',
                nextText: 18
            },
            {
                text: 'Check out the Bone Saw',
                nextText: 12
            },
            {
                text: 'Check out the Electric Blanket',
                nextText: 14
            },
            {
                text: 'Check out the Fuel',
                nextText: 16
            }
        ]
    },



    // Every visit to the inside of the Hospital after the first one
    {
        id: 4,
        text: "You followed the pathway through brambles and <strong>Mushrooms</strong> and it led to the back of the Hospital, which is just as overgrown as the front of the Hospital. However, now that you're behind" +
            " the Hospital, the cold winds aren't as strong which you're thankful for. As you scan the area you see some <strong>crates</strong> on the ground and, surrounded" +
            " by shattered pieces of glass, you see what looks to be like <strong>documents</strong>",
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
        options: [
            {
                text: 'Return to the front of the Hospital',
                nextText: 2
            },
            {
                text: "Search the crates",
                nextText: 19
            },
            {
                text: "Look at the discarded documents",
                nextText: 24
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
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
        options: [
            {
                text: 'Return to the front of the Hospital',
                setState: {crowbar: false},
                text2: "decrease",
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
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
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
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
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
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
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
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
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
            ' worryingly. However, beside the smoldering campfire there is some spare leftover Fire Wood, do you take it? ',
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
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
            },
            {
                text: "Light the smoldering campfire for warmth",
                requiredState: (currentState) => currentState.Fuel === true && currentState.matches === true,
                setState: {Fuel: false, matches: false},
                nextText: 22    
            },
            {
                text: "Sit by the Campfire for warmth",
                requiredState: (currentState) => currentState.LitFire === true,
                text2: "increase",
                nextText: 23
            }
        ]
    },



    // You decided to take the Fire Wood from the abandoned Campfire
    {
        id: 11,
        text: 'You picked up all the pieces of wood from the campfire and put them in your bag, hoping that you\'ll be able to use them later and that no unsavoury' +
            ' creatures will hunt you down for taking the wood',
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
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
        image: 'assets/images/Hospital/Hospital_Inside.jpg',
        options: [
            {
                text: 'Take the Bone Saw',
                requiredState: (currentState) => currentState.BoneSaw === false,
                nextText: 13
            },
            {
                text: 'Don\'t take the Bone Saw and return to main lobby of the Hospital',
                requiredState: (currentState) => currentState.BoneSaw === false,
                nextText: 3
            },
            {
                text: "You already took the Bone Saw as a weaopn, you have no business here. Return to the Hospital Lobby",
                requiredState: (currentState) => currentState.BoneSaw === true,
                nextText: 3
            }
        ]
    },



    // You decided to take the Bone Saw
    {
        id: 13,
        text: 'You decided to take the Bone Saw agreeing with the fact that it\'ll make a great weapon should the zombies attack you, especially considering that you' +
            ' cut yourself a little putting it into your bag, surprised at its sharpness after all these years',
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Inside.jpg',
        options: [
            {
                text: 'Head back to the main lobby of the Hospital',
                setState: {BoneSaw: true},
                nextText: 3
            }
        ]
    },



    // You check out the Electric Blanket
    {
        id: 14,
        text: 'You look under the counter of the Hospital Lobby and find an electric blanket, and with how cold it is in the building, and with hoe it\'s even worse outside' +
            ' the Hospital, you feel like having the Electric Blanket will prove to be a crucial item to have to keep you warm as the night approaches. Do you take the Electric Blanket?',
        inventory: '',
        image:  'assets/images/Hospital/Hospital_Inside.jpg',
        options: [
            {
                text: 'Take the Electric Blanket',
                requiredState: (currentState) => currentState.ElectricBlanket === false,
                nextText: 15
            },
            {
                text: 'Don\'t take the Electric Blanket and return to the Hospital Lobby',
                requiredState: (currentState) => currentState.ElectricBlanket === false,
                nextText: 3
            },
            {
                text: "You already took the Electric Blanket, you have no business here. Return to the Hospital Lobby",
                requiredState: (currentState) => currentState.BoneSaw === true,
                nextText: 3
            }
        ]
    },



    // You decide to take the Electric Blanket
    {
        id: 15,
        text: 'With freezing hands, you take the Electric Blanket out from under the counter and place it in your bag, hoping that somewhere, you\'ll be able to find an outlet' +
            ' to plug the blanket into to warm you up.',
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Inside.jpg',
        options: [
            {
                text: 'Head back to the main lobby of the Hospital',
                setState: {ElectricBlanket: true},
                nextText: 3
            }
        ]
    },



    // You check out the Fuel
    {
        id: 16,
        text: 'In the Storage Closet on the right hand side of the Lobby, you can see some fuel. However, it\'s stashed way at the back of the closet, but you feel like it' +
            ' might be useful to have. Do you try to take the Fuel?',
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Inside.jpg',
        options: [
            {
                text: 'Take the Fuel',
                requiredState: (currentState) => currentState.Fuel === false,
                nextText: 17
            },
            {
                text: 'Don\'t take the Fuel and return to the Hospital Lobby',
                requiredState: (currentState) => currentState.Fuel === false,
                nextText: 3
            },
            {
                text: "You've already taken the fuel, you have no business here. Return to the Hospital Lobby",
                requiredState: (currentState) => currentState.Fuel === true,
                nextText: 3
            }
        ]
    },



    // You decided to take the Fuel
    {
        id: 17,
        text: 'After spending a lot of time rummaging through the Storage Closet you eventually manage to get the fuel from the back, brushing all the dust off your shoulders' +
            ' you return to the Hospital Lobby',
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Inside.jpg',
        options: [
            {
                text: 'Head back to the main lobby of the Hospital',
                setState: {Fuel: true},
                nextText: 3
            }
        ]
    },



    // You decided to enter the abandoned room
    {
        id: 18,
        text: 'You slowly enter the abandoned room, it\'s very quiet and also quite spacious. You feel as if that this might be a good place to camp out for the night and' +
            ' make your <strong>Final Stand</strong>. Do you wish to stay here and prepare for the night ahead?',
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Inside.jpg',
        options: [
            {
                text: 'Yes! Make my Final Stand and don\'t look back',
                nextText: 50
            },
            {
                text: 'No! Leave the room and return to the Hospital Lobby',
                nextText: 3
            }
        ]
    },



    // You search the crates behind the Hospital
    {
        id: 19,
        text: "As you search the Crates behind the Hospital you find a lot of useless junk like the broken bottles of what looks like alcohol and also" +
            " a lot of <strong>old newspapers</strong>. However, lying at the bottom of one of the crates you see a half-filled box of <strong>matches</strong>" +
            " which you feel could be very useful to have.",
        inventory: '',
        image: 'assets/images/Hospital/Wooden_Crates.jpg',
        options: [
            {
                text: "Return to the back of the Hospital",
                nextText: 4
            },
            {
                text: "Read the Old Newspaper",
                nextText: 20
            },
            {
                text: "Take the matches",
                requiredState: (currentState) => currentState.matches === false,
                nextText: 21
            }
        ]
    },



    // You decide to read the Newspaper
    {
        id: 20,
        text: "The Newspaper, although mysteriously cut-off, dates back two weeks ago, the 10th March 1999, and it reads...<br>" +
            "<button onClick=\"changeText();\" class=\"changeText\">Change Text</button> <button onClick=\"revertText();\" class=\"changeText\">Revert Text</button>" +
            " <span class=\"handwritten\" id=\"handwritten\">BREAKING NEWS - Civilians Going Missing!!<br>Recently, it's been reported that up to 30 people from local towns" +
            " and cities have suddenly vanished without trace. Local Police have been investigating the homes of each one of these individuals and what's most astonishing is" +
            " that in every single case there isn't a single piece of evidence left behind by the perpetrators. The Police have advised that you stay on high alert in the" +
            " coming days, by locking door and windows as they continue to search for a conclusion into what's going on. However rumours have begun to spread that it might be.......</span>",
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
        options: [
            {
                text: "Go back to looking at the crates",
                nextText: 19
            }
        ]
    },



    // You decide to take the matches
    {
        id: 21,
        text: "You decide that taking the matches will be a good idea. So, you reach down into the bottom of the crate and get the box of matches, sincerely hoping that" +
            " both the strong winds won't prevent them from being useful and that at least one of them works and that they aren't all duds making the venture pointless",
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
        options: [
            {
                text: "Return to looking at the crates",
                setState: {matches: true},
                nextText: 19
            }
        ]
    },



    // You decide to light the Campfire
    {
        id: 22,
        text: "You pour the fuel you found inside the Hospital over the smoldering campfire, and then light one of the matches you found in the crates behind the Hospital" +
            " and thankfully it doesn't immediately get blown out, so you through it on the fuel, and instantly a fire roars to life, and you can feel the strong warmth" + 
            " cover your body which feels nice as opposed to the freezing cold of the Tundra",
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
        options: [
            {
                text: "Go back to searching the Campfire and its surroundings",
                setState: {LitFire: true},
                nextText: 10
            },
            {
                text: "Sit by the Campfire",
                setState: {LitFire: true},
                text2: "increase",
                nextText: 23
            }
        ]
    },



    // You decide to sit next to the lit Campfire
    {
        id: 23,
        text: "You sit in silence in front of the Campfire allowing you to warm yourself up before returning to your search of the area...",
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
        options: [
            {
                text: "Go back to searching the Campfire and its surroundings",
                nextText: 10
            }
        ]
    },



    // You decide to look at the discarded documents
    {
        id: 24,
        text: "As you open the discarded documents, you realise that these aren't just any normal documents, but are instead Hospital documents. When you turn to the next page" +
            " it mentions some kind of experiment with human testing in excruciating detail, and on the next page there seems to be a log entry from one of the scientists. Do" +
            " you keep reading?",
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
        options: [
            {
                text: "Go back to searching the back of the Hospital",
                nextText: 4
            },
            {
                text: "Keep reading the Hospital documents",
                nextText: 25
            }
        ]
    },



    // You prepare for the night
    {
        id: 50,
        text: 'You decided to get ready for the night ahead by making some last minute preparations to the abandoned room and just in general so you\'ll suvive...',
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Inside.jpg',
        options: [
            {
                text: 'Barricade the windows with the wood from the Campfire',
                requiredState: (currentState) => currentState.FireWood === true,
                nextText: 20
            },
            {
                text: 'Use the Fire Wood from the Campfire to make your own campfire here',
                requiredState: (currentState) => currentState.FireWood === true,
                nextText: 21
            },
            {
                text: 'Start the Night',
                requiredState: (currentState) => currentState.FirstAid === false &&
                                                 currentState.FireWood === false &&
                                                 currentState.BoneSaw === false &&
                                                 currentState.ElectricBlanket === false &&
                                                 currentState.Fuel === false,
                nextText: 101
            },
            {
                text: 'Start the Night',
                requiredState: (currentState) => currentState.BoneSaw === true,
                nextText: 102
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
    },



    // You decided to start the Night without making any preparations - ENDING 3
    {
        id: 101,
        text: 'You decided not to make any preparations at all and waited patiently for the night to fall over the Hospital. However, due to your lack' +
            ' of preparations the Zombies started climbing through the windows and piling through the door to the abandoned room. You immediately became' +
            ' overwhelmed and with no weapon to defend yourself, you had to accept your fate...' +
            '<br><b><em>You Died!</em></b><br><br><h2><a href="EndStatistics.html">See Statistics</a></h2>',
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
        options: [
            {
                text: 'Play Again?',
                nextText: -1
            }
        ]
    },



    // You deicded to start the night while only having the Bone Saw as a weapon - ENDING 4
    {
        id: 102,
        text: 'You decided not to make any defence preparations at all and waited patiently for the night to consume the Hospital in darkness, confident in' +
            ' the fact that you\'ll be able to survive with just the Bone Saw as your weapon of choice. As night arrives, the Zombies start climbing through' +
            ' the windows and also start piling through the door. Howver you start slashing the zombies down one by one with the Bone saw until there are none left' +
            '<br><b><em>You Survived!</em></b><br><br><h2><a href="EndStatistics.html">See Statistics</a></h2>',
        inventory: '',
        image: 'assets/images/Victory2_TEST-GIF.gif',
        options: [
            {
                text: 'Play Again?',
                nextText: -1
            }
        ]
    },



    // You died to Frostbite - ENDING 5
    {
        id: 103,
        text: "As the harsh colds and strong winds of the tundra surround you, you can feel your body becoming weaker and weaker by the second, to the point that you can't" +
            " even feel anything, numbed by the cold. With no will left to move, you sit there slowly but surely succumbing to the frozen wasteland's wrath, and eventually..." +
            "You die of Frostbite...<br><br><a href=\"EndStatistics.html\">See Statistics</a>",
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
        options: [
            {
                text: "Play Again?",
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