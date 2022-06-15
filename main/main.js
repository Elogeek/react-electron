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
const ElectronStore = require('electron-store');
const store = new ElectronStore();

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

    // Application menu.
    const menu = new ApplicationMenu(mainWindow);
    Menu.setApplicationMenu(menu.getMenu());

    // Admettons qu'on souhaite sauvegarder la valeur 42 avec comme clé d'accès 'data-key'
    store.set('data-key', 42);

    // Et qu'on ait besoin de la récupérer
    const data = store.get('data-key');
    console.log((data));

    // Supprimer la clé et sa valeur
    store.delete('data-key');
    // Here value undefined car la clé n'existe plus
    console.log(store.get('data-key'));

});
