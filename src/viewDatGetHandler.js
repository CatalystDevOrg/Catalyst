function downloadCurrentPage() {
    currentView = document.querySelector('.current')
    let contents = currentView.src;
    downloadURI(contents, contents);
}