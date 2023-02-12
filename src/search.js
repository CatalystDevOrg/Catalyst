// protocols
searchbar.addEventListener('input', async() => {
    if (searchbar.value.length < 1) {
        removeChildren(suggestionsEl);
        return;
    }
    if (
        shouldAutocomplete(searchbar.value) &&
        JSON.parse(window.localStorage.getItem('preferences')).autocomplete
    ) {
        // This is for duckduckgo only, in the future, this may be something else, but I think DDG is fine for now.
        const autoCompleteCheck = await fetch(
            `https://duckduckgo.com/ac/?q=${encodeURIComponent(searchbar.value)}`
        );
        if (!autoCompleteCheck.ok) return;
        const autocomplete = await autoCompleteCheck.json();
        removeChildren(suggestionsEl);
        for (let index = 0; index < autocomplete.length; index++) {
            const suggestionText = autocomplete[index].phrase;
            // insert suggestion
            let suggestion = document.createElement('button');
            let suggestionHash = generateHashkey();
            suggestion.innerText = suggestionText;
            suggestion.classList.add('suggestion');
            suggestion.id = 'suggestion-' + suggestionHash;
            suggestion.addEventListener('click', () => {
                document.getElementById('searchbar').value = suggestionText;
                loadURL();
                removeChildren(suggestionsEl);
            });
            suggestionsEl.appendChild(suggestion);
        }
    } else {
        removeChildren(suggestionsEl);
    }
});

function loadURL(url) {
    view = document.querySelector('.current');
    if (shouldAutocomplete(url)) {
        document.querySelector(
            '.current'
        ).src = `https://duckduckgo.com/?q=${encodeURIComponent(url)}`;
    } else {
        view.src = url;
        view.addEventListener('did-fail-load', () => {
            view.src = 'home.html';
            alert(`Failed to load page ${url}`);
            return;
        });
    }
    removeChildren(suggestionsEl);
    view.addEventListener('did-finish-load', () => {
        if (preferences.dm) {
            invertTab();
        }
    });
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

// add listeners
searchbar.addEventListener('keydown', (e) => {
    var url = document.getElementById('searchbar').value;
    if (e.code === 'Enter') loadURL(url);
});