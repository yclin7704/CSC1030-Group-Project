// Contains the dialogue specific for Hunters
const HospitalHunter = ["As a Hunter you have never had to rely on First Aid kits in the wild before. Therefore you are not confident in whether or not you can properly salvage the First Aid kits to get their benefits. Do you take the First Aid kits?"
    , "Although it took a very long time, you eventually acquired what you needed from the First Aid kits, stuffing the equipment in your bag hoping that they will prove to be useful."
    , "Hunter 3"
    , "Hunter 4"
    , "Hunter 5"
    , "Hunter 6"
    , "Hunter 7"
    , "Hunter 8"];


// Contains the dialogue specific for War Veterans
const HospitalWarVeteran = ["As a War Veteran, you are very familiar with First Aid kits, as you have used plenty on the battlefield in order to help your fellow soldiers who were injured. Therefore, you believe that you could make good use of them. Do you take the First Aid kits?"
    , "You were able to quickly and decisively retrieve all of the essentials from the First Aid kits, storing them in your jacket for quick and easy access."
    , "War Veteran 3"
    , "War Veteran 4"
    , "War Veteran 5"
    , "War Veteran 6"
    , "War Veteran 7"
    , "War Veteran 8"];


// Contains the dialogue specific for Priests
const HospitalPriest = ["As a priest you believe that you don't require the First Aid kits because your faith will protect you, but you have some doubts...Do you take the First Aid kits?"
    , "Although you wanted to rely on your faith, you could not deny the need for some medical equipment in case things went horribly wrong, and although it took you a while, you eventually salvaged everything from the First Aid kits."
    , "Priest 3"
    , "Priest 4"
    , "Priest 5"
    , "Priest 6"
    , "Priest 7"
    , "Priest 8"];


// Contains the dialogue specific for Doctors
const HospitalDoctor = ["As a trained Doctor you have used First Aid kits numerous times in the past. Therefore, you believe that you would be able to salvage the First Aid kits properly in order to get the full benefits of them. Do you take the First Aid kits?"
    , "You were easily able to salvage everything from the First Aid Kits and managed to even fix some parts of it as well, all in a pretty quick period of time."
    , "Doctor 3"
    , "Doctor 4"
    , "Doctor 5"
    , "Doctor 6"
    , "Doctor 7"
    , "Doctor 8"];


// Contains the dialogue specific for Mechanics
const HospitalMechanic = ["As a professional mechanic you believe that the First Aid kits might be a useless item to carry with you as you believe that parts to fix the car might be more beneficial to have on you. Do you take the First Aid kits?"
    , "Even though you would rather be salvaging vehicles and other machines for parts, you ultimately decided that having medical equipment is also important, and salvaging the First Aid kits didn't take too long."
    , "Mechanic 3"
    , "Mechanic 4"
    , "Mechanic 5"
    , "Mechanic 6"
    , "Mechanic 7"
    , "Mechanic 8"];


// Contains general dialogue to be displayed to the player
const HospitalDialogue = ["You arrive at a Hospital, and judging by its ancient and run-down appearance it's likely that it's been abandoned for at least 17 years. Although you feel the need to turn away, curiosity and the concern for what might be waiting for you in the forest beckons you closer to the collosal building, and as you approach it, the air gets colder around you...<br>Around you, you see some <strong>worn-down First Aid kits</strong> and <strong>an abandoned campfire</strong>"
    , "You return to the outside of the Hospital, the air colder than it was than when you first arrived, yet you still feel as if you have unfinished business...<br>Around you, you still see some <strong>worn-down First Aid kits</strong> and <strong>an abandoned campfire</strong>"
    , "You decided to enter the abandoned Hospital which, upon entering, is much more decrepit than you first thought. There are broken walls, leaking pipes, water dripping from almost every ceiling and blood on the walls, only fuelling your fear of what could be lurking amongst the rooms of the Hospital..."];


const profession = "Doctor"  // Stores the profession (FOR TESTING)
var accessButton = true;         // checks to see if players are interacting with items
var waits = 0;                   // Number of times the player has waited
var visitedOutside = false;      // Checks to see if the player has visited the outside of the Hospital already (DON'T KNOW HOW TO USE EFFICIENTLY YET)




// loads the correct dialogue specific to the outside of the Hospital
function loadDialogueOutside() {
    document.getElementById('DialogueDisplay').innerHTML = HospitalDialogue[0];
}

// loads the correct dialogue specific to the inside of the Hospital
function loadDialogueInside() {
    document.getElementById('DialogueDisplay2').innerHTML = HospitalDialogue[2];
}




