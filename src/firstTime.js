function closeWelcome() {
    // add hidden class to welcomepage id
    document.getElementById("welcomepage").classList.add("hidden");
}

// if value new isn't set, remove class hidden from welcomepage id then set value new to false
function openWelcome() {
    if (window.localStorage.getItem("new") === null) {
        // remove class hidden from welcomepage id and add flex to welcomepage id
        document.getElementById("welcomepage").classList.remove("hidden");
        window.localStorage.setItem("new", false);
    }
}

openWelcome()