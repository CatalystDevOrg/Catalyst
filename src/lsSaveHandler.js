function lsSaveBookmarks() {
    let bookmarksFile = new Blob([JSON.stringify(bookmarks)], { type: "text/plain" });
    let bookmarksURL = URL.createObjectURL(bookmarksFile);
    let bookmarksLink = document.createElement("a");
    bookmarksLink.href = bookmarksURL;
    bookmarksLink.download = "bookmarks.json";
    bookmarksLink.click();
    URL.revokeObjectURL(bookmarksURL);
}

function loadBookmarksJSON(pathToFile) {
    // if pathToFile ends with json continue, if not stop function
    if (!pathToFile.endsWith(".json")) {
        console.log("This functionality is incomplete")
    } else {
        return;
    }

}