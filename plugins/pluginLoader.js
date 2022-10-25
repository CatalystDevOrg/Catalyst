var loadPlugins = "true"
var developerPlugins = "false"

function loadPlugin(path) {
    if (developerPlugins = "true") {
        BrowserWindow.addDevToolsExtension(path);
    } else {
        BrowserWindow.addExtension(path)
    }
}
