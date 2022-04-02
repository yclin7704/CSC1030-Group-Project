const textElement = document.getElementById('DialogueHospital');          // The text to be displayed on-screen
const optionButtonsElement = document.getElementById('ButtonsHospital');  // The buttons/options available to the player
const inventoryElement = document.getElementById('inventory');            // The player's inventory
const imageElement = document.getElementById('ImageDisplay');             // The image to be displayed on-screen
const profession = sessionStorage.getItem("profession");                  // This will store the profession                                                       
let state = getGameState();                                               // This will store the game's current/active state

function getGameState() {
	let savedData = sessionStorage.getItem("HospitalGameState");
	console.log(savedData);
	if (savedData) return JSON.parse(savedData);
	else
		return {
			// TODO: Get profession properly with sessionStorage.getItem("profession");
			profession: "Hunter",
		};
}




// Contains all of the text entries for the Hospital Documents
const  entries = ["Log Entry 1:</br>Some strange men started appearing in the Hospital recently, with more of them coming and going more frequently as time went on. Unfortunately, we still don't know what their goals are yet but we believe that maybe they are here to oversee our recent task given to us by the local government, which is to perform a series of highly classified experiments which will ultimately determine the future of Humanity. However we'll have to see how it all plays out in the long run...<br><br> Dr. Nallig",
    "Log Entry 11:<br>A bit of a long entry today. I think I've finally discovered the purpose of these strange men, as recently the tests we've been performing have required human subjects and they've all been failures so far, but these men have somehow managed to keep providing us with what they call \"willing test subjects\". However, although I do doubt that the test subjects were willing to do this, I think it would be best for me to keep my head down and keep running tests as I wouldn't dare question them on where they get the test subjects, as I fear what would happen to me should I do so...<br><br> Dr. Nallig",
    "Log Entry 27:<br>Unfortuantely, all of our tests keep resulting in failure and we were going to give up. However recently, some of the test subjects have started to experience some extreme side-affects, such as violent tendencies, screaming and scratching themselves as if they're trying to get rid of an itch on their body. I still don't know the cause of this as of yet, but part of me believes it has something to do with the serum that we were asked to test, as after searching through some of the strange men's documents, it seems that they are using the blood of some fossilised creature. I feel like now might be the time to step up and ask some questions, before any more life is wasted at the hands of us and these men...<br><br> Dr. Nallig ",
    "Log Entry ???:<br>Today I woke up in a strange room that I think might be one of the testing rooms, as there are windows looking out behind the Hospital. However, I fear this might be the last Log Entry I do when my mind is my own, as since I woke up I've been experiencing a strong itching sensation, which probably means that I was injected with the serum and might not have much time left. I knew that asking questions was a bad thing but at least I was able to see the end-result of the test that they were keeping secret even from us. It would seem that the blood samples they were using contained some kind of parasite and/or bacteria that pretty much leads to a partial breakdown of the body making the subjects look like zombie figures. The itching is really bad now like it's under the skin, to whoever reads this, the world is in danger, there's someone that you need to speak to, he created the serum and might know of an antidote his name is.................."
];

// Stores the index position for the array
var entry = 0;

// Allows the player to move onto the next Entry in the Hospital Documents
function NextText(){
    entry += 1
    /**
     * If the next entry to be displayed doesn't exist (is outside the array)
     * Then change the entry value back to the last entry in the entries array
     */
    if (entry >= entries.length) {
        entry = entries.length-1;
    }
    // Displays the appropriate text within the entries array
    document.getElementById("handwritten").innerHTML = entries[entry];
}

// Allows the player to move back to the previous Entry in the Hospital Documents
function PreviousText(){
    entry -= 1;
    /**
     * If the next entry to be displayed doesn't exist (is outside the array)
     * Then change the enry value back to the very first entry in the entries array
     */
    if (entry < 0) {
        entry = 0;
    }
    // Displays the appropriate text within the entries array
    document.getElementById("handwritten").innerHTML = entries[entry];
}




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
    state = {Doctor: true};

    // Displays the inventory
    showInventory();

    // This will take the player to the appropriate Text Node when day ends, and when night ends
    setTimerData(showTextNode, 29, 101);

	// This will take the player to the appropriate Text Node if they die of frostbite or heat stroke
    setTemperatureData(showTextNode, 103, 111);
    
    // Will display the first text node (id=1)
    showTextNode(1);
}




/**This function will display the current text node
 * 
 * @param textNodeIndex - This is the id number of the text node to be displayed
 */
