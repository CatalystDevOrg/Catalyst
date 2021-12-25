// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const fetch = require("cross-fetch");
let mainWindow;
function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			webviewTag: true,
			nodeIntegration: false
		},
		title: "Catalyst",
		icon: path.join(__dirname, "../assets/icon.png"),
	});
	mainWindow.setMenuBarVisibility(false);

	// and load the index.html of the app.
	mainWindow.loadFile("./src/index.html");

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
	checkForUpdate(mainWindow);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();

	app.on("activate", function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});
app.on("web-contents-created", function (event, contents) {
  if (contents.getType() === "webview") {
    contents.on("new-window", function (newWindowEvent) {
      newWindowEvent.preventDefault();
    });
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

try {
	require("electron-reloader")(module);
} catch {}

async function checkForUpdate(windowToDialog) {
	try {
		const githubFetch = await fetch(
			"https://api.github.com/repos/JaydenDev/Catalyst/releases"
		);
		if (!githubFetch.ok) {
			// this means that
			return;
		}
		const releaseJSON = await githubFetch.json();
		const replacerRegex = /["."]/gm;
		const appVersionStr = app.getVersion();
		const tagVersionInt = Number(appVersionStr.replace(replacerRegex, ""));
		for (let i in releaseJSON) {
			const release = releaseJSON[i];
			if (release.draft || release.prerelease) continue;
      const replaced = release["tag_name"].replace(replacerRegex, "");
			if (
				tagVersionInt <
				Number(replaced.startsWith("v") ? replaced.slice(1) : replaced)
			) {
				dialog.showMessageBox(windowToDialog, {
					message: "An update is available for Catalyst.",
					detail: `Go to github.com/JaydenDev/Catalyst/releases to install Catalyst ${release["tag_name"]}`,
					type: "info",
				});
				return;
			}
		}
	} catch (error) {
		console.error(error);
	}
}
