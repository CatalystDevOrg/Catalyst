// Init variables
let activeHash = "0";

// Functions

/**
 * Creates a new tab
 */
function createTab() {
	let tab = document.createElement("div");
	// Some parts taken from MystPi/Ninetails on Github. Thank you so much!!!
	let randomHash =
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15);
	tab.classList.add("tab");
	tab.id = `tab-${randomHash}`;
	tab.onclick = () => {
		switchTabs(randomHash);
	};
	tab.innerText = "New Tab";
	document.getElementById("tabs-bar").appendChild(tab);
	let view = document.createElement("webview");
	view.id = "view-" + randomHash;
	view.classList.add("view");
	view.allowpopups = "allowpopups";
	view.webpreferences = "nativeWindowOpen=true";
	view.src = "./welcome.html"; // will be changed when startpage settings are added
	addListeners(view, randomHash);
	document.getElementById("webviews").appendChild(view);
	switchTabs(randomHash);
}
createTab();
/**
 * Switches the tab to the selected one
 * @param {string} tabHash - The random hash of the tab to switch to
 */

function switchTabs(tabHash) {
	let currentTab = document.querySelector(".active-tab");
	if (currentTab) {
		currentTab.classList.remove("active-tab");
		currentTab.classList.add("tab");
	}

	let activeTab = document.getElementById("tab-" + tabHash);
	activeTab.classList.add("active-tab");
	activeTab.classList.remove("tab");

	let views = document.querySelectorAll(".view");
	views.forEach((x) => {
		x.style.display = "none";
		x.classList.remove("current");
	});

	document.getElementById("view-" + tabHash).style.display = "flex";
	document.getElementById("view-" + tabHash).classList.add("current");
	view = document.getElementById("view-" + tabHash);
	activeHash = tabHash;
}

function addListeners(view, hash) {
	const tab = document.getElementById(`tab-${hash}`);
	view.addEventListener("did-stop-loading", () => {
		tab.innerText = view.getTitle();
		tab.classList.remove("animate-pulse");
	});
	view.addEventListener("did-start-loading", () => {
		tab.classList.add("animate-pulse");
	});
	view.addEventListener("page-title-updated", (e) => {
		tab.innerText = e.title;
	});
}

function removeTab() {
	document.querySelector(".current").remove();
	document.querySelector(".active-tab").remove();
	switchTabs(
		document
			.getElementById("tabs-bar")
			.lastElementChild.id.substring(
				4,
				document.getElementById("tabs-bar").lastElementChild.id.length
			)
	);
}
