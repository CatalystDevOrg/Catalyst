function loadWeb() {
    var page = document.getElementById("searchbar").value;
    document.getElementById("view").src = page;
}

var webview = document.getElementById("view");

function reload() {
  view.reload();
}

function forward() {
  view.goForward();
}

function backward() {
  view.goBack();
}
