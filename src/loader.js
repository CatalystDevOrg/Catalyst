function loadWeb() {
	var page = document.getElementById("searchbar").value;
	document.querySelector(".current").src = page;
}
console.log(document.querySelector(".current"));
function reload() {
	document.querySelector(".current").reload();
}

function forward() {
	console.log(document.querySelector(".current"));
	document.querySelector(".current").goForward();
}

function backward() {
	document.querySelector(".current").goBack();
}
