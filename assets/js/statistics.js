/**
 * Main function
 */
async function main() {
	stopTimer();
	let playerTime = document.getElementById("timeStatSpan").innerHTML;
	localStorage.setItem("playerTime", playerTime);
	get("temperatureStatSpan").innerHTML = getTemp();
	get("timeStatSpan").innerHTML = getTimePlayed();
	get("professionStatSpan").innerHTML = sessionStorage.getItem("profession");
	get("secrets").innerHTML = listingCollectable();
	resetValues();
}

function listingCollectable() {
	//the collectables
	var collectable = ["C", "S", "C", "1", "0", "3", "0"];
	//Getting the amount of collectable you've collected
	var numberOfCollectable = sessionStorage.getItem("collectable");
	//Used to display the collectables
	var stringOfCollectable = "";
	//a loop to gather the collectable into one string
	for (var i = 0; i < numberOfCollectable; i++) {
		stringOfCollectable += collectable[i];
	}
	console.log(numberOfCollectable);
	console.log(stringOfCollectable);
	return stringOfCollectable;
}

async function resetValues() {
	// Reset temperature etc.
	setTemp(20, false);
	saveTime(0);
	//clears the sesstion storage ?
	sessionStorage.clear();
}

async function playAgain() {
	// Redirect to start screen
	window.location.href = "PlayerMenu.html";
}

function get(id) {
	return document.getElementById(id);
}

// Run the main function
main().catch(console.error);
