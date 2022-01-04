// TODO: allow users to store and use userstyles
const currentView = () => document.querySelector(".current");
let userstyles = [];
if (window.localStorage.getItem("userstyles") == null) {
	window.localStorage.setItem("userstyles", JSON.stringify([]));
}

// https://stackoverflow.com/questions/52143451/javascript-filter-with-wildcard
const filterBy = (str, items) =>
	items.filter((item) =>
		new RegExp("^" + str.replace(/\*/g, ".*") + "$").test(item)
	);

currentView().addEventListener("did-start-loading", () => {
  let filtered = [];
  for (let index = 0; index < userstyles.length; index++) {
    filtered += filterBy(userstyles[index].matchURL, userstyles)
  }
  filtered = filterBy(userstyles[index].matchURL, userstyles);
	for (let index in filtered) {
    currentView.insertCSS(userstyles[index].css)
  }
});
