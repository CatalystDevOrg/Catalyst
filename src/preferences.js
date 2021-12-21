let preferences = getPreferences();
const preferencesBox = document.getElementById("preferences-box");
evaluatePreferences();
function togglePreferences() {
	preferences = getPreferences();
	preferencesBox.classList.toggle("hidden");
	if (!preferencesBox.classList.contains("hidden")) {
		// run preferences
		evaluatePreferences();
		// update fields in preferences
		document.getElementById("pref-darkmode").checked = preferences.dark;
		addCheckboxListener(document.getElementById("pref-darkmode"), "dark");
	}
}

/**
 * Gets the preferences stored in LocalStorage
 * @returns {Object}
 */
function getPreferences() {
	if (!window.localStorage.getItem("preferences")) {
		window.localStorage.setItem("preferences", JSON.stringify({ dark: false }));
	}
	return JSON.parse(window.localStorage.getItem("preferences"));
}

/**
 * Adds a Checkbox listener
 * @param {HTMLElement} element The HTMLElement to listen to
 * @param {string} prefKey The key in "preferences" for this element.
 */
function addCheckboxListener(element, prefKey) {
	element.addEventListener("change", () => {
		preferences[prefKey] = !!element.checked;
		updatePreferences();
	});
}
function updatePreferences() {
	window.localStorage.setItem("preferences", JSON.stringify(preferences));
	evaluatePreferences();
}

function evaluatePreferences() {
	if (preferences.dark) {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}
}
