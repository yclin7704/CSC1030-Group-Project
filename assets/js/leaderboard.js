const ARRAY_SIZE = 3;
const timeString = sessionStorage.getItem("prevGameTime");
const endStatus = localStorage.getItem('endStatus');

function getGameStatus() {
	if (endStatus === 'true') {
		compareTime();
	}

	showTimes();
}

function compareTime() {
	// Parse the saved time value
	const time = parseInt(timeString);

	// Parse the saved list of times
	let timeArray = JSON.parse(localStorage.getItem("timeArray"));
	// If it doesn't exist, create it
	if (!timeArray) timeArray = Array.apply(null, { length: ARRAY_SIZE });

	// Assuming the list is already sorted, check the new time against the lowest saved time to see if it is lower.
	const lastPos = timeArray[ARRAY_SIZE - 1];
	if (!lastPos || !lastPos.time || time < lastPos.time) {
		// If it is, update the list
		saveTime(time, timeArray);
	}
}

function saveTime(time, timeArray) {
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

	// Save the updated array to localStorage
	localStorage.setItem("timeArray", JSON.stringify(timeArray));
}

function showTimes() {
	// Parse the saved times array
	const timeArray = JSON.parse(localStorage.getItem("timeArray"));
	// Get the element to display the leaderboard on
	const leaderboard = document.getElementById("timesList");

	// Construct the html containing the names and times
	let html = "";
	for (i = 0; i < timeArray.length; i++) {
		let item = timeArray[i];

		// Use fallback values if not found
		if (!item) item = {};
		if (!item.name) item.name = "Unknown";
		if (!item.profession) item.profession = "Unknown";
		if (!item.time) item.time = "?";

		html += `<li class="record">${item.name} | ${item.profession} | ${item.time} seconds</li>`;
	}

	// Display the result
	leaderboard.innerHTML = html;
}

function clearLeaderboard() {
	let empty = Array.apply(null, { length: ARRAY_SIZE });
	localStorage.setItem("timeArray", JSON.stringify(empty));
	showTimes();
}
