let inventory = getSavedInventory();

/**
 * Get the inventory if it has been saved to sessionStorage
 */
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

/**
 * Update the inventory with the given changes
 * @param {JSON} data The changes to be made
 */
function updateInventory(data) {
	// If there are any changes to be made
	if (data) {
		// Iterate through the keys and make the required changes
		for (let key in data) {
			inventory[key] = data[key];
		}

		// Save the changes to sessionStorage
		saveInventory();
		// Show the updated inventory to the user
		showInventory();
	}
}

/**
 * Save the inventory to sessionStorage
 */
function saveInventory() {
	sessionStorage.setItem("inventory", JSON.stringify(inventory));
}

/**
 * Show the player's inventory
 */
function showInventory() {
	// Build up a string containing everything in the inventory
	let str = "";
	for (let key in inventory) {
		// Only show the item if they actually have it
		if (inventory[key]) {
			str += `${key}<br />`;
		}
	}

	document.getElementById("inventory").innerHTML = str;
}

/**
 * Clear all items in the inventory
 */
function clearInventory() {
	inventory = {};
	saveInventory();
	showInventory();
}
