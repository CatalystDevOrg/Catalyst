// add startup code here
// dont touch this, it makes the loading screen work
var sidebarWebView = document.getElementById('sidebarwv');

if(document.readyState === 'ready' || document.readyState === 'complete') {
    document.getElementById('loading').classList.add('hidden');
} else {
    document.onreadystatechange = function () {
        if (document.readyState == 'complete') {
            document.getElementById('loading').classList.add('hidden');
        }
    };
}

native.getThemes();

sidebarWebView.addEventListener('did-attach', () => {
    sidebarWebView.src = 'https://' + engineurls[preferences.searchEngine].split('/')[2];
});

