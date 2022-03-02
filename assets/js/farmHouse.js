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
    document.getElementById('btn2').setAttribute('onClick', 'javascript: searchWheelBarrow();');
    document.getElementById('btn3').setAttribute('onClick', 'javascript: searchFlowerPot();');
    document.getElementById('btn4').setAttribute('onClick', 'javascript: searchWelcomeMat();');
    document.getElementById('btn5').setAttribute('onClick', 'javascript: goShelter();');
    document.getElementById('btn6').setAttribute('onClick', 'javascript: goWarehouse();');
    document.getElementById('btn7').setAttribute('onClick', 'javascript: wait();');
}

//Allows the user to interact with the door
function goInsideFarmHouse(){
    if(key == false){
        var outside = document.getElementById('outside');
        outside.style.visibility = 'hidden';
        outside.style.display = 'none';
        var inside = document.getElementById('inside');
        inside.style.visibility = 'visible';

        document.getElementById('btn1').innerHTML = 'Go into the bedroom';
        document.getElementById('btn2').innerHTML = 'Go into the kithen';
        document.getElementById('btn3').innerHTML = 'Read note';
        document.getElementById('btn4').innerHTML = 'Open drawer';
        document.getElementById('btn5').innerHTML = 'Barricade the window';
        document.getElementById('btn6').innerHTML = 'Go outside';
        document.getElementById('btn7').innerHTML = 'Wait';

        //Setting the function of the buttons
        document.getElementById('btn1').setAttribute('onClick', 'javascript: goInsideFarmHouse();');
        document.getElementById('btn2').setAttribute('onClick', 'javascript: searchWheelBarrow();');
        document.getElementById('btn3').setAttribute('onClick', 'javascript: searchFlowerPot();');
        document.getElementById('btn4').setAttribute('onClick', 'javascript: searchWelcomeMat();');
        document.getElementById('btn5').setAttribute('onClick', 'javascript: goShelter();');
        document.getElementById('btn6').setAttribute('onClick', 'javascript: goWarehouse();');
        document.getElementById('btn7').setAttribute('onClick', 'javascript: wait();');
    }
}

//Allows the user to go back outside
function goOutside(){
    var outside = document.getElementById('outside');
    var inside = document.getElementById('inside');
    outside.style.visibility = 'visiable';
    outside.style.display = 'block';
    inside.visibility = 'none';
    inside.display = 'none';
}

//Allows the user to interact with the bedroom
function goInsideBedroom(){

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

//Allows the user to go back to the starting point
function goWarehouse(){

}

//Allows the user to stay where they are at
function wait(){

}
