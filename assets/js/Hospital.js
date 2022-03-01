// Contains the dialogue specific for Hunters
const HospitalHunter = ["As a Hunter you have never had to rely on first aid kits in the wild before. Therefore you are not confident in whether or not you can properly salvage the first aid kits to get their benefits. Do you take the first aid kits?"
    , "Hunter"];


// Contains the dialogue specific for War Veterans
const HospitalWarVeteran = ["As a War Veteran, you are very familiar with first aid kits, as you have used plenty on the battlefield in order to help your fellow soldiers who were injured. Therefore, you believe that you could make good use of them. Do you take the first aid kits?"
    , "War Veteran"];


// Contains the dialogue specific for Priests
const HospitalPriest = ["As a priest you believe that you don't require the first aid kits because your faith will protect you, but you have some doubts...Do you take the first aid kits?"
    , "Priest"];


// Contains the dialogue specific for Doctors
const HospitalDoctor = ["As a trained Doctor you have used first aid kits numerous times in the past. Therefore, you believe that you would be able to salvage the first aid kits properly in order to get the full benefits of them. Do you take the first aid kits?"
    , "Doctor"];


// Contains the dialogue specific for Mechanics
const HospitalMechanic = ["As a professional mechanic you believe that the first aid kit might be a useless item to carry with you as you believe that parts to fix the car might be more beneficial to have on you. Do you take the first aid kits?"
    , "Mechanic"];


// Contains general dialogue to be displayed to the player
const HospitalDialogue = ["You arrive at a Hospital, and judging by its ancient and run-down appearance it's likely that it's been abandoned for at least 17 years. Although you feel the need to turn away, curiosity and the concern for what might be waiting for you in the forest beckons you closer to the collosal building, and as you approach it, the air gets colder around you...<br>Around you, you see some <strong>worn-down first aid kits</strong> and <strong>an abandoned campfire</strong>"];


const profession = "WarVeteran"  // Stores the profession (FOR TESTING)
var accessButton = true;         // checks to see if players are interacting with items
var waits = 0;                   // Number of times the player has waited





// loas the correct dialogue specific to the type of visit
function loadDialogue() {
    document.getElementById('DialogueDisplay').innerHTML = HospitalDialogue[0];
}





// Allows the player to go inside the Hospital
function goInsideHospital() {
    // Checks to see if the user isn't already interacting with something else
    if (accessButton == true) {
        // If the player isn't interacting with anything, then they can go inside the Hospital
        window.location.href = "Hospital_Inside.html";
    }
}





// Allows the player to interact with the First Aid kits
function outsideInteraction_1() {

    // Checks to see if the user isn't already interacting with something else
    if (accessButton == true) {

        // sets accessButton to false. This prevents the user from interacting with anything else for the time being
        accessButton = false;

        // If the player's chosen profession is the "Hunter", this code executes
        if (profession == "Hunter") {
            document.getElementById('DialogueDisplay').innerHTML = HospitalHunter[0];
        }

        // If the player's chosen profession is the "War Veteran", this code executes
        else if (profession == "WarVeteran") {
            document.getElementById('DialogueDisplay').innerHTML = HospitalWarVeteran[0];
        }

        // If the player's chosen profession is the "Priest", this code executes
        else if (profession == "Priest") {
            document.getElementById('DialogueDisplay').innerHTML = HospitalPriest[0];
        }

        // If the player's chosen profession is the "Doctor", this code executes
        else if (profession == "Doctor") {
            document.getElementById('DialogueDisplay').innerHTML = HospitalDoctor[0];
        }

        // If the player's chosen profession is the "Mechanic", this code executes
        else if (profession == "Mechanic") {
            document.getElementById('DialogueDisplay').innerHTML = HospitalMechanic[0];
        }

        // Gives the player the choice to either collect the First Aid kits or not
        document.getElementById('DialogueDisplay').innerHTML +=
            '<br> <a class="link" onclick="OutInteraction_1_Result1()"><strong>Yes</strong></a>' +
            ' or <a class="link" onclick="OutInteraction_1_Result2()"><strong>No</strong></a>';
    }
}

// Result of the player taking the First Aid kit
function OutInteraction_1_Result1() {
    accessButton = true;
    document.getElementById('DialogueDisplay').innerHTML += "<br> You took the First Aid kits.";
    document.getElementById('DialogueDisplay').innerHTML += ' <a class="link" href="Hospital_Outside.html"><strong>Return</strong></a>';
}

// Result of the player not taking the First Aid kit
function OutInteraction_1_Result2() {
    accessButton = true;
    document.getElementById('DialogueDisplay').innerHTML += "<br> You did not take the First Aid kits.";
    document.getElementById('DialogueDisplay').innerHTML += ' <a class="link" href="Hospital_Outside.html"><strong>Return</strong></a>';
}





// Allows the player to interact with the abandoned Campfire
function outsideInteraction_2() {

    // Checks to see if the user isn't already interacting with something else
    if (accessButton == true) {

        // sets accessButton to false. This prevents the user from interacting with anything else for the time being
        accessButton = false;

        // If the player's chosen profession is the "Hunter", this code executes
        if (profession == "Hunter") {
            document.getElementById('DialogueDisplay').innerHTML = HospitalHunter[1];
        }

        // If the player's chosen profession is the "WarVeteran", this code executes
        else if (profession == "WarVeteran") {
            document.getElementById('DialogueDisplay').innerHTML = HospitalWarVeteran[1];
        }

        // If the player's chosen profession is the "Priest", this code executes
        else if (profession == "Priest") {
            document.getElementById('DialogueDisplay').innerHTML = HospitalPriest[1];
        }

        // If the player's chosen profession is the "Doctor", this code executes
        else if (profession == "Doctor") {
            document.getElementById('DialogueDisplay').innerHTML = HospitalDoctor[1];
        }

        // If the player's chosen profession is the "Mechanic", this code executes
        else if (profession == "Mechanic") {
            document.getElementById('DialogueDisplay').innerHTML = HospitalMechanic[1];
        }

        // Gives the player the choice to either collect the Fire Wood or not
        document.getElementById('DialogueDisplay').innerHTML +=
            '<br> <a class="link" onclick="OutInteraction_2_Result1()"><strong>Yes</strong></a>' +
            ' or <a class="link" onclick="OutInteraction_2_Result2()"><strong>No</strong></a>';
    }
}

// Result of the player taking the wood
function OutInteraction_2_Result1() {
    accessButton = true;
    document.getElementById('DialogueDisplay').innerHTML += "<br> You took the Fire Wood for barricading.";
    document.getElementById('DialogueDisplay').innerHTML += ' <a class="link" href="Hospital_Outside.html"><strong>Return</strong></a>';
}

// Result of the player not taking the wood
function OutInteraction_2_Result2() {
    accessButton = true;
    document.getElementById('DialogueDisplay').innerHTML += "<br> You did not take the Fire Wood.";
    document.getElementById('DialogueDisplay').innerHTML += ' <a class="link" href="Hospital_Outside.html"><strong>Return</strong></a>';
}





// Allows the player to just sit and wait (Up to a max of 5 times)
function wait(){
    const MAX_WAITS = 5;
    /* Checks to see if the player isn't already interacting with something else
       and also checks to ensure the number of waits is less than the max waits.
    */
    if (accessButton == true && waits < MAX_WAITS) {
        alert("You waited");
        waits += 1;
    }
    /* Checks to see if the player isn't already interacting with something else
       and also checks to see if the number of waits executed equals the max waits.
    */
    else if (accessButton == true && waits == MAX_WAITS) {
        alert("You can no longer wait.");
        alert("You died");
    }
}