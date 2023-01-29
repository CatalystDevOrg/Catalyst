const { app, BrowserWindow, dialog, session } = require('electron');
const path = require('path');
const { Menu, ipcMain } = require('electron');
const openAboutWindow = require('about-window').default;
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
const { fetch } = require('cross-fetch')

if (require('electron-squirrel-startup')) app.quit();

ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
    blocker.enableBlockingInSession(session.defaultSession);
 });


let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            webviewTag: true,
            devTools: true,
            sandbox: false,
            preload: path.join(__dirname, 'preload.js'),
        },
        title: 'Catalyst',
        icon: path.join(__dirname, '../assets/icon.png'),
    });
    mainWindow.loadFile('./src/index.html');
    mainWindow.setMenuBarVisibility(false);
    require('update-electron-app')();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function() {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit();
});
app.on('web-contents-created', function(event, contents) {
    if (contents.getType() === 'webview') {
        contents.on('new-window', function(newWindowEvent) {
            newWindowEvent.preventDefault();
        });
    }
});

try {
    require('electron-reloader')(module);
} catch {}

/*
async function checkForUpdate(windowToDialog) {
    try {
        const githubFetch = await fetch(
            "https://api.github.com/repos/JaydenDev/Catalyst/releases"
        );
        if (!githubFetch.ok) {
            alert("There was an error checking for a new update, check your WiFi connection and try again from the menubar.");
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
*/

let ver = app.getVersion();
let appName = app.getName();

function aboutApp() {
    openAboutWindow({
        package_json_dir: path.join(__dirname, './package.json'),
        product_name: 'Catalyst',
        icon_path: path.join(__dirname, '../assets/icon.png'),
        license: 'MIT',
        copyright: '2020-2023',
        bug_report_url: 'https://github.com/jdev082/Catalyst/issues',
        homepage: 'https://getcatalyst.eu.org',
        description: 'A fast and elegant Electron web browser.',
    });
}

const template = [{
    label: 'About',
    click: function() {
        aboutApp();
    }
},
{
    label: 'Quit',
    click: function() {
        app.quit();
    }
},
{
    label: 'Hide',
    accelerator: 'CmdOrCtrl+H',
    click: function() {
        mainWindow.setMenuBarVisibility(false);
    }
},
{
    label: 'Show',
    accelerator: 'CmdOrCtrl+S',
    click: function() {
        mainWindow.setMenuBarVisibility(true);
    }
},
{
    label: 'DevTools',
    accelerator: 'CmdOrCtrl+I',
    click: function() {
        mainWindow.webContents.toggleDevTools();
    }
}/*
    {
        label: "Check for Updates",
        accelerator: "CmdOrCtrl+U",
        click: function() {
            checkForUpdate(mainWindow);
        }
    }*/
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);