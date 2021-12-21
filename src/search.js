// protocols
const protocols = ["https", "http"];
const removeChildren = (parent) => {
	while (parent.lastChild) {
		parent.removeChild(parent.lastChild);
	}
};
const searchbar = document.getElementById("searchbar");
const suggestionsEl = document.getElementById("autocomplete-suggestions");
searchbar.addEventListener("input", async () => {
	if (shouldAutocomplete(searchbar.value)) {
		// This is for duckduckgo only, in the future, this may be something else, but I think DDG is fine for now.
		const autoCompleteCheck = await fetch(
			`https://duckduckgo.com/ac/?q=${searchbar.value}`
		);
		if (!autoCompleteCheck.ok) return;
		const autocomplete = await autoCompleteCheck.json();
		removeChildren(suggestionsEl);
		for (let index = 0; index < autocomplete.length; index++) {
			const suggestionText = autocomplete[index].phrase;
			// insert suggestion
			let suggestion = document.createElement("button");
			let suggestionHash = generateHashkey();
			suggestion.innerText = suggestionText;
			suggestion.classList.add("suggestion");
			suggestion.id = "suggestion-" + suggestionHash;
			suggestion.addEventListener("click", () => {
				document.getElementById("searchbar").value = suggestionText;
				loadURL();
        removeChildren(suggestionsEl);
			});
			suggestionsEl.appendChild(suggestion);
		}
	} else {
		removeChildren(suggestionsEl);
	}
});

function loadURL() {
	var page = document.getElementById("searchbar").value;
	if (shouldAutocomplete(page)) {
		document.querySelector(
			".current"
		).src = `https://duckduckgo.com/?q=${page}`;
	} else {
		document.querySelector(".current").src = page;
	}
	removeChildren(suggestionsEl);
}
function shouldAutocomplete(input) {
	for (let index = 0; index < protocols.length; index++) {
		const protocol = protocols[index];
		if (input.startsWith(`${protocol}://`)) {
			return false;
		}
	}
	return true;
}