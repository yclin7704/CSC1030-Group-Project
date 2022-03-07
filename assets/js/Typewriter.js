// Will display the textNode text by printing it in a typewriter like fashion
async function typeSentence(sentence, delay = 30) {

    // Clears the HTML so that it doesn't keep adding on to it
    document.getElementById('DialogueHospital').innerHTML = '';

    // splits the sentence into individual characters
    var letters = sentence.split(""); 

    // acts as an index position
    let i = 0;

    // Loops through each character in the split sentence
    while(i < letters.length) {

        // the delay before each letter is printed
        await waitForMs(delay);

        // If the letter isn't an opening HTML tag character, this code runs
        if (letters[i] != "<") {
            document.getElementById('DialogueHospital').innerHTML += letters[i];
            i++;
        }
        else {

            //creates a new string to store the value of the HTML tag to check later
            var tag = letters[i];
            i++;
            while(letters[i] != ">"){
                tag += letters[i];
                i++;
            }
            tag += letters[i];
            i++;
            switch(tag){
                // If the tag is a <strong> tag this code will run
                case "<strong>": i=tagStrong(letters, i); break;

                // This code will run by default for tags like <br> as they don't have a corresponding closing tag
                default: document.getElementById('DialogueHospital').innerHTML += tag;
            }
        }
    }
    return;
}


// Will allow the Typewriter effect to print the text with the <strong></strong> tags applied
function tagStrong(letters, i){
    var word = "";
    while(letters[i] != "<"){
        word += letters[i];
        i++;
    }
    i += 9;
    // Will print the text in between the <strong></strong> tags so the effects are applied
    document.getElementById('DialogueHospital').innerHTML += "<strong>" + word + "</strong>";
    return i;
}


// Creates a time delay before each letter is printed
function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}  