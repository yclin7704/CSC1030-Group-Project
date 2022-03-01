// Contains the dialogue specific for Hunters
var HospitalHunter = ["As a Hunter you have never had to rely on first aid kits in the wild before. Therefore you are not confident in whether or not you can properly salvage the first aid kits to get their benefits. Do you take the first aid kits?"];


// Contains the dialogue specific for War Veterans
var HospitalWarVeteran = ["As a War Veteran, you are very familiar with first aid kits, as you have used plenty on the battlefield in order to help your fellow soldiers who were injured. Therefore, you believe that you could make good use of them. Do you take the first aid kits?"];


// Contains the dialogue specific for Priests
var HospitalPriest = ["As a priest you believe that you don't require the first aid kits because your faith will protect you, but you have some doubts...Do you take the first aid kits?"];


// Contains the dialogue specific for Doctors
var HospitalDoctor = ["As a trained Doctor you have used first aid kits numerous times in the past. Therefore, you believe that you would be able to salvage the first aid kits properly in order to get the full benefits of them. Do you take the first aid kits?"];


// Contains the dialogue specific for Mechanics
var HospitalMechanic = ["As a professional mechanic you believe that the first aid kit might be a useless item to carry with you as you believe that parts to fix the car might be more beneficial to have on you. Do you take the first aid kits?"];


var profession = "WarVeteran"  // Stores the profession (FOR TESTING)
var accessButton = true;       // checks to see if players are interacting with items
var waits = 0;                 // Number of times the player has waited


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

        // If the player's chosen profession is the "Hunter", this code executes
        if (profession == "Hunter") {
            // sets accessButton to false. This prevents the user from interacting with anything else for the time being
            accessButton = false;
            document.getElementById('DialogueDisplay').innerHTML = HospitalHunter[0] +
            '<br> <a onclick="OutInteraction_1_Result()"><strong>Yes</strong></a>' +
            ' or <a onclick="OutInteraction_1_Result()"><strong>No</strong></a>';
        }

        // If the player's chosen profession is the "War Veteran", this code executes
        else if (profession == "WarVeteran") {
            // sets accessButton to false. This prevents the user from interacting with anything else for the time being
            accessButton = false;
            document.getElementById('DialogueDisplay').innerHTML = HospitalWarVeteran[0] +
            '<br> <a id="Yes" onclick="OutInteraction_1_Result()"><strong>Yes</strong></a>' +
            ' or <a id="No" onclick="OutInteraction_1_Result()"><strong>No</strong></a>';
        }

        // If the player's chosen profession is the "Priest", this code executes
        else if (profession == "Priest") {
            // sets accessButton to false. This prevents the user from interacting with anything else for the time being
            accessButton = false;
            document.getElementById('DialogueDisplay').innerHTML = HospitalPriest[0] +
            '<br> <a onclick="OutInteraction_1_Result()"><strong>Yes</strong></a>' +
            ' or <a onclick="OutInteraction_1_Result()"><strong>No</strong></a>';
        }

        // If the player's chosen profession is the "Doctor", this code executes
        else if (profession == "Doctor") {
            // sets accessButton to false. This prevents the user from interacting with anything else for the time being
            accessButton = false;
            document.getElementById('DialogueDisplay').innerHTML = HospitalDoctor[0] +
            '<br> <a onclick="OutInteraction_1_Result()"><strong>Yes</strong></a>' +
            ' or <a onclick="OutInteraction_1_Result()"><strong>No</strong></a>';
        }

        // If the player's chosen profession is the "Mechanic", this code executes
        else if (profession == "Mechanic") {
            // sets accessButton to false. This prevents the user from interacting with anything else for the time being
            accessButton = false;
            document.getElementById('DialogueDisplay').innerHTML = HospitalMechanic[0] + 
            '<br> <a onclick="OutInteraction_1_Result()"><strong>Yes</strong></a>' +
            ' or <a onclick="OutInteraction_1_Result()"><strong>No</strong></a>';
        }
    }
}

// Result of the player's choice on taking the First Aid kits
function OutInteraction_1_Result() {
    if (document.getElementById('Yes')){
        accessButton = true;
        document.getElementById('DialogueDisplay').innerHTML += "<br> You took the Firs Aid kits.";
    }
    else if (document.getElementById('No')){
        accessButton = true;
        document.getElementById('DialogueDisplay').innerHTML += "<br> You did not take the Firs Aid kits.";
    }
    document.getElementById('DialogueDisplay').innerHTML += ' <a href="Hospital_Outside.html"><strong>Return</strong></a>';
    

}

// Allows the player to interact with the abandoned Campfire
function outsideInteraction_2() {
    // Checks to see if the user isn't already interacting with something else
    if (accessButton == true) {
        // sets accessButton to false. This prevents the user from interacting with anything else for the time being
        accessButton = false;
        document.getElementById('DialogueDisplay').innerHTML = "Hello";
    }
}


// Result of the player's choice on taking the wood
function OutInteraction_2_Result() {
    if (document.getElementById('Yes')){
        accessButton = true;
        document.getElementById('DialogueDisplay').innerHTML += "<br> You took the Firs wood for barricading.";
    }
    else if (document.getElementById('No')){
        accessButton = true;
        document.getElementById('DialogueDisplay').innerHTML += "<br> You did not take the wood.";
    }
    document.getElementById('DialogueDisplay').innerHTML += ' <a href="Hospital_Outside.html"><strong>Return</strong></a>';
    

}


// Allows the player to just sit and wait (Up to a max of 5 times)
function wait(){
    const MAX_WAITS = 5;
    // Checks to see if the user isn't already interacting with something else
    if (accessButton == true && waits < MAX_WAITS) {
        alert("You waited");
        waits += 1;
    }
    else if (accessButton == true && waits == MAX_WAITS) {
        alert("You can no longer wait.");
        alert("You died");
    }
}