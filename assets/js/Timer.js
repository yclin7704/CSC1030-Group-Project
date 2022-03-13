let time = 0;
let myTimer;

function StartTimer() {
	myTimer = setInterval(Timer, 1000);
}

function Timer() {
	time++;
	sessionStorage.setItem("Time", time);
}

function StopTimer() {
	let times = sessionStorage.getItem("Time");
	clearTimeout(myTimer);
}

function getTime() {
	return time;
}

function playAgain() {
	window.location.href = "Hospital.html";
	//window.location.href = "Cabin.html";
	//window.location.href = "GasStation.html";
	//window.location.href = "FarmHouse.html";
}
