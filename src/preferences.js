let preferences = getPreferences();
const categories = ["basic", "advanced", "experiments"]
const preferencesBox = document.getElementById('preferences-box');
evaluatePreferences();

/**
 * Toggles the preferences viewer
 */
function togglePreferences() {
    preferences = getPreferences();
    preferencesBox.classList.toggle('hidden');
    if (!preferencesBox.classList.contains('hidden')) {
        // run preferences
        evaluatePreferences();
        // update fields in preferences
        document.getElementById('pref-darkmode').checked = preferences.dark;
        addCheckboxListener(document.getElementById('pref-darkmode'), 'dark');
        document.getElementById('pref-autocomplete').checked = preferences.autocomplete;
        addCheckboxListener(document.getElementById('pref-autocomplete'), 'autocomplete');
        document.getElementById('pref-dm').checked = preferences.dm;
        addCheckboxListener(document.getElementById('pref-dm'), 'dm');
        document.getElementById('pref-usrchr').checked = preferences.usrchr;
        addCheckboxListener(document.getElementById('pref-usrchr'), 'usrchr');
        document.getElementById('pref-adblk').checked = preferences.adblk;
        addCheckboxListener(document.getElementById('pref-adblk'), 'adblk');
        if (preferences.agent.toString().length > 1) {
			document.getElementById("pref-useragent").value =
				preferences.agent || "Catalyst/{{version}}";
		} else {
			document.getElementById("pref-useragent").value = preferences.agent;
		}
		addTextListener(document.getElementById("pref-useragent"), "agent");
    }
}

function closePreferences() {
    preferences = getPreferences();
    if (!preferencesBox.classList.contains('hidden')) {
        preferencesBox.classList.toggle('hidden');
    }
}

/**
 * Gets the preferences stored in LocalStorage
 * @returns {Object}
 */
function getPreferences() {
    if (!window.localStorage.getItem('preferences')) {
        window.localStorage.setItem(
            'preferences',
            JSON.stringify({ dark: false, agent: '', autocomplete: true, bookmarks: false })
        );
    }
    return JSON.parse(window.localStorage.getItem('preferences'));
}

/**
 * Adds a Checkbox listener
 * @param {HTMLElement} element The HTMLElement to listen to
 * @param {string} prefKey The key in "preferences" for this element.
 */
function addCheckboxListener(element, prefKey) {
    element.addEventListener('change', () => {
        preferences[prefKey] = !!element.checked;
        updatePreferences();
    });
}
/**
 * Adds a Text input listener
 * @param {HTMLElement} element The HTMLElement to listen to
 * @param {string} prefKey The key in "preferences" for this element.
 */
function addTextListener(element, prefKey) {
    element.addEventListener('input', () => {
        preferences[prefKey] = element.value;
        updatePreferences();
    });
}

/**
 * Updates the preferences in LocalStorage to the new preferences and evaluates the new ones
 */
function updatePreferences() {
    window.localStorage.setItem('preferences', JSON.stringify(preferences));
    evaluatePreferences();
}

/**
 * Evaluates the preferences in the preferences variable
 */
function evaluatePreferences() {
    if (preferences.dark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    if (preferences.usrchr) {
        cat.loadCustomStyles();
    }
    if (preferences.adblk) {
        cat.enableAdBlocker();
    }
}

var enginespref = document.querySelector('#se')
enginespref.onchange = (event) => {
    var index = enginespref.options.selectedIndex
    localStorage.setItem('engine', index)
}

enginespref.value = localStorage.getItem('engine') || '1'

function changePrefTab(itm) {
    document.querySelector(`#${itm}`).classList.remove('hidden');
    others = document.querySelector(`#preferences-box`).getElementsByTagName('*')
    for (i = 0; i < others.length; ++i) {
        e = others[i]
        if (e.id != itm && categories.includes(e.id)) {
            e.classList.add('hidden')
        }
    }
}