// initialise global variables
const bookmarksBar = document.getElementById("bookmarks");

// get bookmarks initialised
if (window.localStorage.getItem("bookmarks") == null) {
  window.localStorage.setItem("bookmarks", JSON.stringify([]));
}

for (let bookmarkIdx in JSON.parse(window.localStorage.getItem("bookmarks"))) {
  const bookmark = JSON.parse(window.localStorage.getItem("bookmarks"))[bookmarkIdx]
  addBookmarkToBar(bookmark.url, bookmark.title);
  console.log(bookmark)
}

// functions

/**
 * Adds a bookmark to the bookmarks bar
 * @param {string} url The URL to add a bookmark for.
 * @param {string} title The title of the page.
 */
function addBookmarkToBar(url, title) {
  let bookmarkEl = document.createElement("div");
  bookmarkEl.innerText = title;
  bookmarkEl.onclick = () => {
    console.log("clicked on bookmark");
    document.getElementById("searchbar").value = url;
    console.log(document.getElementById("searchbar").value)
    loadURL();
  };
  bookmarkEl.classList.add("bookmark");
  bookmarksBar.appendChild(bookmarkEl);
}