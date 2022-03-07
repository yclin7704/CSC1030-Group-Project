// Will display the textNode text by printing it in a typewriter liek fashion
async function typeSentence(sentence, delay = 30) {

    // Clears the HTML so that it doesn't keep adding on to it
    document.getElementById('DialogueHospital').innerHTML = '';

    // splits the sentence into individual characters
    var letters = sentence.split(""); 

    let i = 0;
    while(i < letters.length) {

        // the delay before each letter is printed
        await waitForMs(delay);

        // If the letter isn't an opening HTML tag character, this code runs
        if (letters[i] != "<") {
            document.getElementById('DialogueHospital').innerHTML += letters[i];
            i++;
        }
        else {
            var tag = letters[i];
            i++;
            while(letters[i] != ">"){
                tag += letters[i];
                i++;
            }
            tag += letters[i];
            i++;
            switch(tag){
                case "<strong>": i=tagStrong(letters, i); break;
                default: document.getElementById('DialogueHospital').innerHTML += tag;
            }
        }
    }
    return;
}




function tagStrong(letters, i){
    var word = "";
    while(letters[i] != "<"){
        word += letters[i];
        i++;
    }
    i += 9;
    document.getElementById('DialogueHospital').innerHTML += "<strong>" + word;
    return i;
}




// Creates a time delay before each letter is printed
function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}  