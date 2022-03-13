const minTemp = -21;
const maxTemp = 60;

const meter = document.getElementById("temperatureMeter");

let temperature = getSavedTemp();
meterSetup();

/**
 * Set up the temperature meter
 */
function meterSetup() {
	// Bar turns red below low value
	meter.low = -5;
	// Bar turns yellow below high value
	meter.high = 5;
	// Optimum value doesn't really seem to do anything, but I'm setting it anyway
	meter.optimum = 40;

	meter.min = minTemp;
	meter.max = maxTemp;

	meter.value = temperature;
}

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
function setTemp(value) {
	temperature = value;
	tempUpdated();
}

/**
 * Called when the temperature is changed so that the new value can be saved,
 * and the game ended if required.
 */
function tempUpdated() {
	// Update the value shown to the user
	meter.value = temperature;

	// Save the temperature to sessionStorage
	sessionStorage.setItem("Temperature", temperature);

	// End the game if the temperature becomes too high/too low
	if (temperature <= minTemp || temperature >= maxTemp) {
		// EndStatistics.html should probably reset temperature instead of this file, but I'm just testing stuff for now
		temperature = maxTemp - 1;
		sessionStorage.setItem("Temperature", temperature);
		// Do whatever stuff to show the game is over
		window.location.href = "EndStatistics.html";
	}
}
