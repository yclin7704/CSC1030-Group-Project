function displayProfession() {
    let select = document.getElementById('profession').value; // Value of select box
    let dialogue = document.getElementById('dialogue') // Span element to display dialogue
    dialogue.innerHTML = 'You have chosen: ' + select + '<br>'; // Displays chosen profession to player

    if (select === 'Hunter') {
        dialogue.innerHTML += "There were so many of them, what the hell was attracting all of them. "
            + "A horde suddenly appeared at our cabin so I decided to lure them away so my daughter will "
            + "be safe. It has been 7 days since then. I hope nothing has went wrong, there should be enough food "
            + "in the carbin for a while. I ne-I have to go back. The sound of my rifle must havebrought more attention "
            + "to me, this might be bad. I guess this abandoned warehouse will do for now.";
        sessionStorage.setItem('profession', 'Hunter')
    }
    else if (select === 'Mechanic') {
        dialogue.innerHTML += "I knew it was too good to be true, a country side mechanic like me got a major corporation "
            + "workshop all to myself? The things I helped with, those weren't god damn cars or any machine I've seen before. "
            + "The things I would do just to get my old life back. I just wanted a decent job and retire early but now I'm stuck "
            + "in this good for nothing warehouse... I wonder if it was my fault tha-"
        sessionStorage.setItem('profession', 'Mechanic')
    }
    else if (select === 'War Veteran') {
        dialogue.innerHTML += "I've lost contact with my family back in <strong>xxxx</strong>, the zombies just over ran my "
            + "last hideout. I've managed to stumble upon this old abandoned warehouse in the middle of no where. Honestly it took "
            + "almost everything I had just to escape those damn things! This is just like back in those tre-... I-I don't know how much "
            + "more I can take."
        sessionStorage.setItem('profession', 'War Veteran')
    }
    else if (select === 'Medic') {
        dialogue.innerHTML += "I've just managed to escape from the hospital... there were so many of them. I couldn't save any of them. "
            + "I could still hear their screams and cries as I ran away. I tried to save them all, I thought I-I had the cure but one of the "
            + "patient was infected and due to my selfishness I couldn't... end his life. Now everyone is dead because of me. Now I'm all alone in this abandoned warehouse."
        sessionStorage.setItem('profession', 'Medic')
    }
    else if (select === 'Priest') {
        dialogue.innerHTML += "I've just managed to escape from the hospital... there were so many of them. I couldn't save any of them. "
            + "I could still hear their screams and cries as I ran away. I tried to save them all, I thought I-I had the cure but one of the patient "
            + "was infected and due to my selfishness I couldn't... end his life. Now everyone is dead because of me. Now I'm all alone in this abandoned warehouse."
        sessionStorage.setItem('profession', 'Priest')
    }
}