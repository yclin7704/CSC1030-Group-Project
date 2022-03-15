let time = getSavedTime();
let myTimer;
let timeSpan = document.getElementById("timeSpan");

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

	if (timeSpan) {
		// Time the day starts at (eg 1700 being 5:00pm)
		const dayStart = 1200;
		// Time the day ends at (eg 2200 being 10:00pm)
		const dayEnd = 2200;
		// Length time of day takes in secconds
		const dayLength = 250;

		const nightStart = 2200;
		const nightEnd = 550;
		const nightLength = 50;

		let dayLen = dayEnd - dayStart;

		let nightLen;
		if (nightStart < nightEnd) nightLen = nightEnd - nightStart;
		else nightLen = nightStart + 24 - nightEnd;

		let translatedTime = (dayLen / dayLength) * time;

		let hour, minutes;

		if (translatedTime < dayLen) {
			hour = Math.floor(translatedTime / 100) + dayStart / 100;
		} else {
			translatedTime = (nightLen / nightLength) * (time - dayLength);
			hour = Math.floor(translatedTime / 100) + nightStart / 100;
		}

		minutes = Math.floor(((translatedTime % 100) / 25) * 3);
		hour = hour % 24;

		timeSpan.innerHTML = `${padTime(hour)}:${padTime(minutes * 5)}`;
	}
}

function padTime(num) {
	if (num < 10) return "0" + num;
	else return num;
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
