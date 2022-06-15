const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const fs = require('fs');

const ipcDialog = require('./dialog');
const ipcFile = require('./files');
const ipcLogger = require('./logger');
const ipcNotifications = require('./notification');
const ApplicationMenu = require('./menu');
const TrayIcon = require('./tray');
const ipcStore = require("./storage");

let mainWindow = null;
function makeWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        show: false,
        icon: path.resolve(__dirname, '../assets/images/icon.png'),
        webPreferences: {
            preload: path.resolve(__dirname, '../preload/preload.js'),
        }
    });
    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

    mainWindow.loadURL(startURL);

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Create app when electron is ready.
app.whenReady().then(() => {
    makeWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            makeWindow()
        }
    });

    // Closing app if all windows are closed BUT MacOs.
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });

    new TrayIcon(mainWindow, app).init(path.resolve(__dirname, '../assets/images/icon.png'));
    ipcNotifications.init(ipcMain, path.resolve(__dirname, '../assets/images/icon.png'));

    ipcDialog.init(mainWindow, ipcMain);
    ipcFile.init(mainWindow, ipcMain, fs);
    ipcLogger.init(ipcMain);
    new ipcStore().init(ipcMain);

    // Application menu.
    const menu = new ApplicationMenu(mainWindow);
    Menu.setApplicationMenu(menu.getMenu());
    
});
