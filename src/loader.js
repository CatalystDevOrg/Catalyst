function loadWeb() {
	var page = document.getElementById("searchbar").value;
	document.querySelector(".current").src = page;
}

function reload() {
	document.querySelector(".current").reload();
}

function forward() {
	document.querySelector(".current").goForward();
}

function backward() {
	document.querySelector(".current").goBack();
}
