const template = [{
    label: 'About',
    click: function () {
        createAboutWindow();
    }
},
{
    label: 'Quit',
    click: function () {
        app.quit();
    }
},
{
    label: 'New Tab',
    accelerator: 'CmdOrCtrl+T',
    click: function () {
        mainWindow.webContents.executeJavaScript('createTab()');
    }
},
{
    label: 'Close Tab',
    accelerator: 'CmdOrCtrl+W',
    click: function () {
        mainWindow.webContents.executeJavaScript('removeTab()');
    }
},
{
    label: 'Fullscreen',
    accelerator: 'F11',
    click: function () {
        mainWindow.webContents.executeJavaScript('toggleFullScreen()');
    }
},
{
    label: 'Find',
    accelerator: 'CmdOrCtrl+F',
    click: function () {
        mainWindow.webContents.executeJavaScript('toggleFind()');
    }
},
{
    label: 'DevTools',
    accelerator: 'CmdOrCtrl+I',
    click: function () {
        mainWindow.webContents.toggleDevTools();
    },

}/*
    {
        label: "Check for Updates",
        accelerator: "CmdOrCtrl+U",
        click: function() {
            checkForUpdate(mainWindow);
        }
    }*/
];

module.exports = template;