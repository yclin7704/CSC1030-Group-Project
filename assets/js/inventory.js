let inventory = getSavedInventory();

function getSavedInventory() {
	let saved = JSON.parse(sessionStorage.getItem("inventory"));
	if (saved) return saved;
	else return {};
}

/**
 * Check if all the given requirements are met
 * @todo Any way of doing (A OR B)?
 * @param {JSON} reqs The requirements to check
 * @returns True if all requirements are met, false if not
 */
function meetsInventoryRequirements(reqs) {
	// Assume all requirements are met by default
	let allMet = true;
	// Iterate through the requirements
	for (let key in reqs) {
		// If all previous requirements were met, and
		// (the current requirement is explicitly met OR the value is supposed to be false and has not yet been defined in inventory)
		allMet = allMet && (reqs[key] === inventory[key] || (!reqs[key] && !inventory[key]));
	}
	return allMet;
}

function updateInventory(data) {
	if (data) {
		for (let key in data) {
			inventory[key] = data[key];
		}

		saveInventory();
		showInventory();
		console.log(data);
	}
}

function saveInventory() {
	sessionStorage.setItem("inventory", JSON.stringify(inventory));
}

function showInventory() {
	let str = "";
	for (let key in inventory) {
		if (inventory[key]) {
			str += "<br>" + key;
		}
	}
	document.getElementById("inventory").innerHTML = str;
}

function clearInventory() {
	inventory = {};
	saveInventory();
	showInventory();
}