// Allows the player to go inside the Hospital
function goInsideHospital() {
    // Checks to see if the user isn't already interacting with something else
    if (accessButton == true) {
        // If the player isn't interacting with anything, then they can go inside the Hospital
        window.location.href = "Hospital_Inside.html";
    }
}

// Allows the player to go outside the Hospital
function goOutsideHospital() {
    // Checks to see if the user isn't already interacting with something else
    if (accessButton == true) {
        // If the player isn't interacting with anything, then they can go inside the Hospital
        window.location.href = "Hospital_Outside.html";
    }
}





// Allows the player to interact with the First Aid kits
function OutsideInteraction_1() {

    // Checks to see if the user isn't already interacting with something else
    if (accessButton == true) {

        // sets accessButton to false. This prevents the user from interacting with anything else for the time being
        accessButton = false;

        switch(profession) {
            // If the player's chosen profession is the "Hunter", this code executes
            case "Hunter": document.getElementById('DialogueDisplay').innerHTML = HospitalHunter[0]; break;
    
            // If the player's chosen profession is the "War Veteran", this code executes
            case "WarVeteran": document.getElementById('DialogueDisplay').innerHTML = HospitalWarVeteran[0]; break;
    
            // If the player's chosen profession is the "Priest", this code executes
            case "Priest": document.getElementById('DialogueDisplay').innerHTML = HospitalPriest[0]; break;
    
            // If the player's chosen profession is the "Doctor", this code executes
            case "Doctor": document.getElementById('DialogueDisplay').innerHTML = HospitalDoctor[0]; break;
    
            // If the player's chosen profession is the "Mechanic", this code executes
            case "Mechanic": document.getElementById('DialogueDisplay').innerHTML = HospitalMechanic[0]; break;
        }

        // Gives the player the choice to either collect the First Aid kits or not
        document.getElementById('DialogueDisplay').innerHTML +=
            '<br> <a class="link" onclick="OutsideInteraction_1_Result1()"><strong>Yes</strong></a>' +
            ' or <a class="link" onclick="OutsideInteraction_1_Result2()"><strong>No</strong></a>';
    }
}

// Result of the player taking the First Aid kits
function OutsideInteraction_1_Result1() {

    // Allows the player to access the other buttons again
    accessButton = true;

    switch(profession) {
        // If the player's chosen profession is the "Hunter", this code executes
        case "Hunter": document.getElementById('DialogueDisplay').innerHTML = HospitalHunter[1]; break;

        // If the player's chosen profession is the "War Veteran", this code executes
        case "WarVeteran": document.getElementById('DialogueDisplay').innerHTML = HospitalWarVeteran[1]; break;

        // If the player's chosen profession is the "Priest", this code executes
        case "Priest": document.getElementById('DialogueDisplay').innerHTML = HospitalPriest[1]; break;

        // If the player's chosen profession is the "Doctor", this code executes
        case "Doctor": document.getElementById('DialogueDisplay').innerHTML = HospitalDoctor[1]; break;

        // If the player's chosen profession is the "Mechanic", this code executes
        case "Mechanic": document.getElementById('DialogueDisplay').innerHTML = HospitalMechanic[1]; break;
    }

    document.getElementById('DialogueDisplay').innerHTML += "<br><br><em><b>You took the First Aid kits.</b></em>";
    document.getElementById('DialogueDisplay').innerHTML += ' <a class="link" href="Hospital_Outside.html"><strong>Return</strong></a>';
}

// Result of the player not taking the First Aid kits
function OutsideInteraction_1_Result2() {
    // Allows the player to access the other buttons again
    accessButton = true;
    document.getElementById('DialogueDisplay').innerHTML += "<br><br><em><b>You decided not to take the First Aid kits.</b></em>";
    document.getElementById('DialogueDisplay').innerHTML += ' <a class="link" href="Hospital_Outside.html"><strong>Return</strong></a>';
}





