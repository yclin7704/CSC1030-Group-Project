// validates the entered Cheat Code
function validateCheat() {

    // Stores the Cheat Code entered
    var cheat = document.getElementById("Cheat").value;

    sessionStorage.setItem("ID", "Styling");
    sessionStorage.setItem("Attribute", "href");

    // switches the effects based on the Cheat Code's value
    switch(cheat){
        case "BlueScheme":
            sessionStorage.setItem("Value", "./assets/css/Cheat1.css");
            break;
        case "GreenScheme":
            sessionStorage.setItem("Value", "./assets/css/Cheat2.css");
            break;
        case "Monocolour":
        case "Monocolor":
            sessionStorage.setItem("Value", "./assets/css/Cheat3.css");
            break;
        case "betaDesign":
            sessionStorage.setItem("Value", "./assets/css/Cheat4.css");
            break;
        default:
            sessionStorage.setItem("Value", "./assets/css/main.css");
    }
}

// Updates the HTML pages with the new Changes each time the page is opened
// Will be used in the body tag as an onload method
function updatePages() {

    // Gets the ID of the Element being updated
    let ID = sessionStorage.getItem("ID");

    // Gets the attribute which will be changed
    let attribute = sessionStorage.getItem("Attribute");

    // Gets the value that will be replaced for the changed Attribute
    let value = sessionStorage.getItem("Value");

    // Carries out the change
    document.getElementById(ID).setAttribute(attribute, value);
}