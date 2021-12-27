function reload() {
	document.querySelector(".current").reload();
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
