/* eslint-enable no-undef */
/* eslint-enable no-unused-vars */
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
const { app, BrowserWindow, dialog, Menu, session, ipcMain, electron } = require('electron');
const path = require('path');
const fs = require('fs');
const fetch = require('cross-fetch');
const template = require('./menu.js');
const contextMenu = require('electron-context-menu');

if (require('electron-squirrel-startup')) app.quit();

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        minWidth: 1024,
        minHeight: 768,
        webPreferences: {
            webviewTag: true,
            devTools: true,
            sandbox: false,
            preload: path.join(__dirname, 'preload.js'),
            spellcheck: true
        },
        title: 'Catalyst',
        icon: path.join(__dirname, '../assets/icon.png'),
    });
    mainWindow.loadFile('./src/index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
        callback(mainWindow.webContents.executeJavaScript(`confirm('This page has requested the following permission: ${permission}')`))
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
app.on('web-contents-created', function (event, contents) {
    if (contents.getType() === 'webview') {
        contents.on('new-window', function (newWindowEvent) {
            newWindowEvent.preventDefault();
        });
    }
});

try {
    require('electron-reloader')(module);
} catch { }

let ver = app.getVersion();
let appName = app.getName();

function createAboutWindow() {
    aboutWindow = new BrowserWindow({
        minWidth: 500,
        minHeight: 250,
        width: 500,
        height: 250,
        title: 'About Catalyst',
        icon: path.join(__dirname, '../assets/icon.png'),
        resizable: false,
    });
    aboutWindow.loadFile('./src/about.html');
    aboutWindow.setMenuBarVisibility(false);

}

app.on('web-contents-created', (e, contents) => {
    contextMenu({
        window: contents,
        showSaveImageAs: true,
        showSaveImage: true,
        showInspectElement: true,
        showLearnSpelling: true,
        showSearchWithGoogle: true,
        showSelectAll: true,
        showCopyImageAddress: true,
        showCopyVideoAddress: true,
        showSaveVideoAs: true,
        showCopyLink: true,
    });
});

ipcMain.handle('enable-ad-blocker', (event) => {
    ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
        blocker.enableBlockingInSession(session.defaultSession);
    });
});

ipcMain.handle('loadExt', async (event, ext) => {
    session.defaultSession.loadExtension(ext);
});

ipcMain.handle('read-user-data', async (event, fileName) => {
    const path = app.getPath('userData');
    try {
        const buf = fs.readFileSync(`${path}/${fileName}`, { encoding: 'utf8', flag: 'r' });
        return buf;
    } catch {
        return;
    }
});

if (!fs.existsSync(`${app.getPath('userData')}/themes`)) {
    fs.mkdirSync(`${app.getPath('userData')}/themes`)
}

ipcMain.handle('get-themes', async (event) => {
    const path = app.getPath('userData');
    const buf = fs.readdirSync(`${path}/themes`, { encoding: 'utf8', flag: 'r' });
    return buf;
});

ipcMain.handle('toggle-full-screen', async (event) => {
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
});

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);