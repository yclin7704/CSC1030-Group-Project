const ARRAY_SIZE = 3;

/**
 * Main function
 */
async function main() {
	stopTimer();
	let playerTime = document.getElementById("timeStatSpan").innerHTML;
	sessionStorage.setItem("playerTime", playerTime);
	get("temperatureStatSpan").innerHTML = getTemp();
	get("timeStatSpan").innerHTML = getTimePlayed();
	get("professionStatSpan").innerHTML = sessionStorage.getItem("profession");
	get("secrets").innerHTML = listingCollectable();

	compareTime();

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

function compareTime() {
	// Only accept a time if the player won
	let endStatus = sessionStorage.getItem("endStatus");
	console.log(`endStatus: ${endStatus}`);
	if (endStatus === "true") {
		// Parse the saved time value
		let time = parseInt(getTimePlayed());

		// Parse the saved list of times
		let timeArray = JSON.parse(localStorage.getItem("timeArray"));
		// If it doesn't exist in localStorage, try sessionStorage
		if (!timeArray) timeArray = JSON.parse(sessionStorage.getItem("timeArray"));
		// If it still doesn't exist, create it
		if (!timeArray) timeArray = Array.apply(null, { length: ARRAY_SIZE });
		console.log(timeArray);

		// Assuming the list is already sorted, check the new time against the lowest saved time to see if it is lower.
		let lastPos = timeArray[ARRAY_SIZE - 1];
		if (!lastPos || !lastPos.time || time < lastPos.time) {
			// If it is, update the list
			saveLeaderboard(time, timeArray);
		}
	}
}

function saveLeaderboard(time, timeArray) {
	// Get the player's name
	let name = sessionStorage.getItem("playerName");
	// player's profession
	let profession = sessionStorage.getItem("profession");
	// Fall back to a default value if not set
	if (!name) name = "Unknown";

	if (!profession) profession = "Unknown";

	let playerData = { name, profession, time };
	// Add the player data to the array
	timeArray.push(playerData);

	// Sort the values in the array
	timeArray.sort(function (a, b) {
		// Prevent the sort from failing if any of the values are undefined
		if (!a) return 300;
		else if (!b) return -300;
		else return a.time - b.time;
	});

	// Remove the last item in the array
	timeArray.splice(ARRAY_SIZE);

	// Save the updated array to localStorage and sessionStorage
	localStorage.setItem("timeArray", JSON.stringify(timeArray));
	sessionStorage.setItem("timeArray", JSON.stringify(timeArray));
}

async function resetValues() {
	let profession = sessionStorage.getItem("profession");
	let volume = sessionStorage.getItem("gameVolume");
	let timeArray = sessionStorage.getItem("timeArray");

	// Reset temperature etc. by clearing all of sessionStorage
	sessionStorage.clear();

	sessionStorage.setItem("gameVolume", volume);
	sessionStorage.setItem("profession", profession);
	sessionStorage.setItem("timeArray", timeArray);
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
