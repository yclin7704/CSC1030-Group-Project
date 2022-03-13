let time = getSavedTime();
let myTimer;

function getSavedTime() {
	let saved = parseInt(sessionStorage.getItem("Time"));
	if (!isNaN(saved)) return saved;
	else return 0;
}

function StartTimer() {
	myTimer = setInterval(Timer, 1000);
}

function Timer() {
	time++;
	saveTime();
}

function StopTimer() {
	clearTimeout(myTimer);
}

function getTime() {
	return time;
}

function saveTime(value = time) {
	sessionStorage.setItem("Time", value);
}

function playAgain() {
	window.location.href = "Hospital.html";
	//window.location.href = "Cabin.html";
	//window.location.href = "GasStation.html";
	//window.location.href = "FarmHouse.html";
}
