function displayHello() {
    
    var Professions = document.getElementsByName('Profession');
    var Profession;

    for (var i = 0; i < Professions.length; i++) {
        if (Professions[i].checked) {
            Profession = Professions[i].value;
            localStorage.setItem('Profession', Profession);
        }
    }
}

function displayText() {
    let Profession = localStorage.getItem('Profession');
    var dialogue;

    if (Profession == "Hunter") {
        dialogue = ["You are a Hunter", "There were so many of them, what the hell was attracting all of them. A horde suddenly appeared at our cabin so I decided to lure them away so my daughter will be safe. It's been 7 days since then. I hope nothing has went wrong, there should be enough food in the carbin for a while. I ne-I have to go back. The sound of my rifle must havebrought more attention to me, this might be bad. I guess this abandoned warehouse will do for now."];
        localStorage.setItem("Dialogue", JSON.stringify(dialogue));
    }
    else if (Profession == "Mechanic") {
        dialogue = ["You are a Mechanic", "I knew it was too good to be true, a country side mechanic like me got a major corporation workshop all to myself? The things I helped with, those weren't god damn cars or any machine I've seen before. The things I would do just to get my old life back. I just wanted a decent job and retire early but now I'm stuck in this good for nothing warehouse... I wonder if it was my fault tha-"];
        localStorage.setItem("Dialogue", JSON.stringify(dialogue));
    }
    else if (Profession == "Doctor") {
        dialogue = ["You are a Doctor", "I've just managed to escape from the hospital... there were so many of them. I couldn't save any of them. I could still hear their screams and cries as I ran away. I tried to save them all, I thought I-I had the cure but one of the patient was infected and due to my selfishness I couldn't... end his life. Now everyone is dead because of me. Now I'm all alone in this abandoned warehouse."];
        localStorage.setItem("Dialogue", JSON.stringify(dialogue));
    }
    else if (Profession == "WarVeteran") {
        dialogue = ["You are a War Veteran", "I've lost contact with my family back in xxxx, the zombies just over ran my last hideout. I've managed to stumble upon this old abandoned warehouse in the middle of no where. Honestly it took almost everything I had just to escape those damn things! This is just like back in those tre-... I-I don't know how much more I can take."]
        localStorage.setItem("Dialogue", JSON.stringify(dialogue));
    }
    else if (Profession == "Priest") {
        dialogue = ["You are a Priest", "There shouldn't have been any zombies around the church, they said that they... I see, the experiment has field. I must protect the children if nothing else. That was what I thought but they all came in all too fast and ferocious. We tried to run, I tried to save them but we couldn't out run them. After the night it was only me. I couldn't even save one. As I stumble through the woods I eventually made it to an abandoned warehouse. I never should've made that deal."]
        localStorage.setItem("Dialogue", JSON.stringify(dialogue));
    }

    var text = JSON.parse(localStorage.getItem("Dialogue"));
    document.getElementById('text').innerHTML = text[0];
    document.getElementById('text2').innerHTML = text[1];
}