function showTextNode(textNodeIndex){
    if (textNodeIndex === "Warehouse"){
        window.location.href = "Warehouse.html";
    }
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex); // Finds the text node by comparing to parameter input.                                    
    typeSentence(textNode.text, "DialogueHospital"); // Changes the dialogue box to the text stored in the TextNode.
    updateInventory(textNode.inventory);
    crossfadeAudio(textNode.sound);
    playSound(textNode.sound2);
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
            sessionStorage.setItem("HospitalGameState", JSON.stringify(state));
        }
    })
}




/**This function shows the current option selected
 * 
 * @param option - the option (button) to be displayed on-screen
 */ 
function showOption(option) {
    return (option.requiredState == null || option.requiredState(state)) && meetsInventoryRequirements(option.requiredInventory);
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
    updateInventory(option.setInventory);
    showTextNode(nextTextNodeId);
    changeTemp(option.tempChange);
    showTextNode(nextTextNodeId);
}




// The list of Text Nodes that can be selected
const textNodes = [


    // The first visit to the outside of the Hospital
    {
        id: 1,
        text: "You arrive at a Hospital, and judging by its ancient and run-down appearance it's likely that it's been abandoned for at least 17 years." + 
            " Although you feel the need to turn away, curiosity and the concern for what might be waiting for you in the forest beckons you closer to the" +
            " collosal building, and as you approach it, the air gets colder around you...</br>Around you, you see some <strong>worn-down First Aid kits</strong>" +
            " , <strong>an abandoned campfire</strong> and a <strong>pathway.</strong> Furthermore, the door to the Hospital seems <strong>locked</strong> but" +
            " something like a crowbar could pry it open.",
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
        sound: 'assets/sounds/wind.wav',
        options: [
            {
                text: 'Talk to stranger camping in front of the Hospital',
                setState: {collectMushrooms: true},
                tempChange: 'decrease',
                nextText: 5,
            },
            {
                text: 'Check out the First Aid kits scattered across the ground',
                requiredState: (currentState) => currentState.Doctor === true || currentState.WarVeteran === true,
                setState: {collectMushrooms: true},
                tempChange: 'decrease',
                nextText: 8
            },
            {
                text: 'Check out the abandoned campfire',
                setState: {collectMushrooms: true},
                tempChange: 'decrease',
                nextText: 10
            },
            {
                text: "Follow the pathway",
                setState: {collectMushrooms: true},
                tempChange: 'decrease',
                nextText: 4
            },
            {
                text: "Go back to the Warehouse",
                tempChange: "decrease",
                nextText: "Warehouse"
            }
        ]
    },



    // Every visit to the outside of the Hospital after the first one
    {
        id: 2,
        text: "You return to the outside of the Hospital, the air colder than it was than when you first arrived, yet you still feel as if you have unfinished business..." +
            "</br>Around you, you still see some <strong>worn-down First Aid kits</strong>, <strong>an abandoned campfire</strong> and a <strong>pathway</strong>",
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
        sound: 'assets/sounds/wind.wav',
        options: [
            {
                text: 'Go inside the Hospital',
                requiredInventory: {Crowbar: true},
                tempChange: 'decrease',
                nextText: 3
            },
            {
                text: 'Collect mushrooms',
                requiredState: (currentState) => currentState.collectMushrooms === true,
                tempChange: 'decrease',
                nextText: 6
            },
            {
                text: 'Talk to stranger camping in front of the Hospital',
                requiredInventory: {Crowbar: false},
                tempChange: 'decrease',
                nextText: 5
            },
            {
                text: 'Check out the First Aid kits scattered across the ground',
                requiredState: (currentState) => currentState.Doctor === true || currentState.WarVeteran === true,
                tempChange: 'decrease',
                nextText: 8
            },
            {
                text: 'Check out the abandoned campfire',
                tempChange: 'decrease',
                nextText: 10
            },
            {
                text: "Follow the pathway",
                tempChange: 'decrease',
                nextText: 4
            },
            {
                text: "Go back to the Warehouse",
                tempChange: "decrease",
                nextText: "Warehouse"
            }
        ]
    },



    // The first visit to the inside the Hospital
    {
        id: 3,
        text: "You enter the main Lobby of the abandoned Hospital which, upon entering, looks completely decrepit and old. There are broken walls, leaking pipes, water" +
            " dripping from almost every ceiling and blood on the walls, only fuelling your fear of what could be lurking among the rooms of the Hospital...</br>As you look into" +
            " each of the rooms you see a <strong>Bone Saw</strong> and <strong>some liquid Benzene</strong>. There's also an <strong>abandoned room</strong>" +
            " at the end of the Lobby.",
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Inside.jpg',
        sound: 'assets/sounds/WaterDripping.wav',
        options: [
            {
                text: 'Go outside the Hospital',
                tempChange: -1,
                nextText: 2
            },
            {
                text: 'Enter abandoned room at the end of the lobby',
                tempChange: -1,
                nextText: 18
            },
            {
                text: 'Check out the Bone Saw',
                tempChange: -1,
                nextText: 12
            },
            {
                text: 'Check out the Liquid Benzene',
                tempChange: -1,
                nextText: 16
            }
        ]
    },



    // You followed the pathway that leads to the back of the Hospital
    {
        id: 4,
        text: "You followed the pathway through brambles and <strong>Mushrooms</strong> and it led to the back of the Hospital, which is just as overgrown as the front of the Hospital. However, now that you're behind" +
            " the Hospital, the cold winds aren't as strong which you're thankful for. As you scan the area you see some <strong>crates</strong> on the ground and, surrounded" +
            " by shattered pieces of glass, you see what looks to be like <strong>documents</strong>",
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
        sound: 'assets/sounds/wind.wav',
        options: [
            {
                text: 'Return to the front of the Hospital',
                tempChange: -1,
                nextText: 2
            },
            {
                text: "Search the crates",
                tempChange: -1,
                nextText: 19
            },
            {
                text: "Look at the discarded documents",
                tempChange: -1,
                nextText: 24
            }
        ]
    },



    // Player interacts with stranger outside the Hospital
    {
        id: 5,
        text: 'As you approach the stranger he starts speaking to you.</br></br>\"Hello there stranger, the name\'s Charles, I used to be a member of the swiss police, but that\'s a long story. Anywho,' +
        ' I saw that the door to the Hospital was locked, but you might be able to pry it open with this crowbar. I\'d do it myself but I\'m not as strong as I used to be. However, before I give' +
        ' them to you, I would be grateful if you could give me some mushrooms. I think there was some near the entrance to the Hospital Grounds.\"',
        inventory: '',
        image: 'assets/images/Hospital/OldTent.jpg',
        sound: 'assets/sounds/wind.wav',
        options: [
            {
                text: 'Return to the front of the Hospital',
                tempChange: 'decrease',
                nextText: 2
            },
            {
                text: 'Trade the mushrooms for the crowbar',
                requiredInventory: {Mushrooms: true},
                tempChange: 'decrease',
                nextText: 7
            },
            {
                text: 'Try to forcefully take the crowbar',
                nextText: 100
            },
            {
                text: "Eat the Mushrooms instead",
                requiredInventory: {Mushrooms: true},
                requiredState: (currentState) => currentState.Hunter === true,
                nextText: 104
            }
        ]
    },



    // Collect mushrooms for the stranger
    {
        id: 6,
        text: 'You see a lot of mushrooms growing in the bushes and overgrown foilage, it takes you while to collect them as you had to avoid thorns, but eventually' +
            ' you acquire all the mushrooms for the Stranger in front of the Hospital',
        inventory: '',
        image: 'assets/images/Hospital/Mushrooms.jpg',
        sound2: 'assets/sounds/PickMushrooms.wav',
        options: [
            {
                text: 'Return to the front of the Hospital',
                setState: {collectMushrooms: false},
                setInventory: {Mushrooms: true},
                nextText: 2
            }
        ]
    },



    // You traded the mushrooms for the crowbar
    {
        id: 7,
        text: '"Thank you kind stranger, and as promised, here\'s the crowbar you need. Good luck!"</br></br>You take the crowbar from him',
        inventory: '',
        image: 'assets/images/Hospital/Hospital_Outside.jpg',
        options: [
            {
                text: "Return to the front of the Hospital",
                setInventory: {Crowbar: true, Mushrooms: false},
                tempChange: 'decrease',
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
        image: 'assets/images/Hospital/FirstAidKit.jpg',
        sound: 'assets/sounds/wind.wav',
        options: [
            {
                text: 'You have already salvaged the First Aid kits, you have no more business here',
                requiredInventory: {'First Aid Kits': true},
                nextText: 2
            },
            {
                text: 'Don\'t salvage the First Aid kits and instead return to the front of the Hospital',
                requiredInventory: {'First Aid Kits': false},
                tempChange: 'decrease',
                nextText: 2
            },
            {
                text: 'Salvage the First Aid kits',
                requiredInventory: {'First Aid Kits': false},
                tempChange: 'decrease',
                nextText: 9
            },
            {
                text: 'Collect the nearby Mushrooms',
                requiredState: (currentState) => currentState.collectMushrooms === true,
                tempChange: 'decrease',
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
        image: 'assets/images/Hospital/FirstAidKit.jpg',
        sound2: 'assets/sounds/ZippingBag.wav',
        options: [
            {
                text: 'Return to the front of the Hospital',
                setInventory: {'First Aid Kits': true},
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
        image: 'assets/images/Hospital/AbandonedCampfire.jpg',
        sound: 'assets/sounds/wind.wav',
        options: [
            {
                text: 'You already collected all the wood from the campfire, there\'s no need for you to be here. Return to the front of the Hospital',
                requiredInventory: {'Wood Planks': true},
                nextText: 2
            },
            {
                text: 'Leave the campfire alone for now, as you feel like you might be able to make use of it later',
                requiredInventory: {'Wood Planks': false},
                tempChange: 'decrease',
                nextText: 2
            },
            {
                text: 'Take the Fire Wood from the campfire to use later',
                requiredInventory: {'Wood Planks': false},
                tempChange: 'decrease',
                nextText: 11
            },
            {
                text: 'Collect the nearby Mushrooms',
                requiredState: (currentState) => currentState.collectMushrooms === true,
                tempChange: 'decrease',
                nextText: 6
            },
            {
                text: "Light the smoldering campfire for warmth",
                requiredInventory: {Matches: true, 'Liquid Benzene': true},
                setInventory: {Matches: false, 'Liquid Benzene': false},
                tempChange: 'decrease',
                nextText: 22    
            },
            {
                text: "Sit by the Campfire for warmth",
                requiredState: (currentState) => currentState.LitFire === true,
                tempChange: 'increase',
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
        image: 'assets/images/Hospital/FireWood.jpg',
        sound2: 'assets/sounds/SpareFireWood.wav',
        options: [
            {
                text: 'Return to the front of the Hospital',
                setInventory: {'Wood Planks': true},
                nextText: 2
            }
        ]
    },



    // You check out the Bone Saw
    {
        id: 12,
        text: 'Among all the clutter in a surgical room you spot what you only assume was supposed to be a Bone Saw for amputation even though it looks like a normal saw. However' +
            ' you feel as if it might be a good idea to take this with you as a weapon in case you need to defend yourself. Do you take the Bone Saw?',
        inventory: '',
        image: 'assets/images/Hospital/BoneSaw.jpg',
        sound: 'assets/sounds/WaterDripping.wav',
        options: [
            {
                text: 'Take the Bone Saw',
                requiredInventory: {'Bone Saw': false},
                tempChange: -1,
                nextText: 13
            },
            {
                text: 'Don\'t take the Bone Saw and return to main lobby of the Hospital',
                requiredInventory: {'Bone Saw': false},
                tempChange: -1,
                nextText: 3
            },
            {
                text: "You already took the Bone Saw as a weaopn, you have no business here. Return to the Hospital Lobby",
                requiredInventory: {'Bone Saw': true},
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
        image: 'assets/images/Hospital/BoneSaw.jpg',
        sound2: 'assets/sounds/PickBoneSaw.wav',
        options: [
            {
                text: 'Head back to the main lobby of the Hospital',
                setInventory: {'Bone Saw': true},
                nextText: 3
            }
        ]
    },



    // You check out the Liquid Benzene
    {
        id: 16,
        text: 'In the Storage Closet on the right hand side of the Lobby, you can see some Liquid Benzene. However, it\'s stashed way at the back of the closet, but you feel like it' +
            ' might be useful to have. Do you try to take the Liquid Benzene?',
        inventory: '',
        image: 'assets/images/Hospital/LiquidBenzene.jpg',
        sound: 'assets/sounds/WaterDripping.wav',
        options: [
            {
                text: 'Take the Liquid Benzene',
                requiredInventory: {'Liquid Benzene': false},
                tempChange: -1,
                nextText: 17
            },
            {
                text: 'Don\'t take the Liquid Benzene and return to the Hospital Lobby',
                requiredInventory: {'Liquid Benzene': false},
                tempChange: -1,
                nextText: 3
            },
            {
                text: "You've already taken the Liquid Benzene, you have no business here. Return to the Hospital Lobby",
                requiredInventory: {'Liquid Benzene': true},
                nextText: 3
            }
        ]
    },



    // You decided to take the Liquid Benzene
    {
        id: 17,
        text: 'After spending a lot of time rummaging through the Storage Closet you eventually manage to get the Liquid Benzene from the back, brushing all the dust off your shoulders' +
            ' you return to the Hospital Lobby',
        inventory: '',
        image: 'assets/images/Hospital/LiquidBenzene.jpg',
        sound2: 'assets/sounds/FuelCan.wav',
        options: [
            {
                text: 'Head back to the main lobby of the Hospital',
                setInventory: {'Liquid Benzene': true},
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
        image: 'assets/images/Hospital/Abandoned_Room.jpg',
        sound: 'assets/sounds/WaterDripping.wav',
        options: [
            {
                text: 'Yes! Make my Final Stand and don\'t look back',
                setState: {defence1: false, defence2: false},
                tempChange: -1,
                nextText: 29
            },
            {
                text: 'No! Leave the room and return to the Hospital Lobby',
                tempChange: -1,
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
        sound: 'assets/sounds/wind.wav',
        options: [
            {
                text: "Return to the back of the Hospital",
                tempChange: -1,
                nextText: 4
            },
            {
                text: "Read the Old Newspaper",
                tempChange: -1,
                nextText: 20
            },
            {
                text: "Take the matches",
                requiredInventory: {Matches: false},
                tempChange: -1,
                nextText: 21
            }
        ]
    },



    // You decide to read the Newspaper
    {
        id: 20,
        text: "The Newspaper, although mysteriously cut-off, dates back two weeks ago, the 10th March 1999, and it reads...</br>" +
            "<button onClick=\"changeText();\" class=\"changeText\">Change Text</button> <button onClick=\"revertText();\" class=\"changeText\">Revert Text</button>" +
            " <span class=\"handwritten\" id=\"handwritten\">BREAKING NEWS - Civilians Going Missing!!</br>Recently, it's been reported that up to 30 people from local towns" +
            " and cities have suddenly vanished without trace. Local Police have been investigating the homes of each one of these individuals and what's most astonishing is" +
            " that in every single case there isn't a single piece of evidence left behind by the perpetrators. The Police have advised that you stay on high alert in the" +
            " coming days, by locking door and windows as they continue to search for a conclusion into what's going on. However rumours have begun to spread that it might be.......</span>",
        inventory: '',
        image: 'assets/images/Hospital/Newspaper2.jpg',
        sound2: 'assets/sounds/Newspaper.wav',
        options: [
            {
                text: "Go back to looking at the crates",
                tempChange: -1,
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
        image: 'assets/images/Hospital/Matches.jpg',
        sound2: 'assets/sounds/MatchBox.wav',
        options: [
            {
                text: "Return to looking at the crates",
                setInventory: {Matches: true},
                nextText: 19
            }
        ]
    },



    // You decide to light the Campfire
    {
        id: 22,
        text: "You pour the Liquid Benzene you found inside the Hospital over the smoldering campfire, and then light one of the matches you found in the crates behind the Hospital" +
            " and thankfully it doesn't immediately get blown out, so you throw it on the Liquid Benzene, and instantly a fire roars to life, and you can feel the strong warmth" + 
            " cover your body which feels nice as opposed to the freezing cold of the Tundra",
        inventory: '',
        image: 'assets/images/Hospital/AbandonedCampfire.jpg',
        sound: 'assets/sounds/Fire.wav',
        options: [
            {
                text: "Go back to searching the Campfire and its surroundings",
                setState: {LitFire: true},
                tempChange: +2,
                nextText: 10
            },
            {
                text: "Sit by the Campfire",
                setState: {LitFire: true},
                tempChange: 'increase',
                nextText: 23
            }
        ]
    },



    // You decide to sit next to the lit Campfire
    {
        id: 23,
        text: "You sit in silence in front of the Campfire allowing you to warm yourself up before returning to your search of the area...",
        inventory: '',
        image: 'assets/images/Hospital/AbandonedCampfire.jpg',
        sound: 'assets/sounds/Fire.wav',
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
        image: 'assets/images/Hospital/OldDocuments.jpg',
        sound2: 'assets/sounds/Newspaper.wav',
        options: [
            {
                text: "Go back to searching the back of the Hospital",
                tempChange: -1,
                nextText: 4
            },
            {
                text: "Keep reading the Hospital documents",
                tempChange: -1,
                nextText: 25
            }
        ]
    },



    // You decide to keep reading the Hospital Documents - #1
    {
        id: 25,
        text: "<button onClick=\"changeText();\" class=\"changeText\">Change Text</button> <button onClick=\"revertText();\" class=\"changeText\">Revert Text</button>" +
            " <button onClick=\"NextText();\" class=\"changeText\"> Next Entry </button> <button onClick=\"PreviousText();\" class=\"changeText\"> Previous Entry </button></br>" +
            "<span class=\"handwritten\" id=\"handwritten\">Log Entry 1:<br>Some strange men started appearing in the Hospital recently, with more of them coming and going" +
            " more frequently as time went on. Unfortunately, we still don't know what their goals are yet but we believe that maybe they are here to oversee our recent task" +
            " given to us by the local government, which is to perform a series of highly classified experiments which will ultimately determine the future of Humanity. However" +
            " we'll have to see how it all plays out in the long run...<br><br> Dr. Nallig</span>",
        inventory: '',
        image: 'assets/images/Hospital/OldDocuments.jpg',
        sound2: 'assets/sounds/Newspaper.wav',
        options: [
            {
                text: "Go back to searching the back of the Hospital",
                tempChange: -1,
                nextText: 4
            }
        ]
    },



    // You prepare for the night
    {
        id: 29,
        text: 'You decided to get ready for the night ahead by making some last minute preparations to the abandoned room and just in general so you\'ll suvive...',
        inventory: '',
        image: 'assets/images/Hospital/Abandoned_Room.jpg',
        sound: 'assets/sounds/WaterDripping.wav',
        options: [
            {
                text: 'Barricade the windows with the wood from the Campfire',
                requiredInventory: {'Wood Planks': true},
                tempChange: -1,
                nextText: 30
            },
            {
                text: 'Set a fire trap at the entrance to the abandoned room',
                requiredInventory: {'Liquid Benzene': true, Matches: true},
                tempChange: -1,
                nextText: 32
            },
            {
                text: 'Start the Night',
                requiredState: (currentState) => currentState.defence1 === false && currentState.defence2 === false, 
                requiredInventory: {'First Aid Kits': false, 'Bone Saw': false},
                tempChange: -1,
                nextText: 101
            },
            {
                text: 'Start the Night',
                requiredState: (currentState) => currentState.defence1 === false && currentState.defence2 === false,
                requiredInventory: {'First Aid Kits': false, 'Bone Saw': true},
                tempChange: -1,
                nextText: 102
            },
            {
                text: 'Start the Night',
                requiredState: (currentState) => currentState.defence1 === false && currentState.defence2 === false,
                requiredInventory: {'First Aid Kits': true, 'Bone Saw': false},
                tempChange: -1,
                nextText: 105
            },
            {
                text: 'Start the Night',
                requiredState: (currentState) => currentState.defence1 === false && currentState.defence2 === false,
                requiredInventory: {'First Aid Kits': true, 'Bone Saw': true},
                tempChange: -1,
                nextText: 106
            },
            {
                text: 'Start the Night',
                requiredState: (currentState) => currentState.defence1 === true && currentState.defence2 === true,
                tempChange: -1,
                nextText: 107
            },
            {
                text: 'Start the Night',
                requiredState: (currentState) => currentState.defence1 === false && currentState.defence2 === true,
                tempChange: -1,
                nextText: 108
            },
            {
                text: 'Start the Night',
                requiredState: (currentState) => currentState.defence1 === true && currentState.defence2 === false,
                requiredInventory: {'Bone Saw': false},
                tempChange: -1,
                nextText: 109
            },
            {
                text: 'Start the Night',
                requiredState: (currentState) => currentState.defence1 === true && currentState.defence2 === false,
                requiredInventory: {'Bone Saw': true},
                tempChange: -1,
                nextText: 110
            }
        ]
    },



    // You barricade the windows with the wood from the campfire
    {
        id: 30,
        text: "You decide to spend some time barricading all of the windows in the room with the spare wood you got from the abandoned campfire. However, even though you" +
            " made full use of the wood, you were only able to cover half of the windows",
        inventory: '',
        image: 'assets/images/Hospital/Abandoned_Room.jpg',
        sound2: 'assets/sounds/Barricading.wav',
        options: [
            {
                text: "Go back to preparing for the Night",
                setState: {defence1: true},
                setInventory: {'Wood Planks': false},
                nextText: 29
            }
        ]
    },



    // You decided to create a fire trap at the abandoned room entrance
    {
        id: 32,
        text: "Using the Liquid Benzene, you pour it all over the entrance to the room, in the hopes that when night starts you can light a match and throw it onto the Liquid Benzene" +
            " to start a fire in order to keep the zombies at bay",
        inventory: '',
        image: 'assets/images/Hospital/Abandoned_Room.jpg',
        sound2: 'assets/sounds/PouringLiquid.mp3',
        options: [
            {
                text: "Go back to preparing for the night",
                setState: {defence2: true},
                setInventory: {'Liquid Benzene': false},
                nextText: 29
            }
        ]
    },



    // You try to forcefully take the crowbar - ENDING 1 - BAD
    {
        id: 100,
        text: 'You try to take the crowbar from the Stranger by force, but as you do so he pulls out a knife and stabs you to death...' +
            ' <b><em>You Died!</em></b></br></br><a href="EndStatistics.html">See Statistics</a>',
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
        options: []
    },



    // You decided to start the Night without making any preparations - ENDING 2 - BAD
    {
        id: 101,
        text: 'You decided not to make any preparations at all and waited patiently for the night to fall over the Hospital. However, due to your lack' +
            ' of preparations the zombies started climbing through the windows and piling through the door to the abandoned room. You immediately became' +
            ' overwhelmed and with no weapon to defend yourself, you had to accept your fate...' +
            '<b><em>You Died!</em></b></br></br><a href="EndStatistics.html">See Statistics</a>',
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
        options: []
    },



    // You deicded to start the night while only having the Bone Saw as a weapon - ENDING 3 - GOOD
    {
        id: 102,
        text: 'You decided not to make any defence preparations at all and waited patiently for the night to consume the Hospital in darkness, confident in' +
            ' the fact that you\'ll be able to survive with just the Bone Saw as your weapon of choice. As night arrives, the zombies start climbing through' +
            ' the windows and also start piling through the door. Howver you start slashing the zombies down one by one with the Bone saw until there are none left...' +
            '<b><em>You Survived!</em></b></br></br><a href="EndStatistics.html">See Statistics</a>',
        inventory: '',
        image: 'assets/images/Victory2_TEST-GIF.gif',
        options: []
    },



    // You died to Frostbite - ENDING 4 - BAD
    {
        id: 103,
        text: "As the harsh colds and strong winds of the tundra surround you, you can feel your body becoming weaker and weaker by the second, to the point that you can't" +
            " even feel anything, numbed by the cold. With no will left to move, you sit there slowly but surely succumbing to the frozen wasteland's wrath, and eventually..." +
            "You succumb of Frostbite...<b><em>You Died!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>",
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
        options: []
    },



    // You died as a result of poisoning by eating the Mushrooms - ENDING 5 - BAD
    {
        id: 104,
        text: "You decided to eat the Mushrooms instead of trading them for the crowbar, expecting them to be a good source of nutrition and food. However, it turns out" +
            " that the mushrooms are extremely poisonous and slightly hallucinogenic as you start to see hallucinations of what looks to be a tall shadowy figure with" +
            " glowing red eyes towering over the Hospital staring right at you, and as the figure reaches out to you, you collapse and die..." +
            "<b><em>You Died!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>",
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
        options: []
    },



    // You decided to start the night having made no preparations and only carrying First Aid Kits - ENDING 6 - BAD
    {
        id: 105,
        text: "You decided not to make any defence preparations and waited patiently for the night to fall over the Hospital, hoping for some good luck to fall onto" +
            " you yourself. As the night went on you could hear the shrieks of zombies outside, and eventually they made their way into the room in which you were taking" +
            " refuge. You tried to hold your ground using the old crowbar you acquired earlier but due to all the rust it eventually snapped in half and with one zombie left," +
            " it managed to bite you before you kicked it out of one of the windows. Remembering you had the First Aid Kits you tried to heal your wounds but the damage was too" +
            " much and you knew that before long you'd become like them..." +
            "<b><em>You Died!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>",
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
        options: []
    },



    // You decided to start the night having made no preparations but do have the Bone Saw and the First Aid Kits - ENDING 7 - GOOD
    {
        id: 106,
        text: "You decided not to make any preparations or defences, but instead patiently waited for the night to fall over the Hospital, but you stand confident, believing" +
            " that having the Bone Saw, as a weapon, and the First Aid kits, as supplies, will be able to keep you alive for the night. As the night carries on and the screams" +
            " of both zombies and people pollute the silence, and you grow more and more tense. Then suddenly, without warning, zombies start to fill the abandoned room. However," +
            " wielding the Bone Saw as a weapon you are able to make easy work of the zombies as they keep coming. After many hours of standing your ground you managed to defeat the" +
            " zombies, but you did suffer some minor wounds on your body, fortunately though you were able to patch them up using the First Aid Kits you salvaged earlier..." +
            "<b><em>You Survived!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>",
        inventory: '',
        image: 'assets/images/Victory2_TEST-GIF.gif',
        options: []
    },



    // You decided to start the night having barricaded the windows and made a fire trap - ENDING 8 - GOOD
    {
        id: 107,
        text: " Before the night started you made the smart decision to not only barricade most of the windows in the room, but you also decided to create a fire trap for the zombies" +
            " using the Liquid Benzene you acquired earlier, confident in your preparations you patiently wait for the fall of night. After some hours pass, you finally start to hear the zombies" +
            " outside the Hospital. They start to scream as they climnb up to the windows but can't get through becuase you barricaded them up, but zombies start arriving en masse at" +
            " the entrance to the room. This was what you were waiting for, with no hesitation you light a match and, with good aim, throw it at the Liquid Benzene you poured over the entrance," +
            " and almost instantly a fire roared to life, burning the zombies as they gave off piercing shrieks in pain. Thankfully, the wood beneath them burned and shattered, dropping" +
            " the zombies to the floor below, and leaving the rest on the other side of a large gap. Many more hours passed, and some zombies did climb through the un-barricaded windows" +
            " but you were able to knock them off with the crowbar, defending your position until the night was finally over..." +
            "<b><em>You Survived!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>",
        inventory: '',
        image: 'assets/images/Victory2_TEST-GIF.gif',
        options: []
    },



    // You decided to start the night having only laid the fire trap at the entrance to the room - ENDING 9 - GOOD
    {
        id: 108,
        text: "Before the night started you decided that it would be wise to lay a fire trap for the zombies at the entrance of the abandoned room, in the hopes that it will be" +
            " able to keep the zombies at bay for the whole night in order to survive. After many hours pass, and the night continues to cover the Hospital in darkness, in the" +
            " distance you begin to hear the shrieks of the zombies as they approach the Hospital, and so you prepare to stand your ground. Numerous zombies started to pile" +
            " through the door to the abandoned room, their screams piercing your ears, but this is what you wanted to happen. Without any hesitation you lit a match and threw" +
            " it at the Liquid Benzene you poured on the floor, and instantly a fire roared to life, quickly burning the zombies and also the wood below them, which gave way and collapsed" +
            " causing the zombies to fall to the floor below them. Thankfully this also prevented any more zombies from getting to you via the door because of, the now massive, gap between" +
            " it and you. Some of the zombies were able to climb up to the windows, but with you being able to give them your undivided attention" +
            " you were able to kick and punch them down for the rest of the night..." +
            "<b><em>You Survived!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>",
        inventory: '',
        image: 'assets/images/Victory2_TEST-GIF.gif',
        options: []
    },



    // You decided to start the night having only barricaded most of the windows in the room - ENDING 10 - BAD
    {
        id: 109,
        text: "Before the night started, the only preparations you made were the barricades that you put on most of the windows using the spare fire wood you collected earlier. However" +
            " you were fearful for how the night would end because you didn't even have a good weapon to defend yourself. After some hours passed you could hear the zombies arriving" +
            " at the Hospital, their screams being all too familiar to you. As the zombies started coming through the door you were able to kill most of them using the crowbar you" +
            " acquired earlier but due to the rust it had sustained over the years it eventually snapped in half, and with zombies starting to come through the windows that you weren't" +
            " able to board up, you quickly became overwhelmed and accepted your fate..." +
            "<b><em>You Died!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>",
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
        options: []
    },



    // You decided to start the night having only barricaded most of the windows in the room, while also having the Bone Saw - ENDING 11 - GOOD
    {
        id: 110,
        text: "Before the night started, the only preparations you made were the barricades that you put on most of the windows using the spare fire wood you collected earlier. However" +
            " you were feeling slightly confident because you had the Bone Saw to use as a weapon to defend yourself. After some hours passed you could hear the zombies arriving" +
            " at the Hospital, their screams being all too familiar to you. As the zombies started coming through the door you were able to kill most of them using the Bone Saw you" +
            " acquired earlier, and thankfully it was able to hold up as well, and even though some zombies started coming through the windows that you weren't able to board up, you" +
            " were able to make quick work of them thanks to the Bone Saw. Eventually, the zombies stopped coming after you and you were able to rest for the rest of the night..." +
            "<b><em>You Survived!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>",
        inventory: '',
        image: 'assets/images/Victory2_TEST-GIF.gif',
        options: []
    },



    // You died to due to heat stroke - ENDING 12 - BAD - Only Present for Practicality 
    {
        id: 111,
        text: "In your attempt to warm yourself up, you became too warm and without any adequate treatmnent to help you, you unfortunately succumbed to heat stroke..." +
            "<b><em>You Died!</em></b></br></br><a href=\"EndStatistics.html\">See Statistics</a>",
        inventory: '',
        image: 'assets/images/You-Died_TEST-GIF.gif',
        options: []
    }



];




// Calls the startGame() function to start the game
startGame();