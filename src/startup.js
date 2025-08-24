// add startup code here
// dont touch this, it makes the loading screen work
var sideBar = document.getElementById('sidebar');
var sideBarWebView = document.getElementById('sidebarwv');

if(document.readyState === 'ready' || document.readyState === 'complete') {
    document.getElementById('loading').classList.add('hidden');
} else {
    document.onreadystatechange = function () {
        if (document.readyState == 'complete') {
            document.getElementById('loading').classList.add('hidden');
        }
    };
}

if (localStorage.getItem('bookmarks') < 1) {
    document.querySelector('#bookmarks').innerText = 'When you add bookmarks they will appear here!';
}

native.getThemes();

sideBarWebView.addEventListener('did-attach', () => {
    sideBarWebView.src = 'https://' + engineurls[preferences.searchEngine].split('/')[2];
});

