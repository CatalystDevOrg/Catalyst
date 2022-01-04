// TODO: allow users to store and use userstyles
let userstyles = [];
if (window.localStorage.getItem("userstyles") == null) {
	window.localStorage.setItem("userstyles", JSON.stringify([]));
}
userstyles = JSON.parse(window.localStorage.getItem("userstyles"))

// https://stackoverflow.com/questions/52143451/javascript-filter-with-wildcard
const filterBy = (str, items) =>
	items.filter((item) =>
		new RegExp("^" + str.replace(/\*/g, ".*") + "$").test(item)
	);

window.addEventListener("DOM-content-loaded", () => {
  document.querySelector(".current").addEventListener("did-start-loading", () => {
    let filtered = [];
    for (let index = 0; index < userstyles.length; index++) {
      filtered += filterBy(userstyles[index].matchURL, userstyles)
    }
    for (let index in filtered) {
      document.querySelector(".current").insertCSS(userstyles[index].css)
    }
  });
  
})

function toggleUserstyles() {
  document.getElementById("userstyle-manager").classList.toggle("hidden")
}