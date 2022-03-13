/**
 * Main function
 */
async function main() {
	StopTimer();

	get("temperatureSpan").innerHTML = getTemp();
	get("timeSpan").innerHTML = getTime();
	get("professionSpan").innerHTML = sessionStorage.getItem("profession");
}

async function playAgain() {
	// Reset temperature etc.
	setTemp(40, false);
	saveTime(0);
	// Redirect to start screen
	window.location.href = "PlayerMenu.html";
}

function get(id) {
	return document.getElementById(id);
}

// Run the main function
main().catch(console.error);
