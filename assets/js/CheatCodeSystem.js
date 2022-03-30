// validates the entered Cheat Code
function validateCheat() {

    // Stores the Cheat Code entered
    var cheat = document.getElementById("Cheat").value;
    
    // switches the effects based on the Cheat Code's value
    switch(cheat){
        case "RedScheme":
            document.getElementById("Styling").setAttribute("href", "CSS_2.css")
            sessionStorage.setItem("ID", "Styling");
            sessionStorage.setItem("Attribute", "href");
            sessionStorage.setItem("Value", "CSS_2.css");
            break;
        case "GreenScheme":
            document.getElementById("Styling").setAttribute("href", "CSS_3.css")
            sessionStorage.setItem("ID", "Styling");
            sessionStorage.setItem("Attribute", "href");
            sessionStorage.setItem("Value", "CSS_3.css");
            break;
        case "BlueScheme":
            document.getElementById("Styling").setAttribute("href", "CSS_4.css")
            sessionStorage.setItem("ID", "Styling");
            sessionStorage.setItem("Attribute", "href");
            sessionStorage.setItem("Value", "CSS_4.css");
            break;
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