// Allows the player to interact with the abandoned Campfire
function OutsideInteraction_2() {

    // Checks to see if the user isn't already interacting with something else
    if (accessButton == true) {

        // sets accessButton to false. This prevents the user from interacting with anything else for the time being
        accessButton = false;

        switch(profession) {
            // If the player's chosen profession is the "Hunter", this code executes
            case "Hunter": document.getElementById('DialogueDisplay').innerHTML = HospitalHunter[2]; break;
    
            // If the player's chosen profession is the "War Veteran", this code executes
            case "WarVeteran": document.getElementById('DialogueDisplay').innerHTML = HospitalWarVeteran[2]; break;
    
            // If the player's chosen profession is the "Priest", this code executes
            case "Priest": document.getElementById('DialogueDisplay').innerHTML = HospitalPriest[2]; break;
    
            // If the player's chosen profession is the "Doctor", this code executes
            case "Doctor": document.getElementById('DialogueDisplay').innerHTML = HospitalDoctor[2]; break;
    
            // If the player's chosen profession is the "Mechanic", this code executes
            case "Mechanic": document.getElementById('DialogueDisplay').innerHTML = HospitalMechanic[2]; break;
        }

        // Gives the player the choice to either collect the Fire Wood or not
        document.getElementById('DialogueDisplay').innerHTML +=
            '<br> <a class="link" onclick="OutsideInteraction_2_Result1()"><strong>Yes</strong></a>' +
            ' or <a class="link" onclick="OutsideInteraction_2_Result2()"><strong>No</strong></a>';
    }
}

// Result of the player taking the wood
function OutsideInteraction_2_Result1() {

    // Allows the player to access the other buttons again
    accessButton = true;

    switch(profession) {
        // If the player's chosen profession is the "Hunter", this code executes
        case "Hunter": document.getElementById('DialogueDisplay').innerHTML = HospitalHunter[3]; break;

        // If the player's chosen profession is the "War Veteran", this code executes
        case "WarVeteran": document.getElementById('DialogueDisplay').innerHTML = HospitalWarVeteran[3]; break;

        // If the player's chosen profession is the "Priest", this code executes
        case "Priest": document.getElementById('DialogueDisplay').innerHTML = HospitalPriest[3]; break;

        // If the player's chosen profession is the "Doctor", this code executes
        case "Doctor": document.getElementById('DialogueDisplay').innerHTML = HospitalDoctor[3]; break;

        // If the player's chosen profession is the "Mechanic", this code executes
        case "Mechanic": document.getElementById('DialogueDisplay').innerHTML = HospitalMechanic[3]; break;
    }

    document.getElementById('DialogueDisplay').innerHTML += "<br><br><em><b> You took the Fire Wood for barricading.</b></em>";
    document.getElementById('DialogueDisplay').innerHTML += ' <a class="link" href="Hospital_Outside.html"><strong>Return</strong></a>';
}

// Result of the player not taking the wood
function OutsideInteraction_2_Result2() {
    // Allows the player to access the other buttons again
    accessButton = true;
    document.getElementById('DialogueDisplay').innerHTML += "<br><br><em><b> You did not take the Fire Wood.</b></em>";
    document.getElementById('DialogueDisplay').innerHTML += ' <a class="link" href="Hospital_Outside.html"><strong>Return</strong></a>';
}





// Allows the player to interact with the Dangerous Item (weapon)
function InsideInteraction_1() {

    // Checks to see if the user isn't already interacting with something else
    if (accessButton == true) {

        // sets accessButton to false. This prevents the user from interacting with anything else for the time being
        accessButton = false;
    
        switch(profession) {
            // If the player's chosen profession is the "Hunter", this code executes
            case "Hunter": document.getElementById('DialogueDisplay2').innerHTML = HospitalHunter[4]; break;
        
            // If the player's chosen profession is the "War Veteran", this code executes
            case "WarVeteran": document.getElementById('DialogueDisplay2').innerHTML = HospitalWarVeteran[4]; break;
        
            // If the player's chosen profession is the "Priest", this code executes
            case "Priest": document.getElementById('DialogueDisplay2').innerHTML = HospitalPriest[4]; break;
        
            // If the player's chosen profession is the "Doctor", this code executes
            case "Doctor": document.getElementById('DialogueDisplay2').innerHTML = HospitalDoctor[4]; break;
        
            // If the player's chosen profession is the "Mechanic", this code executes
            case "Mechanic": document.getElementById('DialogueDisplay2').innerHTML = HospitalMechanic[4]; break;
        }
    
        // Gives the player the choice to either collect the Dangerous Item or not
        document.getElementById('DialogueDisplay2').innerHTML +=
            '<br> <a class="link" onclick="InsideInteraction_1_Result1()"><strong>Yes</strong></a>' +
            ' or <a class="link" onclick="InsideInteraction_1_Result2()"><strong>No</strong></a>';
    }
}

