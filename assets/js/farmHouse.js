const doctorDialogue = [];
const mechanicDialogue = [];
const hunterDialogue = [];
const priestDialogue = [];
const warVetDialogue = [];


//This is the key needed to open the front door
var key = false;



//This is the dialogue for farm house
var farmDialogue = ['Managing to escape from the zombies, you have stumbled upon what looks like to be and old, messy farm house that hasn&#39t been occupied in years. <br><br> You look around the vicinity and you see a <strong>wheel barrow</strong>, <strong>a suspicious flower pot</strong>, <strong>a dirty welcome mat</strong> and at the side of the farm house you see what looks to be <strong>a shelter of some sort</strong>. '];

//When the html load it will fill in the buttons with text inside and display the starting dialogue
function loadFarm(){
    //Putting starting dialogue
    document.getElementById('dialogue').innerHTML = farmDialogue[0];

    //Putting values in the buttons
    document.getElementById('btn1').innerHTML = 'Open the door';
    document.getElementById('btn2').innerHTML = 'Search the wheel barrow';
    document.getElementById('btn3').innerHTML = 'Search the flower pot';
    document.getElementById('btn4').innerHTML = 'Look under the welcome mat';
    document.getElementById('btn5').innerHTML = 'Go into the shelter';
    document.getElementById('btn6').innerHTML = 'Go back to warehouse';
    document.getElementById('btn7').innerHTML = 'Wait';
    document.getElementById('outside').style.visibility = 'visible';

    //Setting the function of the buttons
    document.getElementById('btn1').setAttribute('onClick', 'javascript: goInsideFarmHouse();');
}

//Allows the user to interact with the door
function goInsideFarmHouse(){
    var outside = document.getElementById('outside');
    outside.style.visibility = 'hidden';
    outside.style.display = 'none';
    document.getElementById('inside').style.visibility = 'visible';

    document.getElementById('btn1').innerHTML = 'go back';
    document.getElementById('btn2').innerHTML = 'Search the wheel barrow';
    document.getElementById('btn3').innerHTML = 'Search the flower pot';
    document.getElementById('btn4').innerHTML = 'Look under the welcome mat';
    document.getElementById('btn5').innerHTML = 'Go into the shelter';
    document.getElementById('btn6').innerHTML = 'Go back to warehouse';
    document.getElementById('btn7').innerHTML = 'Wait';
}

//Allows the user to interact with the wheel barrow
function searchWheelBarrow(){

}

//Allows the user to interact with the flower pot
function searchFlowerPot(){

}

//Allows the user to interact with the welcome mat
function searchWelcomeMat(){

}

//Allows the user to interact with the shelter
function goShelter(){

}
