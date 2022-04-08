const ARRAY_SIZE = 3;
const timeString = sessionStorage.getItem("prevGameTime");

function getGameStatus() {
	showTimes();
}

function showTimes() {
	// Parse the saved times array
	let timeArray = JSON.parse(localStorage.getItem("timeArray"));
	// If it doesn't exist in localStorage, try sessionStorage
	if (!timeArray || !timeArray[0]) timeArray = JSON.parse(sessionStorage.getItem("timeArray"));
	// If it still doesn't exist, create it
	if (!timeArray) timeArray = Array.apply(null, { length: ARRAY_SIZE });
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

		html += `<li class="record">${item.name} || ${item.profession} || ${item.time} seconds</li>`;
	}

	// Display the result
	leaderboard.innerHTML = html;
}

function clearLeaderboard() {
	let empty = Array.apply(null, { length: ARRAY_SIZE });
	localStorage.setItem("timeArray", JSON.stringify(empty));
	sessionStorage.setItem("timeArray", JSON.stringify(empty));
	showTimes();
}
