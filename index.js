'use strict';

const electron = require('electron');
const app = electron.app;

// prevent window being garbage collected
let mainWindow;

function onClosed() {
    // dereference the window
    // for multiple windows store them in an array
    mainWindow = null;
}

function createMainWindow() {
    // https://github.com/atom/electron/blob/master/docs/api/browser-window.md
    const win = new electron.BrowserWindow({
        width: 600,
        height: 600,
        resizable: false,
        icon: `file://${__dirname}/raw/data-search-icon.png`,
    });

    win.loadURL(`file://${__dirname}/index.html`);
    win.on('closed', onClosed);

    return win;
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!mainWindow) {
        mainWindow = createMainWindow();
    }
});

app.on('ready', () => {
    mainWindow = createMainWindow();
});
