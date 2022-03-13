const minTemp = -21;
const maxTemp = 60;

const lowTemp = -12;
const normalTemp = 1;
const highTemp = 40;

const temperatureMeter = document.getElementById("temperatureMeter");
const temperatureSpan = document.getElementById("temperatureSpan");

let temperature = getSavedTemp();
meterSetup(temperature);

/**
 * Get the temperature value saved to sessionStorage, or the default (40) if it has not been set.
 */
function getSavedTemp() {
	let saved = parseInt(sessionStorage.getItem("Temperature"));
	if (!isNaN(saved)) return saved;
	else return 40;
}

/**
 * Get the current temperature
 */
function getTemp() {
	return temperature;
}

/**
 * Change the temperature by the given value.
 * Alternatively, if the function is passed "increase" or "decrease", the temperature is changed by a standard amount.
 * @param {*} change The value/direction to change the temperature by
 */
function changeTemp(change) {
	const standardIncrease = 7;
	const standardDecrease = -2;

	// Change the temperature by the desired value
	if (change === "decrease") {
		temperature += standardDecrease;
	} else if (change === "increase") {
		temperature += standardIncrease;
	} else if (!isNaN(change)) {
		temperature += change;
	}

	tempUpdated();
}

/**
 * Set the temperature to the given value
 * (In most cases you should probably be using changeTemp)
 * @param {integer} value
 */
function setTemp(value, displayUpdate = true) {
	temperature = value;
	tempUpdated(displayUpdate);
}

/**
 * Called when the temperature is changed so that the new value can be saved,
 * and the game ended if required.
 */
function tempUpdated(displayUpdate = true) {
	// Update the value shown to the user
	if (displayUpdate) meterSetup(temperature);
	temperatureSpan.innerHTML = temperature;

	// Save the temperature to sessionStorage
	sessionStorage.setItem("Temperature", temperature);

	// End the game if the temperature becomes too high/too low
	if (temperature <= minTemp || temperature >= maxTemp) {
		// Do whatever stuff to show the game is over
		window.location.href = "EndStatistics.html";
	}
}

/**
 * Set up the temperature bar
 */
function meterSetup(value) {
	let range = maxTemp - minTemp;
	let tempInRange = value - minTemp;

	let lowDiff = lowTemp - minTemp;
	let medDiff = normalTemp - lowTemp;
	let normalDiff = highTemp - normalTemp;
	let highDiff = maxTemp - highTemp;

	let lowWidth = Math.max(Math.min(tempInRange, lowDiff), 0);
	tempInRange -= lowDiff;
	let medWidth = Math.max(Math.min(tempInRange, medDiff), 0);
	tempInRange -= medDiff;
	let normalWidth = Math.max(Math.min(tempInRange, normalDiff), 0);
	tempInRange -= normalDiff;
	let highWidth = Math.max(Math.min(tempInRange, highDiff), 0);
	tempInRange -= highDiff;

	let divLow = document.createElement("div");
	let divMed = document.createElement("div");
	let divNormal = document.createElement("div");
	let divHigh = document.createElement("div");

	divLow.style.background = "red";
	divMed.style.background = "gold";
	divNormal.style.background = "green";
	divHigh.style.background = "red";

	divLow.classList = ["divTempMeter"];
	divMed.classList = ["divTempMeter"];
	divNormal.classList = ["divTempMeter"];
	divHigh.classList = ["divTempMeter"];

	divLow.style.width = `${(lowWidth / range) * 100}%`;
	divMed.style.width = `${(medWidth / range) * 100}%`;
	divNormal.style.width = `${(normalWidth / range) * 100}%`;
	divHigh.style.width = `${(highWidth / range) * 100}%`;

	temperatureMeter.innerHTML = "";
	temperatureMeter.appendChild(divLow);
	temperatureMeter.appendChild(divMed);
	temperatureMeter.appendChild(divNormal);
	temperatureMeter.appendChild(divHigh);
}
