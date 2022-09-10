const generateHashkey = () => {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
}
const removeChildren = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};
const getPackageJSON = async() => {
    return await (await fetch("../package.json")).json();
};

function openFeedback() {
    createTab('https://github.com/JaydenDev/Catalyst/issues/new')
}

function openGithub() {
    createTab('https://github.com/JaydenDev/Catalyst')
}

function reload() {
    document.querySelector(".current").reload();
}

function openDocs() {
    createTab('https://getcatalyst.eu.org/docs')
}

function forward() {
    document.querySelector(".current").goForward();
}

function backward() {
    document.querySelector(".current").goBack();
}

function clearData() {
    if (!confirm("Are you sure you want to delete all preferences from Catalyst?")) return;
    window.localStorage.clear();
    window.close();
}

function inspectTab() {
    document.querySelector(".current").inspectElement(0, 0);
}