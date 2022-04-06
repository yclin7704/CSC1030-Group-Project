/**
 * Get the name the player has entered and save it to session storage
 */
function setPlayerName() {
	// Get the name the player entered
	let name = document.getElementById("playerNameInput").value;
	// If they didn't enter a name, use the default value
	// TODO: Should this be an actual name instead?
	if (name.trim() === "") name = "Player";
	// Save the player's choice to session storage
	sessionStorage.setItem("playerName", name);
}

function setGameVolume() {
	let volume = document.getElementById("volumeSlider").value;
	sessionStorage.setItem("gameVolume", volume);
}

function playMusic(source) {
	let slider = document.getElementById("volumeSlider");
	crossfadeAudio(source);

	let volumeValue = getVolume();
	if (!volumeValue) volumeValue = 40;

	slider.addEventListener("change", function () {
		console.log("Volume updated!");
		volumeUpdated(slider.value);
		document.getElementById("volumeLevel").innerHTML = slider.value + "%";
		setGameVolume();
	});

	slider.value = volumeValue;
	volumeUpdated(volumeValue);
	document.getElementById("volumeLevel").innerHTML = slider.value + "%";
}

function newGame() {
	//validateOption();
	let options = document.getElementById("menuOptions");
	let buttons = document.getElementById("startButtons");
	buttons.style.display = "none";
	options.style.display = "block";
	playMusic("https://soundimage.org/wp-content/uploads/2018/07/Horror-Game-Intro.mp3");
}

// validates the entered Cheat Code
function validateOption() {

    // Stores the Cheat Code entered
    var optionList = document.getElementsByName('Scheme');
	for (var i = 0; i < optionList.length; i++) {
		if (optionList[i].checked) {
			var option = optionList[i].value;
		}
	}

    sessionStorage.setItem("ID", "Styling");
    sessionStorage.setItem("Attribute", "href");

    // switches the effects based on the Cheat Code's value
    switch(option){
        case Normal:
            sessionStorage.setItem("Value", "./assets/css/main.css"); break;
        case Blue:
            sessionStorage.setItem("Value", "./assets/css/ColourblindColourPalette.css"); break;
        case Monocolour:
            sessionStorage.setItem("Value", "./assets/css/Cheat3.css"); break;
    }
}

/**
 * Display a description of the currently selected profession
 */

function displayProfession() {
	const select = document.getElementById("profession").value; // Value of select box
	const dialogue = document.getElementById("dialogue"); // Span element to display dialogue

	dialogue.innerHTML = "You have chosen: " + select + "<br>"; // Displays chosen profession to player

	if (select === "Hunter") {
		dialogue.innerHTML += `There were so many of them, what the hell was attracting all of them.
            A horde suddenly appeared at our cabin so I decided to lure them away so my daughter will
            be safe. It has been 7 days since then. I hope nothing has went wrong, there should be enough food
            in the carbin for a while. I ne-I have to go back. The sound of my rifle must havebrought more attention
            to me, this might be bad. I guess this abandoned warehouse will do for now.`;
		sessionStorage.setItem("profession", "Hunter");
	} else if (select === "Mechanic") {
		dialogue.innerHTML += `I knew it was too good to be true, a country side mechanic like me got a major corporation
			workshop all to myself? The things I helped with, those weren't god damn cars or any machine I've seen before.
			The things I would do just to get my old life back. I just wanted a decent job and retire early but now I'm stuck
			in this good for nothing warehouse... I wonder if it was my fault tha-`;
		sessionStorage.setItem("profession", "Mechanic");
	} else if (select === "War Veteran") {
		dialogue.innerHTML += `I've lost contact with my family back in <strong>xxxx</strong>, the zombies just over ran my
			last hideout. I've managed to stumble upon this old abandoned warehouse in the middle of no where. Honestly it took
			almost everything I had just to escape those damn things! This is just like back in those tre-... I-I don't know how much
			more I can take.`;
		sessionStorage.setItem("profession", "War Veteran");
	} else if (select === "Medic") {
		dialogue.innerHTML += `I've just managed to escape from the hospital... there were so many of them. I couldn't save any of them.
			I could still hear their screams and cries as I ran away. I tried to save them all, I thought I-I had the cure but one of the
			patient was infected and due to my selfishness I couldn't... end his life. Now everyone is dead because of me. Now I'm all alone in this abandoned warehouse.`;
		sessionStorage.setItem("profession", "Medic");
	} else if (select === "Priest") {
		dialogue.innerHTML += `I've just managed to escape from the hospital... there were so many of them. I couldn't save any of them.
			I could still hear their screams and cries as I ran away. I tried to save them all, I thought I-I had the cure but one of the patient
			was infected and due to my selfishness I couldn't... end his life. Now everyone is dead because of me. Now I'm all alone in this abandoned warehouse.`;
		sessionStorage.setItem("profession", "Priest");
	}
}
