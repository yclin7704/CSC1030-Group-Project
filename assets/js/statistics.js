/**
 * Main function
 */
async function main() {
	StopTimer();

	get("temperatureStatSpan").innerHTML = getTemp();
	get("timeStatSpan").innerHTML = getTime();
	get("professionStatSpan").innerHTML = sessionStorage.getItem("profession");

	resetValues();
}

async function resetValues() {
	// Reset temperature etc.
	setTemp(40, false);
	saveTime(0);
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
