function loadPlugs() {
    // add a script tag to html to load every script in plugins variable
    for (let i = 0; i < plugins.length; i++) {
        let script = document.createElement('script');
        script.src = "../plugins/" + plugins[i];
        document.body.appendChild(script);
    }
}

if (loadPlugins == "true") {
    loadPlugs();
}