// Result of the player taking the Dangerous Item (weapon)
function InsideInteraction_1_Result1() {

    // Allows the player to access the other buttons again
    accessButton = true;

    switch(profession) {
        // If the player's chosen profession is the "Hunter", this code executes
        case "Hunter": document.getElementById('DialogueDisplay2').innerHTML = HospitalHunter[5]; break;

        // If the player's chosen profession is the "War Veteran", this code executes
        case "WarVeteran": document.getElementById('DialogueDisplay2').innerHTML = HospitalWarVeteran[5]; break;

        // If the player's chosen profession is the "Priest", this code executes
        case "Priest": document.getElementById('DialogueDisplay2').innerHTML = HospitalPriest[5]; break;

        // If the player's chosen profession is the "Doctor", this code executes
        case "Doctor": document.getElementById('DialogueDisplay2').innerHTML = HospitalDoctor[5]; break;

        // If the player's chosen profession is the "Mechanic", this code executes
        case "Mechanic": document.getElementById('DialogueDisplay2').innerHTML = HospitalMechanic[5]; break;
    }

    document.getElementById('DialogueDisplay2').innerHTML += "<br> You took the Dangerous Item.";
    document.getElementById('DialogueDisplay2').innerHTML += ' <a class="link" href="Hospital_Inside.html"><strong>Return</strong></a>';
}

// Result of the player not taking the Dangerous Item (weapon)
function InsideInteraction_1_Result2() {
    // Allows the player to access the other buttons again
    accessButton = true;
    document.getElementById('DialogueDisplay2').innerHTML += "<br> You did not take the Dangerous Item.";
    document.getElementById('DialogueDisplay2').innerHTML += ' <a class="link" href="Hospital_Inside.html"><strong>Return</strong></a>';
}




// Allows the player to interact with the Electric Blanket
function InsideInteraction_2() {
    
    // Checks to see if the user isn't already interacting with something else
    if (accessButton == true) {

        // sets accessButton to false. This prevents the user from interacting with anything else for the time being
        accessButton = false;
    
        switch(profession) {
            // If the player's chosen profession is the "Hunter", this code executes
            case "Hunter": document.getElementById('DialogueDisplay2').innerHTML = HospitalHunter[6]; break;
        
            // If the player's chosen profession is the "War Veteran", this code executes
            case "WarVeteran": document.getElementById('DialogueDisplay2').innerHTML = HospitalWarVeteran[6]; break;
        
            // If the player's chosen profession is the "Priest", this code executes
            case "Priest": document.getElementById('DialogueDisplay2').innerHTML = HospitalPriest[6]; break;
        
            // If the player's chosen profession is the "Doctor", this code executes
            case "Doctor": document.getElementById('DialogueDisplay2').innerHTML = HospitalDoctor[6]; break;
        
            // If the player's chosen profession is the "Mechanic", this code executes
            case "Mechanic": document.getElementById('DialogueDisplay2').innerHTML = HospitalMechanic[6]; break;
        }
    
        // Gives the player the choice to either collect the Electric Blanket or not
        document.getElementById('DialogueDisplay2').innerHTML +=
            '<br> <a class="link" onclick="InsideInteraction_2_Result1()"><strong>Yes</strong></a>' +
            ' or <a class="link" onclick="InsideInteraction_2_Result2()"><strong>No</strong></a>';
    }

}

// Result of the player taking the Electric Blanket
function InsideInteraction_2_Result1() {

    // Allows the player to access the other buttons again
    accessButton = true;

    switch(profession) {
        // If the player's chosen profession is the "Hunter", this code executes
        case "Hunter": document.getElementById('DialogueDisplay2').innerHTML = HospitalHunter[7]; break;

        // If the player's chosen profession is the "War Veteran", this code executes
        case "WarVeteran": document.getElementById('DialogueDisplay2').innerHTML = HospitalWarVeteran[7]; break;

        // If the player's chosen profession is the "Priest", this code executes
        case "Priest": document.getElementById('DialogueDisplay2').innerHTML = HospitalPriest[7]; break;

        // If the player's chosen profession is the "Doctor", this code executes
        case "Doctor": document.getElementById('DialogueDisplay2').innerHTML = HospitalDoctor[7]; break;

        // If the player's chosen profession is the "Mechanic", this code executes
        case "Mechanic": document.getElementById('DialogueDisplay2').innerHTML = HospitalMechanic[7]; break;
    }

    document.getElementById('DialogueDisplay2').innerHTML += "<br> You took the Electric Blanket";
    document.getElementById('DialogueDisplay2').innerHTML += ' <a class="link" href="Hospital_Inside.html"><strong>Return</strong></a>';
}

// Result of the player not taking the Electric Blanket
function InsideInteraction_2_Result2() {
    // Allows the player to access the other buttons again
    accessButton = true;
    document.getElementById('DialogueDisplay2').innerHTML += "<br> You did not take the Electric Blanket.";
    document.getElementById('DialogueDisplay2').innerHTML += ' <a class="link" href="Hospital_Inside.html"><strong>Return</strong></a>';
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